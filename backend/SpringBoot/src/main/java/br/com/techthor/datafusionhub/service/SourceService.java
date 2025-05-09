package br.com.techthor.datafusionhub.service;

import br.com.techthor.datafusionhub.dto.SourceDTO;
import br.com.techthor.datafusionhub.dto.SourceRawDataDTO;
import br.com.techthor.datafusionhub.model.Source;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface SourceService {
    Source saveSource(SourceDTO dto);
    Source updateSource(Long id, SourceDTO dto);
    List<Source> findAll();
    Source showSource(Long id);
    boolean existsById(Long id);
    void deleteById(Long id);
    List<Map<String, Object>> loadRawData(Long id) throws IOException;
    List<SourceRawDataDTO> loadAllRawData();
}