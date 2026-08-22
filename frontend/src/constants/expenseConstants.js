// expenseConstants.js
// Dynamic categories are fetched live via categoryService.js - static category array removed per SRS Section 8.1

export const DEFAULT_PAGE_SIZE = 10;
export const CURRENCY_SYMBOL = "₹";

export const TABLE_HEADERS = {
    EXPENSES: ["Title", "Amount", "Category", "Date", "Description", "Actions"],
    CATEGORIES: ["ID", "Category Name", "Description", "Created At", "Actions"]
};
