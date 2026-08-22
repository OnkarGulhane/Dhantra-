import React, { useState, useEffect } from "react";

export const CategoryForm = ({ onSubmit, initialData = null, onCancel }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || "");
            setDescription(initialData.description || "");
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, description });
    };

    return (
        <form onSubmit={handleSubmit} className="category-form">
            <div className="form-group">
                <label htmlFor="category-name">Category Name *</label>
                <input
                    id="category-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    maxLength={100}
                    placeholder="e.g. Subscriptions"
                />
            </div>
            <div className="form-group">
                <label htmlFor="category-description">Description</label>
                <textarea
                    id="category-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={500}
                    placeholder="Optional description"
                />
            </div>
            <div className="form-actions">
                <button type="submit" className="btn-primary">
                    {initialData ? "Update Category" : "Add Category"}
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
