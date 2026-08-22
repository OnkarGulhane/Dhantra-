# Dhantra — Software Requirements Specification (SRS)

**Product:** Dhantra (formerly referenced as PennyPilot in early planning docs)
**Version:** V1 — Core Expense Tracker (with Dynamic Category Management)
**Document Type:** Software Requirements Specification
**Status:** Final Draft — Pending Approval on Open Items (Section 9)
**Location in repo:** `docs/SRS.md` (per approved top-level structure)
**Verified against:** `PRODUCT_ROADMAP1.md`, `Agents.md`, Top-Level/Frontend/Backend architecture diagrams

---

## 1. Purpose

This SRS defines the functional and non-functional requirements for **Dhantra V1**, extending the original PennyPilot V1 scope (Core Expense Tracker) with **dynamic, user-managed Category CRUD operations**, replacing the static/hardcoded category list currently defined in the roadmap and frontend constants.

This document governs implementation and must be followed alongside `Agents.md` engineering rules. All 15 rules were re-checked against this SRS before finalizing (Section 12).

---

## 2. Naming Clarification (Open Item — Requires Approval)

The product is being rebranded from **PennyPilot** to **Dhantra**. Per `Agents.md` rule 15, the scope of this rename is not fully specified by the user yet. This SRS assumes the following **until confirmed**:

| Item | Assumed Scope for V1 |
|---|---|
| Product name in UI, docs, README | ✅ Renamed to **Dhantra** |
| SRS, roadmap, documentation title | ✅ Renamed to **Dhantra** |
| Java base package (`com.pennypilot.backend`) | ⏸ Unchanged — pending approval |
| Repository root folder name (`pennypilot/`) | ⏸ Unchanged — pending approval |
| Database name / schema | ⏸ Unchanged — pending approval |
| Frontend `VITE_APP_NAME` env variable | ✅ Updated to `Dhantra` via `.env` (not hardcoded — rule 9 compliant) |

**Rationale:** A full package/repo/DB rename touches nearly every file in both `backend/` and `frontend/`. Bundling that into a feature change (dynamic categories) risks violating rule 11 (don't modify unrelated files) and rule 1 (don't change approved architecture) if done without explicit, isolated sign-off. Recommend tracking a full technical rename as its own separate task if required.

---

## 3. Scope

### 3.1 In Scope
- Dynamic Category entity: full Create, Read, Update, Delete via API and UI
- Removal of hardcoded category list from `PRODUCT_ROADMAP1.md`-defined static set and from **`frontend/src/constants/expenseConstants.js`** (confirmed location of current hardcoded "Categories" — see Section 8.1)
- Backend: implement/verify `CategoryService`, `CategoryRequest`/`CategoryResponse` DTOs (not yet explicitly confirmed to exist — see Section 7.3), building on the already-present `Category` entity, `CategoryRepository`, `CategoryController`, `CategoryMapper`
- Frontend: new Category management page and components, following existing folder conventions
- Association of Expense records with dynamic Category (foreign key)
- Database migration for schema + data backfill
- Postman collection update for new endpoints
- Tests for all new functionality (rule 10)

### 3.2 Out of Scope for V1
- Multi-user category ownership / RBAC (planned V5 per roadmap)
- Category-level budget rules (planned V3 — note: `Budget.java` entity and `BudgetRepository` already exist in the approved backend diagram, but wiring them is out of scope here)
- AI-based auto-categorization (planned V11)
- Full technical project rename (package/repo/DB) — pending separate approval

---

## 4. References

- `PRODUCT_ROADMAP1.md` — Section 5 (V1 scope), Section 6 (V2 scope, for forward-compatibility of filtering/search on categories)
- `Agents.md` — governing engineering rules (verbatim re-verified in Section 12)
- Approved architecture diagrams: Top-Level Project Structure, Frontend Structure, Backend Structure

---

## 5. Functional Requirements

### 5.1 Expense Management (Existing V1 Scope — Unchanged)
| ID | Requirement |
|---|---|
| FR-1 | Create expense (title, amount, category, date, description) |
| FR-2 | View all expenses |
| FR-3 | View a single expense by ID |
| FR-4 | Update an expense |
| FR-5 | Delete an expense |
| FR-6 | Filter expenses by category and date |
| FR-7 | Show total expense amount and expense count |

