package br.com.techthor.datafusionhub.model;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "processed_data")
public class ProcessedData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "jsonb")
    private JsonNode dataJson;

    @Column
    private String status; // "draft" oder "released"

    @ElementCollection
    @CollectionTable(name = "processed_data_source_ids", joinColumns = @JoinColumn(name = "processed_data_id"))
    @Column(name = "source_id")
    private List<Long> sourceIds;

    // Getter und Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public JsonNode getDataJson() {
        return dataJson;
    }

    public void setDataJson(JsonNode dataJson) {
        this.dataJson = dataJson;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Long> getSourceIds() {
        return sourceIds;
    }

    public void setSourceIds(List<Long> sourceIds) {
        this.sourceIds = sourceIds;
    }
}