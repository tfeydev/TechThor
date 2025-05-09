package br.com.techthor.datafusionhub.service.strategy;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface RawDataLoaderStrategy {
    boolean supports(String type);
    List<Map<String, Object>> loadData(String path) throws IOException;
}
