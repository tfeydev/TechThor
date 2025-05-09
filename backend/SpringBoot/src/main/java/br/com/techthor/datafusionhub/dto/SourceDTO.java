package br.com.techthor.datafusionhub.dto;

import br.com.techthor.datafusionhub.validation.New;
import br.com.techthor.datafusionhub.validation.Existing;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;

public class SourceDTO {

    @NotBlank(groups = {New.class, Existing.class})
    private String name;

    @NotNull(groups = {New.class, Existing.class}, message = "connectionDetails dürfen nicht null sein")
    private JsonNode connectionDetails;

    @NotNull(groups = Existing.class, message = "updatedAt darf beim Update nicht null sein")
    private Instant updatedAt;

    private String type; // Optional, falls du `type` auch verwenden willst

    // Getter & Setter
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public JsonNode getConnectionDetails() {
        return connectionDetails;
    }
    public void setConnectionDetails(JsonNode connectionDetails) {
        this.connectionDetails = connectionDetails;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
}
