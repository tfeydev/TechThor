package br.com.techthor.datafusionhub.service;

import br.com.techthor.datafusionhub.dto.SourceRawDataDTO;
import br.com.techthor.datafusionhub.model.Source;
import br.com.techthor.datafusionhub.repository.SourceRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URI;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RawDataServiceImpl implements RawDataService {

    private final SourceRepository sourceRepository;
    private final ObjectMapper objectMapper;

    public RawDataServiceImpl(SourceRepository sourceRepository, ObjectMapper objectMapper) {
        this.sourceRepository = sourceRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public List<SourceRawDataDTO> loadAllRawData() {
        List<Source> sources = sourceRepository.findAll();
        return sources.stream().map(source -> {
            try {
                List<Map<String, Object>> rawData = loadRawData(source.getId());
                return new SourceRawDataDTO(source.getId(), source.getName(), source.getType(), rawData);
            } catch (IOException e) {
                // Log the error and return a DTO with empty data to avoid breaking the entire request
                System.err.println("Error loading raw data for source id " + source.getId() + ": " + e.getMessage());
                return new SourceRawDataDTO(source.getId(), source.getName(), source.getType(), Collections.emptyList());
            }
        }).collect(Collectors.toList());
    }

    @Override
    public List<Map<String, Object>> loadRawData(Long id) throws IOException {
        Source source = sourceRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Source not found with id: " + id));

        System.out.println("Loading data for source id: " + id + ", type: " + source.getType());

        List<Map<String, Object>> data = switch (source.getType().toUpperCase()) {
            case "CSV" -> loadCsvRawData(source);
            case "POSTGRESQL" -> loadPostgresRawData(source);
            case "MYSQL" -> loadMySqlRawData(source);
            case "MONGODB" -> loadMongoDbRawData(source);
            case "JSON" -> loadJsonRawData(source);
            case "REST API" -> loadRestApiRawData(source);
            default -> throw new UnsupportedOperationException("Unsupported source type: " + source.getType());
        };

        // Apply normalization
        JsonNode details = getConnectionDetails(source);
        JsonNode configNode = details.path("normalizationConfig");
        if (!configNode.isMissingNode()) {
            Map<String, Map<String, Object>> config = objectMapper.convertValue(configNode, new TypeReference<>() {});
            for (Map<String, Object> row : data) {
                for (Map.Entry<String, Map<String, Object>> entry : config.entrySet()) {
                    String column = entry.getKey();
                    String action = (String) entry.getValue().get("action");
                    Object value = row.get(column);
                    if (action != null) {
                        switch (action) {
                            case "toLowerCase":
                                if (value instanceof String) row.put(column, ((String) value).toLowerCase());
                                break;
                            case "toUpperCase":
                                if (value instanceof String) row.put(column, ((String) value).toUpperCase());
                                break;
                            case "trim":
                                if (value instanceof String) row.put(column, ((String) value).trim());
                                break;
                            case "replaceNull":
                                if (value == null) row.put(column, entry.getValue().getOrDefault("value", "unbekannt"));
                                break;
                            case "formatDate":
                                if (value instanceof String) {
                                    try {
                                        row.put(column, new SimpleDateFormat("yyyy-MM-dd").format(
                                                new SimpleDateFormat("dd.MM.yyyy").parse((String) value)));
                                    } catch (Exception ignored) {
                                    }
                                }
                                break;
                        }
                    }
                }
            }
        }
        return data;
    }

    private List<Map<String, Object>> loadCsvRawData(Source source) throws IOException {
        JsonNode details = getConnectionDetails(source);
        String path = details.path("file_path").asText();

        if (path == null || path.isEmpty()) {
            throw new IllegalArgumentException("CSV source is missing 'file_path' for source id: " + source.getId());
        }

        File file = new File(path);
        if (!file.exists()) {
            throw new IOException("CSV file not found: " + path);
        }

        List<Map<String, Object>> result = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String headerLine = reader.readLine();
            if (headerLine == null) {
                System.out.println("CSV file is empty for source id: " + source.getId());
                return result;
            }

            String[] headers = headerLine.split(",");
            String line;
            while ((line = reader.readLine()) != null) {
                try {
                    String[] values = line.split(",");
                    Map<String, Object> row = new LinkedHashMap<>();
                    for (int i = 0; i < headers.length && i < values.length; i++) {
                        row.put(headers[i].trim(), values[i].trim());
                    }
                    result.add(row);
                } catch (Exception e) {
                    System.err.println("Skipping invalid CSV row for source id: " + source.getId() + ": " + e.getMessage());
                }
            }
        }

        System.out.println("Loaded CSV data for source id: " + source.getId() + ": " + result.size() + " rows");
        return result;
    }

    private List<Map<String, Object>> loadPostgresRawData(Source source) throws IOException {
        return executeJdbcQuery(source);
    }

    private List<Map<String, Object>> loadMySqlRawData(Source source) throws IOException {
        return executeJdbcQuery(source);
    }

    private List<Map<String, Object>> executeJdbcQuery(Source source) throws IOException {
        JsonNode details = getConnectionDetails(source);
        String host = details.path("host").asText();
        int port = details.path("port").asInt(3306);
        String dbName = details.path("db_name").asText();
        String username = details.path("user").asText("root");
        String password = details.path("password").asText("");
        String query = details.path("query").asText();
        JsonNode tablesNode = details.path("tables");

        String url = details.path("url").asText();
        if (url.isEmpty()) {
            if (host.isEmpty() || dbName.isEmpty()) {
                throw new IllegalArgumentException("Missing host or db_name for source id: " + source.getId());
            }
            String protocol = source.getType().toUpperCase().equals("MYSQL") ? "jdbc:mysql" : "jdbc:postgresql";
            url = String.format("%s://%s:%d/%s", protocol, host, port, dbName);
        }

        if (query.isEmpty() && tablesNode.isArray() && tablesNode.size() > 0) {
            String table = tablesNode.get(0).asText();
            if (!table.isEmpty()) {
                query = "SELECT * FROM " + table;
            }
        }

        if (query.isEmpty()) {
            throw new IllegalArgumentException("Missing query and no valid tables specified for source id: " + source.getId());
        }

        List<Map<String, Object>> result = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(url, username, password);
             PreparedStatement stmt = conn.prepareStatement(query);
             ResultSet rs = stmt.executeQuery()) {

            ResultSetMetaData meta = rs.getMetaData();
            int columnCount = meta.getColumnCount();

            while (rs.next()) {
                Map<String, Object> row = new LinkedHashMap<>();
                for (int i = 1; i <= columnCount; i++) {
                    row.put(meta.getColumnLabel(i), rs.getObject(i));
                }
                result.add(row);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Failed to load SQL data for source id: " + source.getId() + ": " + e.getMessage());
        }

        System.out.println("Loaded SQL data for source id: " + source.getId() + ": " + result.size() + " rows");
        return result;
    }

    private List<Map<String, Object>> loadJsonRawData(Source source) throws IOException {
        JsonNode details = getConnectionDetails(source);
        String path = details.path("file_path").asText();

        if (path == null || path.isEmpty()) {
            throw new IllegalArgumentException("Missing or empty file_path for JSON source id: " + source.getId());
        }

        System.out.println("Loading JSON source id: " + source.getId() + ", file_path: " + path);

        File file = new File(path);
        if (!file.exists()) {
            throw new IOException("JSON file not found: " + path);
        }

        JsonNode jsonArray;
        try {
            jsonArray = objectMapper.readTree(file);
        } catch (IOException e) {
            throw new IOException("Failed to parse JSON file for source id: " + source.getId() + ": " + e.getMessage());
        }

        if (!jsonArray.isArray()) {
            throw new IllegalArgumentException("Expected JSON array at root for source id: " + source.getId());
        }

        List<Map<String, Object>> result = new ArrayList<>();
        for (JsonNode node : jsonArray) {
            try {
                Map<String, Object> row = objectMapper.convertValue(node, new TypeReference<>() {});
                result.add(row);
            } catch (Exception e) {
                System.err.println("Skipping invalid JSON row for source id: " + source.getId() + ": " + e.getMessage());
            }
        }

        System.out.println("Loaded JSON data for source id: " + source.getId() + ": " + result.size() + " rows");
        return result;
    }

    private List<Map<String, Object>> loadMongoDbRawData(Source source) throws IOException {
        JsonNode details = getConnectionDetails(source);
        String uri = details.path("uri").asText();
        String database = details.path("database").asText();
        String collection = details.path("collection").asText();

        if (uri.isEmpty() || database.isEmpty() || collection.isEmpty()) {
            throw new IllegalArgumentException("Missing uri, database, or collection for source id: " + source.getId());
        }

        List<Map<String, Object>> result = new ArrayList<>();

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoCollection<Document> coll = mongoClient.getDatabase(database).getCollection(collection);
            for (Document doc : coll.find()) {
                Map<String, Object> row = new LinkedHashMap<>();
                doc.forEach((key, value) -> row.put(key, value));
                result.add(row);
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to load MongoDB data for source id: " + source.getId() + ": " + e.getMessage());
        }

        System.out.println("Loaded MongoDB data for source id: " + source.getId() + ": " + result.size() + " rows");
        return result;
    }

    private List<Map<String, Object>> loadRestApiRawData(Source source) throws IOException {
        JsonNode details = getConnectionDetails(source);
        String url = details.path("url").asText();

        if (url.isEmpty()) {
            throw new IllegalArgumentException("Missing url for source id: " + source.getId());
        }

        System.out.println("Loading REST API source id: " + source.getId() + ", url: " + url);

        HttpURLConnection conn;
        try {
            conn = (HttpURLConnection) URI.create(url).toURL().openConnection();
            conn.setRequestMethod("GET");
        } catch (Exception e) {
            throw new IOException("Failed to connect to REST API for source id: " + source.getId() + ": " + e.getMessage());
        }

        try (InputStream in = conn.getInputStream()) {
            JsonNode response = objectMapper.readTree(in);

            if (!response.isArray()) {
                throw new IllegalArgumentException("Expected JSON array from REST API for source id: " + source.getId());
            }

            List<Map<String, Object>> result = new ArrayList<>();
            for (JsonNode node : response) {
                try {
                    Map<String, Object> row = objectMapper.convertValue(node, new TypeReference<>() {});
                    result.add(row);
                } catch (Exception e) {
                    System.err.println("Skipping invalid REST API row for source id: " + source.getId() + ": " + e.getMessage());
                }
            }

            System.out.println("Loaded REST API data for source id: " + source.getId() + ": " + result.size() + " rows");
            return result;
        } catch (IOException e) {
            throw new IOException("Failed to read REST API response for source id: " + source.getId() + ": " + e.getMessage());
        } finally {
            conn.disconnect();
        }
    }

    private JsonNode getConnectionDetails(Source source) throws IOException {
        try {
            JsonNode details = source.getConnectionDetails();
            if (details == null || details.isNull()) {
                throw new IllegalArgumentException("connection_details is null for source id: " + source.getId());
            }
            return details;
        } catch (Exception e) {
            throw new IOException("Invalid connection_details for source id: " + source.getId() + ": " + e.getMessage());
        }
    }

    @Override
    public Map<String, Object> analyzeRawData(Long id, int limit) throws IOException {
        List<Map<String, Object>> data = loadRawData(id);
        if (data.size() > limit) {
            data = data.subList(0, limit);
        }

        Map<String, Object> analysis = new HashMap<>();
        analysis.put("rows", data);

        Map<String, Map<String, Object>> columnStats = new HashMap<>();
        for (Map<String, Object> row : data) {
            for (Map.Entry<String, Object> entry : row.entrySet()) {
                String column = entry.getKey();
                Object value = entry.getValue();
                Map<String, Object> stats = columnStats.computeIfAbsent(column, k -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("count", 0);
                    map.put("nullCount", 0);
                    map.put("uniqueValues", new HashSet<>());
                    return map;
                });
                stats.put("count", ((Number) stats.get("count")).intValue() + 1);
                if (value == null) {
                    stats.put("nullCount", ((Number) stats.get("nullCount")).intValue() + 1);
                } else {
                    stats.put("type", value.getClass().getSimpleName());
                    @SuppressWarnings("unchecked")
                    Set<Object> uniqueValues = (Set<Object>) stats.get("uniqueValues");
                    uniqueValues.add(value);
                }
            }
        }
        analysis.put("columns", columnStats);

        return analysis;
    }

    @Override
    public void saveNormalizationConfig(Long id, Map<String, Map<String, Object>> config) throws IOException {
        Source source = sourceRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Source not found with id: " + id));
        JsonNode details = getConnectionDetails(source);
        ObjectNode updatedDetails = details.deepCopy();
        updatedDetails.set("normalizationConfig", objectMapper.valueToTree(config));
        source.setConnectionDetails(updatedDetails);
        sourceRepository.save(source);
    }
}