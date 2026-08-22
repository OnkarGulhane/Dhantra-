import React from "react";
import { CURRENCY_SYMBOL } from "../../constants/expenseConstants";

export const ExpenseTable = ({ expenses, onEdit, onDelete }) => {
    if (!expenses || expenses.length === 0) {
        return <div className="empty-state">No expenses recorded yet.</div>;
    }

    return (
        <table className="expense-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {expenses.map((exp) => (
                    <tr key={exp.id}>
                        <td><strong>{exp.title}</strong></td>
                        <td>{CURRENCY_SYMBOL}{exp.amount?.toFixed(2)}</td>
                        <td>{exp.category?.name || "Uncategorized"}</td>
                        <td>{exp.expenseDate}</td>
                        <td>{exp.description || "—"}</td>
                        <td>
                            <button onClick={() => onEdit(exp)} className="btn-edit">Edit</button>
                            <button onClick={() => onDelete(exp.id)} className="btn-delete">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
