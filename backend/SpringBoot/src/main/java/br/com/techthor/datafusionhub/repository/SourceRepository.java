package br.com.techthor.datafusionhub.repository;

import br.com.techthor.datafusionhub.model.Source;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SourceRepository extends JpaRepository<Source, Long> {
    boolean existsByName(String name);
}
