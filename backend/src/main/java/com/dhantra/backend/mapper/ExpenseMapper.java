package com.dhantra.backend.mapper;

import com.dhantra.backend.dto.request.CreateExpenseRequest;
import com.dhantra.backend.dto.response.ExpenseResponse;
import com.dhantra.backend.entity.Category;
import com.dhantra.backend.entity.Expense;
import org.springframework.stereotype.Component;

@Component
public class ExpenseMapper {

    private final CategoryMapper categoryMapper;

    public ExpenseMapper(CategoryMapper categoryMapper) {
        this.categoryMapper = categoryMapper;
    }

    public Expense toEntity(CreateExpenseRequest request, Category category) {
        if (request == null) return null;
        Expense expense = new Expense();
        expense.setTitle(request.getTitle() != null ? request.getTitle().trim() : null);
        expense.setAmount(request.getAmount());
        expense.setCategory(category);
        expense.setExpenseDate(request.getExpenseDate());
        expense.setDescription(request.getDescription() != null ? request.getDescription().trim() : null);
        return expense;
    }

    public ExpenseResponse toResponse(Expense entity) {
        if (entity == null) return null;
        ExpenseResponse response = new ExpenseResponse();
        response.setId(entity.getId());
        response.setTitle(entity.getTitle());
        response.setAmount(entity.getAmount());
        response.setCategory(categoryMapper.toResponse(entity.getCategory()));
        response.setExpenseDate(entity.getExpenseDate());
        response.setDescription(entity.getDescription());
        response.setCreatedAt(entity.getCreatedAt());
        response.setUpdatedAt(entity.getUpdatedAt());
        return response;
    }
}
