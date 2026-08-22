import React, { useState, useEffect } from "react";
import { expenseService } from "../services/expenseService";
import { ExpenseTable } from "../components/expense/ExpenseTable";
import { ExpenseForm } from "../components/expense/ExpenseForm";

export const ExpensesPage = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingExpense, setEditingExpense] = useState(null);

    const loadExpenses = async () => {
        try {
            setLoading(true);
            const data = await expenseService.getAllExpenses();
            setExpenses(data || []);
        } catch (err) {
            console.error("Error loading expenses:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadExpenses();
    }, []);

    const handleSave = async (formData) => {
        try {
            if (editingExpense) {
                await expenseService.updateExpense(editingExpense.id, formData);
            } else {
                await expenseService.createExpense(formData);
            }
            setEditingExpense(null);
            loadExpenses();
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this expense?")) return;
        try {
            await expenseService.deleteExpense(id);
            loadExpenses();
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    return (
        <div className="page-expenses">
            <h2>Expense Tracker</h2>
            <div className="expenses-layout">
                <div className="form-column">
                    <h3>{editingExpense ? "Edit Expense" : "Record Expense"}</h3>
                    <ExpenseForm
                        onSubmit={handleSave}
                        initialData={editingExpense}
                        onCancel={editingExpense ? () => setEditingExpense(null) : null}
                    />
                </div>
                <div className="table-column">
                    <h3>All Expenses</h3>
                    {loading ? <div>Loading expenses...</div> : (
                        <ExpenseTable
                            expenses={expenses}
                            onEdit={(exp) => setEditingExpense(exp)}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExpensesPage;
