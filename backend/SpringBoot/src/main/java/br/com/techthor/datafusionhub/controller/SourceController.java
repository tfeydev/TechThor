package br.com.techthor.datafusionhub.controller;

import br.com.techthor.datafusionhub.dto.SourceDTO;
import br.com.techthor.datafusionhub.model.Source;
import br.com.techthor.datafusionhub.service.SourceService;
import br.com.techthor.datafusionhub.validation.New;
import br.com.techthor.datafusionhub.validation.Existing;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sources")
public class SourceController {

    private final SourceService sourceService;

    public SourceController(SourceService sourceService) {
        this.sourceService = sourceService;
    }

    @GetMapping
    public ResponseEntity<List<Source>> getAllSources() {
        List<Source> sources = sourceService.findAll();
        return ResponseEntity.ok(sources);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Source> getSourceById(@PathVariable Long id) {
        Source source = sourceService.showSource(id);
        return ResponseEntity.ok(source);
    }

    @PostMapping
    @Validated(New.class)
    public ResponseEntity<Source> saveSource(@Validated(New.class) @RequestBody SourceDTO dto) {
        Source source = sourceService.saveSource(dto);
        return ResponseEntity.ok(source);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Source> updateSource(@PathVariable Long id, @Validated(Existing.class) @RequestBody SourceDTO dto) {
        Source source = sourceService.updateSource(id, dto);
        return ResponseEntity.ok(source);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSourceById(@PathVariable Long id) {
        if (!sourceService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        sourceService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
