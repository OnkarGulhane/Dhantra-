# Database Schema & Migrations

This folder contains Flyway SQL migrations for the PostgreSQL database of Dhantra / PennyPilot.

## Migrations

- `V1__initial_schema.sql` — Expense table schema
- `V2__introduce_dynamic_categories.sql` — Dynamic Category table, seed data, and foreign key constraint

## Running Migrations

Flyway automatically applies these scripts on Spring Boot application startup when enabled in `application.properties`:

```properties
spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration,filesystem:../database/migrations
```
