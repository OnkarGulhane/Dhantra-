package com.dhantra.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
public class CustomErrorController implements ErrorController {

    @RequestMapping("/error")
    public ResponseEntity<Map<String, Object>> handleError(HttpServletRequest request) {
        Object status = request.getAttribute("jakarta.servlet.error.status_code");
        int statusCode = status != null ? Integer.parseInt(status.toString()) : 404;

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", statusCode);
        response.put("error", statusCode == 404 ? "Endpoint Not Found" : "Server Error");
        response.put("message", "The requested API route does not exist. Please refer to documentation or API endpoints below.");
        response.put("documentation", "/swagger-ui.html");
        response.put("categoriesApi", "/api/categories");
        response.put("expensesApi", "/api/expenses");

        return ResponseEntity.status(statusCode).body(response);
    }
}
