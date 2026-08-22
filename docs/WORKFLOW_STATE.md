# Dhantra Project — Current Workflow State & Resume Guide

**Last Saved:** 2026-08-21  
**Project Name:** Dhantra (formerly referenced as PennyPilot)  
**Current Milestone:** V1 — Core Expense Tracker with Dynamic Category Management (100% Scaffolded, Migrated & REST API Tested)

---

## 📌 Environment & Service Configuration

| Service | Host / Port | Credentials / Target |
|---|---|---|
| **PostgreSQL 17 Database** | `127.0.0.1:5433` | DB: `dhantra`, User: `postgres`, Pass: `postgres` |
| **Spring Boot Backend API** | `http://localhost:8080` | Package: `com.dhantra.backend`, Port: `8080` |
| **React Frontend SPA** | `http://localhost:3000` | Port: `3000` (Vite) |
| **Flyway Migrations** | `database/migrations/` | `V1__initial_schema.sql`, `V2__introduce_dynamic_categories.sql` |
| **Postman API Suite** | `postman/` | `Dhantra.postman_collection.json`, `Dhantra.postman_environment.json` |

---

## 🛠️ Commands to Resume Session Quickly

### 1. Start PostgreSQL 17 (if stopped)
```powershell
& "C:\Program Files\PostgreSQL\17\bin\pg_ctl.exe" start -D "C:\Program Files\PostgreSQL\17\data" -o "-p 5433"
```

### 2. Run Backend REST API Service
```powershell
cd e:\Dhantra\backend
java -jar target/dhantra-backend-1.0.0.jar
```

### 3. Run Frontend React Web UI
```powershell
cd e:\Dhantra\frontend
npm install
npm run dev
```

---

## 📊 Summary of Completed Work (V1)
- [x] Refactored all packages and configuration to `com.dhantra.backend`.
- [x] Created Flyway migration scripts `V1` and `V2` (Dynamic Categories + Seed data).
- [x] Created `dhantra_db` PostgreSQL database on port `5433`.
- [x] Built `dhantra-backend-1.0.0.jar` and launched Spring Boot backend on port `8080`.
- [x] Ran 11-step complete REST API re-testing suite (Category & Expense CRUD + SRS FR-13 deletion safeguard verified).
- [x] Frontend React application structure scaffolded with dynamic Category dropdowns and Vanilla CSS design system.

---

## 🚀 Ready Next Steps (When Returning)
1. Start Frontend UI dev server (`cd frontend; npm run dev`) and test UI in browser.
2. Begin planning V2 scope (Search, Filtering, Sorting, Pagination) as outlined in `docs/PRODUCT_ROADMAP1.md`.
