package com.dhantra.backend.service.impl;

import com.dhantra.backend.dto.request.CreateExpenseRequest;
import com.dhantra.backend.dto.request.UpdateExpenseRequest;
import com.dhantra.backend.dto.response.ExpenseResponse;
import com.dhantra.backend.entity.Category;
import com.dhantra.backend.entity.Expense;
import com.dhantra.backend.exception.ResourceNotFoundException;
import com.dhantra.backend.mapper.ExpenseMapper;
import com.dhantra.backend.repository.CategoryRepository;
import com.dhantra.backend.repository.ExpenseRepository;
import com.dhantra.backend.service.ExpenseService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final CategoryRepository categoryRepository;
    private final ExpenseMapper expenseMapper;

    public ExpenseServiceImpl(ExpenseRepository expenseRepository,
                              CategoryRepository categoryRepository,
                              ExpenseMapper expenseMapper) {
        this.expenseRepository = expenseRepository;
        this.categoryRepository = categoryRepository;
        this.expenseMapper = expenseMapper;
    }

    @Override
    public ExpenseResponse createExpense(CreateExpenseRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + request.getCategoryId()));

        Expense expense = expenseMapper.toEntity(request, category);
        Expense saved = expenseRepository.save(expense);
        return expenseMapper.toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ExpenseResponse> getAllExpenses() {
        return expenseRepository.findAll().stream()
                .map(expenseMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ExpenseResponse getExpenseById(Long id) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found with ID: " + id));
        return expenseMapper.toResponse(expense);
    }

    @Override
    public ExpenseResponse updateExpense(Long id, UpdateExpenseRequest request) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found with ID: " + id));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + request.getCategoryId()));

        expense.setTitle(request.getTitle());
        expense.setAmount(request.getAmount());
        expense.setCategory(category);
        expense.setExpenseDate(request.getExpenseDate());
        expense.setDescription(request.getDescription());

        Expense updated = expenseRepository.save(expense);
        return expenseMapper.toResponse(updated);
    }

    @Override
    public void deleteExpense(Long id) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found with ID: " + id));
        expenseRepository.delete(expense);
    }
}
