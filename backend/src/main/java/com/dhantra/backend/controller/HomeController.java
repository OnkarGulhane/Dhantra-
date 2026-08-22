package com.dhantra.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, Object> home() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", "UP");
        response.put("service", "Dhantra Financial Platform REST API");
        response.put("version", "1.0.0");
        response.put("documentation", "/swagger-ui.html");
        response.put("categoriesApi", "/api/categories");
        response.put("expensesApi", "/api/expenses");
        return response;
    }
}
