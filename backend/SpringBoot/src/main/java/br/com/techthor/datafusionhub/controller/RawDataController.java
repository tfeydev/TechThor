package br.com.techthor.datafusionhub.controller;

import br.com.techthor.datafusionhub.dto.SourceRawDataDTO;
import br.com.techthor.datafusionhub.service.RawDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class RawDataController {

    private final RawDataService rawDataService;

    public RawDataController(RawDataService rawDataService) {
        this.rawDataService = rawDataService;
    }

    @GetMapping("/raw")
    public ResponseEntity<List<SourceRawDataDTO>> getAllRawData() {
        return ResponseEntity.ok(rawDataService.loadAllRawData());
    }

    @GetMapping("/raw/{id}")
    public ResponseEntity<?> getRawData(@PathVariable Long id) {
        try {
            List<Map<String, Object>> rawData = rawDataService.loadRawData(id);
            return ResponseEntity.ok(rawData);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error loading raw data for id " + id + ": " + e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body("Source not found with id " + id);
        }
    }

    @GetMapping("/analyze/{id}")
    public ResponseEntity<?> analyzeRawData(
            @PathVariable Long id,
            @RequestParam(defaultValue = "100") int limit) {
        try {
            Map<String, Object> analysis = rawDataService.analyzeRawData(id, limit);
            return ResponseEntity.ok(analysis);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error analyzing data for id " + id + ": " + e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body("Source not found with id " + id);
        }
    }

    @PostMapping("/save-normalization/{id}")
    public ResponseEntity<?> saveNormalizationConfig(
            @PathVariable Long id,
            @RequestBody Map<String, Map<String, Object>> config) {
        try {
            rawDataService.saveNormalizationConfig(id, config);
            return ResponseEntity.ok("Normalization config saved successfully for id " + id);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error saving normalization config for id " + id + ": " + e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body("Source not found with id " + id);
        }
    }
}