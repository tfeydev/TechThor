package br.com.techthor.datafusionhub.service.strategy;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Component
public class JsonDataLoaderStrategy implements RawDataLoaderStrategy {

    private final ObjectMapper objectMapper;

    public JsonDataLoaderStrategy(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public boolean supports(String type) {
        return "JSON".equalsIgnoreCase(type);
    }

    @Override
    public List<Map<String, Object>> loadData(String path) throws IOException {
        File file = new File(path);
        if (!file.exists()) {
            throw new IOException("Datei nicht gefunden: " + path);
        }

        // JSON kann ein Array von Objekten sein oder ein einzelnes Objekt
        if (objectMapper.readTree(file).isArray()) {
            return objectMapper.readValue(file, new TypeReference<List<Map<String, Object>>>() {});
        } else {
            Map<String, Object> single = objectMapper.readValue(file, new TypeReference<Map<String, Object>>() {});
            return Collections.singletonList(single);
        }
    }
}
