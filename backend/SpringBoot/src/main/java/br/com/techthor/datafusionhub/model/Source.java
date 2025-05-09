package br.com.techthor.datafusionhub.model;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.JdbcTypeCode; // Neu hinzufügen
import org.hibernate.type.SqlTypes; // Neu hinzufügen

import java.time.Instant;

@Entity
@Table(name = "data_sources", schema = "datafusion")
public class Source {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "connection_details", columnDefinition = "jsonb")
    @JdbcTypeCode(SqlTypes.JSON) // Neu hinzufügen
    private JsonNode connectionDetails;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "last_updated")
    private Instant updatedAt;

    // Getter & Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public JsonNode getConnectionDetails() { return connectionDetails; }
    public void setConnectionDetails(JsonNode connectionDetails) { this.connectionDetails = connectionDetails; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
