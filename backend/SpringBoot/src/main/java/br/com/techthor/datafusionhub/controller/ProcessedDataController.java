package br.com.techthor.datafusionhub.controller;

import br.com.techthor.datafusionhub.model.ProcessedData;
import br.com.techthor.datafusionhub.repository.ProcessedDataRepository;
import br.com.techthor.datafusionhub.service.DataProcessingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/processed-data")
public class ProcessedDataController {

    private final DataProcessingService dataProcessingService;
    private final ProcessedDataRepository processedDataRepository;

    public ProcessedDataController(DataProcessingService dataProcessingService, ProcessedDataRepository processedDataRepository) {
        this.dataProcessingService = dataProcessingService;
        this.processedDataRepository = processedDataRepository;
    }

    @PostMapping("/join")
    public ResponseEntity<?> performJoin(
            @RequestParam Long[] sourceIds,
            @RequestParam String joinKey) {
        try {
            ProcessedData result = dataProcessingService.performJoin(sourceIds, joinKey);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error performing join: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProcessedData(@PathVariable Long id) {
        // Use a simple conditional check to avoid type mismatch
        var processedData = processedDataRepository.findById(id);
        if (processedData.isPresent()) {
            return ResponseEntity.ok(processedData.get());
        } else {
            return ResponseEntity.status(404).body("Processed data not found with id: " + id);
        }
    }
}