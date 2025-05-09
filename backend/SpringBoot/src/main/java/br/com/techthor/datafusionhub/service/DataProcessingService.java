package br.com.techthor.datafusionhub.service;

import br.com.techthor.datafusionhub.model.ProcessedData;
import br.com.techthor.datafusionhub.repository.ProcessedDataRepository;
// import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
// import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class DataProcessingService {

    private final RawDataService rawDataService;
    private final ProcessedDataRepository processedDataRepository;
    private final ObjectMapper objectMapper;

    public DataProcessingService(RawDataService rawDataService, ProcessedDataRepository processedDataRepository, ObjectMapper objectMapper) {
        this.rawDataService = rawDataService;
        this.processedDataRepository = processedDataRepository;
        this.objectMapper = objectMapper;
    }

    public ProcessedData performJoin(Long[] sourceIds, String joinKey) throws Exception {
        // Lade Rohdaten der Quellen
        List<List<Map<String, Object>>> allSourceData = new ArrayList<>();
        for (Long sourceId : sourceIds) {
            List<Map<String, Object>> data = rawDataService.loadRawData(sourceId);
            allSourceData.add(data);
        }

        // Beispiel: Join von zwei Quellen (kann auf mehr erweitert werden)
        if (allSourceData.size() != 2) {
            throw new IllegalArgumentException("Join unterstützt aktuell nur zwei Quellen.");
        }

        List<Map<String, Object>> source1Data = allSourceData.get(0);
        List<Map<String, Object>> source2Data = allSourceData.get(1);

        // Erstelle eine Map für die erste Quelle basierend auf dem Join-Schlüssel
        Map<Object, List<Map<String, Object>>> source1Grouped = source1Data.stream()
                .collect(Collectors.groupingBy(row -> row.get(joinKey)));

        // Führe den Join durch
        List<Map<String, Object>> joinedData = new ArrayList<>();
        for (Map<String, Object> row2 : source2Data) {
            Object keyValue = row2.get(joinKey);
            List<Map<String, Object>> matchingRows = source1Grouped.getOrDefault(keyValue, Collections.emptyList());
            for (Map<String, Object> row1 : matchingRows) {
                Map<String, Object> joinedRow = new HashMap<>();
                // Präfixe hinzufügen, um Spalten eindeutig zu machen
                row1.forEach((key, value) -> joinedRow.put("source1_" + key, value));
                row2.forEach((key, value) -> joinedRow.put("source2_" + key, value));
                joinedData.add(joinedRow);
            }
        }

        // Konvertiere das Ergebnis in JSONB und speichere es in processed_data
        ObjectNode resultNode = objectMapper.createObjectNode();
        resultNode.set("joined_data", objectMapper.valueToTree(joinedData));

        ProcessedData processedData = new ProcessedData();
        processedData.setDataJson(resultNode);
        processedData.setStatus("draft");
        processedData.setSourceIds(Arrays.asList(sourceIds));
        return processedDataRepository.save(processedData);
    }
}