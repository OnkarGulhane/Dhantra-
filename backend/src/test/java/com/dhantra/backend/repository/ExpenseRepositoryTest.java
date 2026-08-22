package com.dhantra.backend.repository;

import com.dhantra.backend.entity.Category;
import com.dhantra.backend.entity.Expense;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
class ExpenseRepositoryTest {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Test
    void existsByCategoryId_ShouldReturnTrueWhenExpensesExist() {
        Category category = categoryRepository.findByNameIgnoreCase("Food")
                .orElseGet(() -> categoryRepository.save(new Category(null, "Snacks", "Snacks & Dining")));

        Expense expense = new Expense();
        expense.setTitle("Coffee");
        expense.setAmount(new BigDecimal("120.00"));
        expense.setCategory(category);
        expense.setExpenseDate(LocalDate.now());
        expenseRepository.save(expense);

        boolean exists = expenseRepository.existsByCategoryId(category.getId());
        assertTrue(exists);
    }
}
