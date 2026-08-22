package com.dhantra.backend.service.impl;

import com.dhantra.backend.dto.request.CategoryRequest;
import com.dhantra.backend.dto.response.CategoryResponse;
import com.dhantra.backend.entity.Category;
import com.dhantra.backend.exception.DuplicateResourceException;
import com.dhantra.backend.exception.ResourceInUseException;
import com.dhantra.backend.exception.ResourceNotFoundException;
import com.dhantra.backend.mapper.CategoryMapper;
import com.dhantra.backend.repository.CategoryRepository;
import com.dhantra.backend.repository.ExpenseRepository;
import com.dhantra.backend.service.CategoryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final ExpenseRepository expenseRepository;
    private final CategoryMapper categoryMapper;

    public CategoryServiceImpl(CategoryRepository categoryRepository,
                                ExpenseRepository expenseRepository,
                                CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.expenseRepository = expenseRepository;
        this.categoryMapper = categoryMapper;
    }

    @Override
    public CategoryResponse createCategory(CategoryRequest request) {
        if (categoryRepository.existsByNameIgnoreCase(request.getName())) {
            throw new DuplicateResourceException("Category with name '" + request.getName() + "' already exists");
        }
        Category category = categoryMapper.toEntity(request);
        Category savedCategory = categoryRepository.save(category);
        return categoryMapper.toResponse(savedCategory);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(categoryMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryResponse getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + id));
        return categoryMapper.toResponse(category);
    }

    @Override
    public CategoryResponse updateCategory(Long id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + id));

        if (categoryRepository.existsByNameIgnoreCaseAndIdNot(request.getName(), id)) {
            throw new DuplicateResourceException("Category with name '" + request.getName() + "' already exists");
        }

        categoryMapper.updateEntityFromRequest(request, category);
        Category updatedCategory = categoryRepository.save(category);
        return categoryMapper.toResponse(updatedCategory);
    }

    @Override
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + id));

        if (expenseRepository.existsByCategoryId(id)) {
            throw new ResourceInUseException("Cannot delete category '" + category.getName() + "' because it is referenced by existing expenses");
        }

        categoryRepository.delete(category);
    }
}
