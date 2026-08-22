import React, { useState, useEffect } from "react";
import { categoryService } from "../services/categoryService";
import { CategoryTable } from "../components/category/CategoryTable";
import { CategoryForm } from "../components/category/CategoryForm";

export const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingCategory, setEditingCategory] = useState(null);

    const loadCategories = async () => {
        try {
            setLoading(true);
            const data = await categoryService.getAllCategories();
            setCategories(data);
            setError("");
        } catch (err) {
            setError(err.message || "Failed to fetch categories");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleCreateOrUpdate = async (formData) => {
        try {
            if (editingCategory) {
                await categoryService.updateCategory(editingCategory.id, formData);
            } else {
                await categoryService.createCategory(formData);
            }
            setEditingCategory(null);
            loadCategories();
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;
        try {
            await categoryService.deleteCategory(id);
            loadCategories();
        } catch (err) {
            alert(`Delete blocked: ${err.message}`);
        }
    };

    return (
        <div className="page-categories">
            <h2>Category Management</h2>
            {error && <div className="error-banner">{error}</div>}

            <div className="categories-container">
                <div className="form-section">
                    <h3>{editingCategory ? "Edit Category" : "Add New Category"}</h3>
                    <CategoryForm
                        onSubmit={handleCreateOrUpdate}
                        initialData={editingCategory}
                        onCancel={editingCategory ? () => setEditingCategory(null) : null}
                    />
                </div>

                <div className="list-section">
                    <h3>All Categories</h3>
                    {loading ? (
                        <div>Loading categories...</div>
                    ) : (
                        <CategoryTable
                            categories={categories}
                            onEdit={(cat) => setEditingCategory(cat)}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoriesPage;
