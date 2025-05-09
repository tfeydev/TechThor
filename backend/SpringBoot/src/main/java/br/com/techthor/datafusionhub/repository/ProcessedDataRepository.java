package br.com.techthor.datafusionhub.repository;

import br.com.techthor.datafusionhub.model.ProcessedData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcessedDataRepository extends JpaRepository<ProcessedData, Long> {
}