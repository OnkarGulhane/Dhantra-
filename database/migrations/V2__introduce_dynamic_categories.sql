-- V2__introduce_dynamic_categories.sql
-- Dhantra V1 - Introduce Dynamic Categories Management

-- 1. Create Category Table
CREATE TABLE IF NOT EXISTS category (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Case-insensitive unique index for category name
CREATE INDEX IF NOT EXISTS idx_category_name_lower ON category (name);

-- 2. Seed Default 7 Categories
INSERT INTO category (name, description) VALUES
    ('Food', 'Food, dining, groceries, and beverages'),
    ('Transport', 'Public transit, fuel, taxi, vehicle maintenance'),
    ('Shopping', 'Clothing, electronics, personal items'),
    ('Bills', 'Utilities, rent, internet, phone bills'),
    ('Health', 'Medical, pharmacy, fitness, wellness'),
    ('Entertainment', 'Movies, events, hobbies, subscriptions'),
    ('Other', 'Miscellaneous expenses');

-- 3. Add Foreign Key Column category_id to expense
ALTER TABLE expense ADD COLUMN IF NOT EXISTS category_id BIGINT;

-- 4. Backfill Existing Expense Records to Seeded Category IDs
UPDATE expense
SET category_id = (
    SELECT c.id FROM category c WHERE LOWER(expense.category) = LOWER(c.name)
)
WHERE category_id IS NULL AND category IS NOT NULL;

-- Default any unmapped expenses to 'Other' category
UPDATE expense
SET category_id = (SELECT id FROM category WHERE name = 'Other' LIMIT 1)
WHERE category_id IS NULL;

-- Make category_id mandatory and make legacy category string column nullable
ALTER TABLE expense ALTER COLUMN category_id SET NOT NULL;
ALTER TABLE expense ALTER COLUMN category DROP NOT NULL;

-- 5. Add Foreign Key Constraint (Block delete if referenced)
ALTER TABLE expense
    ADD CONSTRAINT fk_expense_category
    FOREIGN KEY (category_id)
    REFERENCES category(id)
    ON DELETE RESTRICT;

-- Drop legacy string column after migration verification
-- ALTER TABLE expense DROP COLUMN category;
