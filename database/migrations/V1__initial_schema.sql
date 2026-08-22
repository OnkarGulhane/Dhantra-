-- V1__initial_schema.sql
-- Dhantra V1 Initial Database Schema

CREATE TABLE IF NOT EXISTS expense (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    expense_date DATE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_expense_date ON expense(expense_date);
CREATE INDEX idx_expense_category ON expense(category);
