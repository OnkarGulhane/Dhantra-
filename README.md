# Dhantra (PennyPilot) — Personal Finance Management Platform

**Version:** V1 — Core Expense Tracker (with Dynamic Category Management)  
**Documentation:** Located in [`docs/`](file:///e:/Dhantra/docs)

## Project Overview

Dhantra is a modern personal finance management platform designed to help users track expenses, manage income, monitor budgets, and understand spending patterns.

## Technology Stack

| Layer | Technology | Usage / Description |
|---|---|---|
| **Backend Framework** | **Java 17 / Spring Boot 3.1.5** | REST APIs, Spring Data JPA, Hibernate, Bean Validation |
| **Database** | **PostgreSQL 15** | Relational Database Engine |
| **DB Migrations** | **Flyway** | Versioned SQL migrations (`database/migrations/`) |
| **API Docs** | **OpenAPI 3 / Swagger UI** | Springdoc (`/swagger-ui.html`) |
| **Frontend Framework** | **React 18 + Vite 5** | Modern SPA with fast HMR |
| **UI & Styling** | **Vanilla CSS (Variables System)** | Custom modern design tokens without Tailwind |
| **Testing** | **JUnit 5, Mockito, H2** | Automated unit & integration tests |
| **DevOps & CI/CD** | **Docker & GitHub Actions** | Containerization & Automated CI Workflow |
| **API Testing** | **Postman** | Collection & Environment configs in `postman/` |

## Repository Structure

- `backend/` — Spring Boot REST API Service (Java 17 / PostgreSQL)
- `frontend/` — React Web Application (Vite / Vanilla CSS Design System)
- `database/` — Flyway Database Schema Migrations
- `docs/` — SRS and Product Roadmap Documentation
- `postman/` — Postman API Collection & Environment configuration
- `.github/workflows/` — CI/CD Pipeline Configuration

## Quick Start

### Backend
```bash
cd backend
mvn spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Database
PostgreSQL database migrations are located under `database/migrations/`.