### 5.2 Dynamic Category Management (New — This SRS)
| ID | Requirement |
|---|---|
| FR-8 | User can create a new category (name, optional description) |
| FR-9 | User can view the full list of categories |
| FR-10 | User can view a single category by ID |
| FR-11 | User can update an existing category's details |
| FR-12 | User can delete a category, subject to the safeguard in FR-13 |
| FR-13 | System must block deletion of a category referenced by existing expenses, returning a clear `409 Conflict`, rather than silently cascading (default policy — confirm in Section 9) |
| FR-14 | Category name must be unique, case-insensitive |
| FR-15 | System seeds default categories (Food, Transport, Shopping, Bills, Health, Entertainment, Other) once, on first run/migration only — these become fully editable/deletable afterward, no longer hardcoded in application logic |
| FR-16 | Expense create/edit forms populate the category dropdown dynamically from the Category API — the static array in `expenseConstants.js` must be removed |

---

## 6. Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR-1 | Category APIs follow existing REST/DTO conventions, matching the `ExpenseRequest`/`ExpenseResponse` pattern already used |
| NFR-2 | Global exception handling (`GlobalExceptionHandler`) reused/extended for category errors: duplicate name, not found, in-use conflict |
| NFR-3 | No inline styles in any new Category UI component (rule 8) |
| NFR-4 | No hardcoded category data anywhere in frontend or backend logic after this change (rule 9) |
| NFR-5 | New endpoints documented and added to `PennyPilot.postman_collection.json` (or renamed collection, per Section 2 resolution) |
| NFR-6 | Automated tests at controller, service, and repository layers for all new functionality (rule 10) |
| NFR-7 | No secrets involved in this feature; any config values via `.env` / `application-*.properties`, never committed (rules 3–5) |

---

## 7. Data Model & Backend Verification

### 7.1 Category Entity (confirmed already present in approved architecture)
```
Category
├── id            (PK)
├── name          (unique, required)
├── description   (optional)
├── createdAt
└── updatedAt
```

### 7.2 Expense Entity — Relationship Update
```
Expense
├── ...existing fields
└── category_id  → Foreign Key → Category.id   (replaces free-text/enum category field)
```

### 7.3 Backend Components — Verification Status
| Component | Status per Backend Diagram | Action Required |
|---|---|---|
| `entity/Category.java` | ✅ Confirmed present | None |
| `repository/CategoryRepository.java` | ✅ Confirmed present | None |
| `controller/CategoryController.java` | ✅ Confirmed present | Verify endpoint methods match Section 8 spec |
| `mapper/CategoryMapper.java` | ✅ Confirmed present | Verify Entity↔DTO mapping implemented |
| `service/CategoryService(Impl).java` | ⚠️ Not explicitly named in diagram (only implied by "…") | **Verify existence; implement if missing** |
| `dto/CategoryRequest.java`, `CategoryResponse.java` | ⚠️ Not explicitly named in diagram | **Verify existence; implement if missing** |

This distinction matters — assuming these exist without checking could cause incomplete implementation.

### 7.4 Migration
New Flyway-style migration file, following the existing naming convention seen in `database/migrations/V1__initial_schema.sql`:

```
database/migrations/V2__introduce_dynamic_categories.sql
```

Must:
1. Create/confirm `category` table with unique constraint on `name`
2. Seed the 7 default categories exactly once
3. Backfill `expense.category` → match existing values to seeded `category.id`
4. Add FK constraint `expense.category_id → category.id`
5. Be reviewed as a production-safe, reversible change (per roadmap Section 19 database standards)

---

## 8. API Specification (New Endpoints)

| Method | Endpoint | Description | Status Codes |
|---|---|---|---|
| POST | `/api/categories` | Create category | 201, 400, 409 (duplicate) |
| GET | `/api/categories` | List all categories | 200 |
| GET | `/api/categories/{id}` | Get category by ID | 200, 404 |
| PUT | `/api/categories/{id}` | Update category | 200, 400, 404, 409 |
| DELETE | `/api/categories/{id}` | Delete category | 204, 404, 409 (in use) |

### 8.1 Frontend Hardcoded Data — Confirmed Removal Target
`frontend/src/constants/expenseConstants.js` currently lists **Categories** as static data (per Frontend Structure diagram). This file's category array must be removed and replaced with a live call via the new `categoryService.js`.

---

## 9. Open Questions Requiring Approval (Agents.md Rule 15)

