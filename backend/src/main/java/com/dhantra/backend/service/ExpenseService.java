package com.dhantra.backend.service;

import com.dhantra.backend.dto.request.CreateExpenseRequest;
import com.dhantra.backend.dto.request.UpdateExpenseRequest;
import com.dhantra.backend.dto.response.ExpenseResponse;

import java.util.List;

public interface ExpenseService {
    ExpenseResponse createExpense(CreateExpenseRequest request);
    List<ExpenseResponse> getAllExpenses();
    ExpenseResponse getExpenseById(Long id);
    ExpenseResponse updateExpense(Long id, UpdateExpenseRequest request);
    void deleteExpense(Long id);
}
