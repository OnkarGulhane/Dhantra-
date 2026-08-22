import React from "react";

export const CategoryTable = ({ categories, onEdit, onDelete }) => {
    if (!categories || categories.length === 0) {
        return <div className="empty-state">No categories available. Add one to get started!</div>;
    }

    return (
        <table className="category-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((cat) => (
                    <tr key={cat.id}>
                        <td>{cat.id}</td>
                        <td><strong>{cat.name}</strong></td>
                        <td>{cat.description || "—"}</td>
                        <td>
                            <button onClick={() => onEdit(cat)} className="btn-edit">Edit</button>
                            <button onClick={() => onDelete(cat.id)} className="btn-delete">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
