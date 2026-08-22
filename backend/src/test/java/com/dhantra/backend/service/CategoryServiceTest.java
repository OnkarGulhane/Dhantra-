package com.dhantra.backend.service;

import com.dhantra.backend.dto.request.CategoryRequest;
import com.dhantra.backend.entity.Category;
import com.dhantra.backend.exception.DuplicateResourceException;
import com.dhantra.backend.exception.ResourceInUseException;
import com.dhantra.backend.mapper.CategoryMapper;
import com.dhantra.backend.repository.CategoryRepository;
import com.dhantra.backend.repository.ExpenseRepository;
import com.dhantra.backend.service.impl.CategoryServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private ExpenseRepository expenseRepository;

    @Mock
    private CategoryMapper categoryMapper;

    @InjectMocks
    private CategoryServiceImpl categoryService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createCategory_DuplicateName_ThrowsException() {
        CategoryRequest request = new CategoryRequest("Food", "Food & Dining");
        when(categoryRepository.existsByNameIgnoreCase("Food")).thenReturn(true);

        assertThrows(DuplicateResourceException.class, () -> categoryService.createCategory(request));
    }

    @Test
    void deleteCategory_InUse_ThrowsResourceInUseException() {
        Category category = new Category(1L, "Bills", "Monthly bills");
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(expenseRepository.existsByCategoryId(1L)).thenReturn(true);

        assertThrows(ResourceInUseException.class, () -> categoryService.deleteCategory(1L));
    }
}
