package com.dhantra.backend.repository;

import com.dhantra.backend.entity.Category;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class CategoryRepositoryTest {

    @Autowired
    private CategoryRepository categoryRepository;

    @Test
    void findByNameIgnoreCase_ShouldReturnCategory() {
        Category category = new Category(null, "Health", "Medical expenses");
        categoryRepository.save(category);

        Optional<Category> found = categoryRepository.findByNameIgnoreCase("health");

        assertTrue(found.isPresent());
        assertEquals("Health", found.get().getName());
    }
}
