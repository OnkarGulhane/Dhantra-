package com.dhantra.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Value("${cors.allowed-origins:${CORS_ALLOWED_ORIGINS:http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000}}")
    private String allowedOrigins;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                String[] origins = Arrays.stream(allowedOrigins.split(","))
                        .map(String::trim)
                        .filter(s -> !s.isEmpty())
                        .toArray(String[]::new);

                boolean hasWildcard = Arrays.stream(origins).anyMatch(s -> s.equals("*"));

                CorsRegistration registration = registry.addMapping("/**");

                if (hasWildcard) {
                    registration.allowedOriginPatterns("*")
                            .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                            .allowedHeaders("*")
                            .allowCredentials(false)
                            .maxAge(3600);
                } else {
                    registration.allowedOrigins(origins)
                            .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                            .allowedHeaders("*")
                            .allowCredentials(true)
                            .maxAge(3600);
                }
            }
        };
    }
}
