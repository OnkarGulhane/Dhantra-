import React from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

export const ExpenseCard = ({ expense, onEdit, onDelete }) => {
    return (
        <div className="expense-card card">
            <div className="card-header">
                <h4>{expense.title}</h4>
                <span className="amount">{formatCurrency(expense.amount)}</span>
            </div>
            <div className="card-body">
                <p><strong>Category:</strong> {expense.category?.name || "Uncategorized"}</p>
                <p><strong>Date:</strong> {formatDate(expense.expenseDate)}</p>
                {expense.description && <p>{expense.description}</p>}
            </div>
            <div className="card-footer">
                <button onClick={() => onEdit(expense)} className="btn-edit">Edit</button>
                <button onClick={() => onDelete(expense.id)} className="btn-delete">Delete</button>
            </div>
        </div>
    );
};

export default ExpenseCard;
