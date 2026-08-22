import { useState, useEffect } from "react";
import { categoryService } from "../services/categoryService";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await categoryService.getAllCategories();
            setCategories(data || []);
            setError(null);
        } catch (err) {
            setError(err.message || "Failed to load categories");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return { categories, loading, error, refreshCategories: fetchCategories };
};

export default useCategories;
