package com.dhantra.backend.service;

import com.dhantra.backend.dto.request.CreateExpenseRequest;
import com.dhantra.backend.exception.ResourceNotFoundException;
import com.dhantra.backend.mapper.ExpenseMapper;
import com.dhantra.backend.repository.CategoryRepository;
import com.dhantra.backend.repository.ExpenseRepository;
import com.dhantra.backend.service.impl.ExpenseServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

class ExpenseServiceTest {

    @Mock
    private ExpenseRepository expenseRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private ExpenseMapper expenseMapper;

    @InjectMocks
    private ExpenseServiceImpl expenseService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createExpense_InvalidCategory_ThrowsNotFoundException() {
        CreateExpenseRequest request = new CreateExpenseRequest();
        request.setCategoryId(99L);

        when(categoryRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> expenseService.createExpense(request));
    }
}
