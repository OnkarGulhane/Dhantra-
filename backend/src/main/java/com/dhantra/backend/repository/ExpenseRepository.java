package com.dhantra.backend.repository;

import com.dhantra.backend.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    @Query("SELECT CASE WHEN COUNT(e) > 0 THEN true ELSE false END FROM Expense e WHERE e.category.id = :categoryId")
    boolean existsByCategoryId(@Param("categoryId") Long categoryId);

    long countByCategoryId(Long categoryId);
}
