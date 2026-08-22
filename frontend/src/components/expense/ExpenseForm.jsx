import React, { useState, useEffect } from "react";
import { categoryService } from "../../services/categoryService";

export const ExpenseForm = ({ onSubmit, initialData = null, onCancel }) => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [expenseDate, setExpenseDate] = useState("");
    const [description, setDescription] = useState("");

    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);

    useEffect(() => {
        // Dynamically load categories from API (SRS FR-16 compliance)
        categoryService.getAllCategories()
            .then(data => {
                setCategories(data);
                setLoadingCategories(false);
            })
            .catch(err => {
                console.error("Failed to load dynamic categories:", err);
                setLoadingCategories(false);
            });
    }, []);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || "");
            setAmount(initialData.amount || "");
            setCategoryId(initialData.category?.id || initialData.categoryId || "");
            setExpenseDate(initialData.expenseDate || "");
            setDescription(initialData.description || "");
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            title,
            amount: parseFloat(amount),
            categoryId: parseInt(categoryId, 10),
            expenseDate,
            description
        });
    };

    return (
        <form onSubmit={handleSubmit} className="expense-form">
            <div className="form-group">
                <label htmlFor="expense-title">Title *</label>
                <input
                    id="expense-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="expense-amount">Amount (₹) *</label>
                <input
                    id="expense-amount"
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="expense-category">Category *</label>
                {loadingCategories ? (
                    <select disabled><option>Loading categories...</option></select>
                ) : (
                    <select
                        id="expense-category"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                    >
                        <option value="">-- Select Category --</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="expense-date">Expense Date *</label>
                <input
                    id="expense-date"
                    type="date"
                    value={expenseDate}
                    onChange={(e) => setExpenseDate(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="expense-description">Description</label>
                <textarea
                    id="expense-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="form-actions">
                <button type="submit" className="btn-primary">
                    {initialData ? "Update Expense" : "Add Expense"}
                </button>
                {onCancel && (
                    <button type="button" onClick={onCancel} className="btn-secondary">
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};
