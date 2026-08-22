package com.dhantra.backend.controller;

import com.dhantra.backend.dto.request.CategoryRequest;
import com.dhantra.backend.dto.response.CategoryResponse;
import com.dhantra.backend.service.CategoryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class CategoryControllerTest {

    @Mock
    private CategoryService categoryService;

    @InjectMocks
    private CategoryController categoryController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createCategory_ShouldReturnCreated() {
        CategoryRequest request = new CategoryRequest("Food", "Food & Dining");
        CategoryResponse response = new CategoryResponse(1L, "Food", "Food & Dining", null, null);
        when(categoryService.createCategory(any(CategoryRequest.class))).thenReturn(response);

        ResponseEntity<CategoryResponse> result = categoryController.createCategory(request);

        assertEquals(HttpStatus.CREATED, result.getStatusCode());
        assertEquals("Food", result.getBody().getName());
    }

    @Test
    void getAllCategories_ShouldReturnList() {
        CategoryResponse response = new CategoryResponse(1L, "Transport", "Travel", null, null);
        when(categoryService.getAllCategories()).thenReturn(List.of(response));

        ResponseEntity<List<CategoryResponse>> result = categoryController.getAllCategories();

        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertEquals(1, result.getBody().size());
    }

    @Test
    void deleteCategory_ShouldReturnNoContent() {
        doNothing().when(categoryService).deleteCategory(1L);

        ResponseEntity<Void> result = categoryController.deleteCategory(1L);

        assertEquals(HttpStatus.NO_CONTENT, result.getStatusCode());
        verify(categoryService, times(1)).deleteCategory(1L);
    }
}