1. **Category deletion policy** — confirmed default: block deletion if in use (FR-13). Confirm this is acceptable, or if reassignment-to-"Other" is preferred instead.
2. **Full project rename scope** — confirm whether "Dhantra" extends to Java package, repo folder, and database name, or stays branding-only for V1 (Section 2).
3. **Category extra fields** — icon/color are not required by current roadmap or diagrams; confirm they're deferred to V6 (Professional Web Experience) and excluded from V1 scope.
4. **Service/DTO gap (Section 7.3)** — confirm whether `CategoryService` and Category DTOs already exist in the actual codebase (diagram ambiguity) before implementation starts, to avoid duplicate work or missed files.

---

## 10. Frontend Requirements

New additions to `frontend/src/`, following existing folder conventions — no structural deviation from approved architecture:

```
pages/
└── Categories.jsx                (new)

components/
└── category/                     (new folder, mirrors existing expense/ convention)
    ├── CategoryForm.jsx
    └── CategoryTable.jsx

services/
└── categoryService.js            (new — getAllCategories, createCategory, updateCategory, deleteCategory)

constants/
└── expenseConstants.js           (MODIFIED — remove hardcoded Categories array)
```

`ExpenseForm.jsx` updated to source its category `<Select />` options from `categoryService.js` instead of the static constant.

---

## 11. Testing Requirements

| Layer | Required Tests |
|---|---|
| Backend — Controller | `CategoryControllerTest.java` — CRUD, validation, duplicate name, not-found, in-use-conflict cases |
| Backend — Service | `CategoryServiceTest.java` — business logic, deletion guard |
| Backend — Repository | `CategoryRepositoryTest.java` — persistence, unique constraint |
| Frontend | Component tests for `CategoryForm`, `CategoryTable`; integration test confirming `ExpenseForm` loads categories dynamically (not from constants) |

---

## 12. Final Compliance Check Against Agents.md (Re-verified Verbatim)

| # | Rule | Status |
|---|---|---|
| 1 | Do not change approved architecture | ✅ Category entity/controller/repo/mapper already scaffolded; only service/DTO layer to be confirmed/completed in the same established pattern |
| 2 | Follow repository structure | ✅ New files placed per existing conventions; SRS placed in `docs/` |
| 3 | Never request or expose secrets | ✅ No secrets involved |
| 4 | Use environment variables | ✅ `VITE_APP_NAME` via `.env` only |
| 5 | Never commit `.env` | ✅ No `.env` changes required beyond existing `.gitignore` rule |
| 6 | Follow API specification | ✅ New endpoints mirror existing REST/DTO pattern (Section 8) |
| 7 | Follow UI design system | ✅ New components to reuse existing `components/common/` primitives |
| 8 | Do not use inline styles | ✅ Enforced via NFR-3 |
| 9 | Do not hardcode business data | ✅ Core purpose of this SRS — explicit removal target identified (Section 8.1) |
| 10 | Write tests for new functionality | ✅ Section 11 |
| 11 | Do not modify unrelated files | ✅ Full rename explicitly deferred; only category-related and constants file touched |
| 12 | Do not push directly to main | ⚠️ Process-level control, enforced via branch protection, not by this document |
| 13 | Run required checks before completion | ⚠️ Enforced via CI pipeline (`ci.yml`), not by this document |
| 14 | Update documentation when architecture changes | ✅ This SRS is the update; roadmap cross-referenced |
| 15 | Ask for approval when requirements are ambiguous | ✅ Section 9 — four open items explicitly flagged |

---

## 13. Acceptance Criteria

Dhantra V1 (with dynamic categories) is complete when:
- [ ] Full Category CRUD works via UI and API
- [ ] `expenseConstants.js` no longer contains a hardcoded category list
- [ ] Expense forms dynamically load categories from the API
- [ ] Category deletion safeguard (FR-13) implemented and tested
- [ ] `CategoryService` and DTOs confirmed present or newly implemented (Section 7.3 resolved)
- [ ] Migration `V2__introduce_dynamic_categories.sql` applied and verified, with data backfilled correctly
- [ ] All new unit/integration tests pass
- [ ] Postman collection updated with new endpoints
- [ ] No architecture deviation beyond what is documented here
- [ ] Open items in Section 9 resolved and approved before implementation begins

---

*End of SRS — Dhantra V1 (Dynamic Category Management)*
