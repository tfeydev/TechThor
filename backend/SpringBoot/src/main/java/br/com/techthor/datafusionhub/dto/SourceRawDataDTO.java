package br.com.techthor.datafusionhub.dto;

import java.util.List;
import java.util.Map;

public class SourceRawDataDTO {
    private Long id;
    private String name;
    private String type;
    private List<Map<String, Object>> rawData;

    // No-arg constructor
    public SourceRawDataDTO() {}

    // Parameterized constructor
    public SourceRawDataDTO(Long id, String name, String type, List<Map<String, Object>> rawData) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.rawData = rawData;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<Map<String, Object>> getRawData() {
        return rawData;
    }

    public void setRawData(List<Map<String, Object>> rawData) {
        this.rawData = rawData;
    }
}