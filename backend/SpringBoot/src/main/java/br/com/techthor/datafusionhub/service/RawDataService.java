package br.com.techthor.datafusionhub.service;

import br.com.techthor.datafusionhub.dto.SourceRawDataDTO;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface RawDataService {
    List<SourceRawDataDTO> loadAllRawData();
    List<Map<String, Object>> loadRawData(Long id) throws IOException;
    Map<String, Object> analyzeRawData(Long id, int limit) throws IOException;
    void saveNormalizationConfig(Long id, Map<String, Map<String, Object>> config) throws IOException;
}