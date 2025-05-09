package br.com.techthor.datafusionhub.service;

import br.com.techthor.datafusionhub.dto.SourceDTO;
import br.com.techthor.datafusionhub.dto.SourceRawDataDTO;
import br.com.techthor.datafusionhub.model.Source;
import br.com.techthor.datafusionhub.repository.SourceRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Instant;
import java.util.List;
import java.util.Map;

@Service
public class SourceServiceImpl implements SourceService {

    private final SourceRepository sourceRepository;
    private final RawDataService rawDataService;

    public SourceServiceImpl(SourceRepository sourceRepository, RawDataService rawDataService) {
        this.sourceRepository = sourceRepository;
        this.rawDataService = rawDataService;
    }

    @Override
    public Source saveSource(SourceDTO dto) {
        Source source = new Source();
        source.setName(dto.getName());
        source.setType(dto.getType());
        source.setConnectionDetails(dto.getConnectionDetails());
        source.setUpdatedAt(Instant.now());
        return sourceRepository.save(source);
    }

    @Override
    public Source updateSource(Long id, SourceDTO dto) {
        Source source = showSource(id);
        source.setName(dto.getName());
        source.setType(dto.getType());
        source.setConnectionDetails(dto.getConnectionDetails());
        source.setUpdatedAt(Instant.now());
        return sourceRepository.save(source);
    }

    @Override
    public List<Source> findAll() {
        return sourceRepository.findAll();
    }

    @Override
    public Source showSource(Long id) {
        return sourceRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Source not found with id: " + id));
    }

    @Override
    public boolean existsById(Long id) {
        return sourceRepository.existsById(id);
    }

    @Override
    public void deleteById(Long id) {
        if (!existsById(id)) {
            throw new IllegalArgumentException("Source not found with id: " + id);
        }
        sourceRepository.deleteById(id);
    }

    @Override
    public List<Map<String, Object>> loadRawData(Long id) throws IOException {
        return rawDataService.loadRawData(id);
    }

    @Override
    public List<SourceRawDataDTO> loadAllRawData() {
        return rawDataService.loadAllRawData();
    }
}