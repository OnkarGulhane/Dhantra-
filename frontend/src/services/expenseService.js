import { fetchApi } from "./api";

export const expenseService = {
    getAllExpenses: () => fetchApi("/expenses"),
    getExpenseById: (id) => fetchApi(`/expenses/${id}`),
    createExpense: (data) => fetchApi("/expenses", {
        method: "POST",
        body: JSON.stringify(data),
    }),
    updateExpense: (id, data) => fetchApi(`/expenses/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    }),
    deleteExpense: (id) => fetchApi(`/expenses/${id}`, {
        method: "DELETE",
    }),
};

export default expenseService;
