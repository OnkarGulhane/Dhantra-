package com.dhantra.backend.controller;

import com.dhantra.backend.dto.request.CreateExpenseRequest;
import com.dhantra.backend.dto.response.ExpenseResponse;
import com.dhantra.backend.service.ExpenseService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ExpenseControllerTest {

    @Mock
    private ExpenseService expenseService;

    @InjectMocks
    private ExpenseController expenseController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createExpense_ShouldReturnCreated() {
        CreateExpenseRequest request = new CreateExpenseRequest();
        request.setTitle("Lunch");
        request.setAmount(new BigDecimal("250.00"));
        request.setCategoryId(1L);
        request.setExpenseDate(LocalDate.now());

        ExpenseResponse response = new ExpenseResponse();
        response.setId(1L);
        response.setTitle("Lunch");

        when(expenseService.createExpense(any(CreateExpenseRequest.class))).thenReturn(response);

        ResponseEntity<ExpenseResponse> result = expenseController.createExpense(request);

        assertEquals(HttpStatus.CREATED, result.getStatusCode());
        assertEquals("Lunch", result.getBody().getTitle());
    }

    @Test
    void getAllExpenses_ShouldReturnList() {
        when(expenseService.getAllExpenses()).thenReturn(List.of(new ExpenseResponse()));

        ResponseEntity<List<ExpenseResponse>> result = expenseController.getAllExpenses();

        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertEquals(1, result.getBody().size());
    }
}
