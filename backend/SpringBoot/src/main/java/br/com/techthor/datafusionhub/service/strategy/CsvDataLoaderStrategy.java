package br.com.techthor.datafusionhub.service.strategy;

import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

@Component
public class CsvDataLoaderStrategy implements RawDataLoaderStrategy {

    @Override
    public boolean supports(String type) {
        return "CSV".equalsIgnoreCase(type);
    }

    @Override
    public List<Map<String, Object>> loadData(String path) throws IOException {
        List<Map<String, Object>> result = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(path))) {
            String headerLine = reader.readLine();
            if (headerLine == null) return result;

            String[] headers = headerLine.split(",");
            String line;
            while ((line = reader.readLine()) != null) {
                String[] values = line.split(",");
                Map<String, Object> row = new LinkedHashMap<>();
                for (int i = 0; i < headers.length && i < values.length; i++) {
                    row.put(headers[i].trim(), values[i].trim());
                }
                result.add(row);
            }
        }

        return result;
    }
}
