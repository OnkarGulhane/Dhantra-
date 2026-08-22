package com.dhantra.backend.repository;

import com.dhantra.backend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT c FROM Category c WHERE LOWER(c.name) = LOWER(:name)")
    Optional<Category> findByNameIgnoreCase(@Param("name") String name);

    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM Category c WHERE LOWER(c.name) = LOWER(:name)")
    boolean existsByNameIgnoreCase(@Param("name") String name);

    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM Category c WHERE LOWER(c.name) = LOWER(:name) AND c.id <> :id")
    boolean existsByNameIgnoreCaseAndIdNot(@Param("name") String name, @Param("id") Long id);
}
