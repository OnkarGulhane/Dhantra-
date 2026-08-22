import { fetchApi } from "./api";

export const categoryService = {
    getAllCategories: () => fetchApi("/categories"),
    getCategoryById: (id) => fetchApi(`/categories/${id}`),
    createCategory: (data) => fetchApi("/categories", {
        method: "POST",
        body: JSON.stringify(data),
    }),
    updateCategory: (id, data) => fetchApi(`/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    }),
    deleteCategory: (id) => fetchApi(`/categories/${id}`, {
        method: "DELETE",
    }),
};

export default categoryService;
