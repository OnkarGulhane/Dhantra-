package com.dhantra.backend.mapper;

import com.dhantra.backend.dto.request.CategoryRequest;
import com.dhantra.backend.dto.response.CategoryResponse;
import com.dhantra.backend.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    public Category toEntity(CategoryRequest request) {
        if (request == null) return null;
        Category category = new Category();
        category.setName(request.getName() != null ? request.getName().trim() : null);
        category.setDescription(request.getDescription() != null ? request.getDescription().trim() : null);
        return category;
    }

    public CategoryResponse toResponse(Category entity) {
        if (entity == null) return null;
        return new CategoryResponse(
                entity.getId(),
                entity.getName(),
                entity.getDescription(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }

    public void updateEntityFromRequest(CategoryRequest request, Category entity) {
        if (request == null || entity == null) return;
        entity.setName(request.getName() != null ? request.getName().trim() : entity.getName());
        entity.setDescription(request.getDescription() != null ? request.getDescription().trim() : entity.getDescription());
    }
}
