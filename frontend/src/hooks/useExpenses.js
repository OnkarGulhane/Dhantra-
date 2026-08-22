import { useState, useEffect } from "react";
import { expenseService } from "../services/expenseService";

export const useExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchExpenses = async () => {
        try {
            setLoading(true);
            const data = await expenseService.getAllExpenses();
            setExpenses(data || []);
            setError(null);
        } catch (err) {
            setError(err.message || "Failed to load expenses");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return { expenses, loading, error, refreshExpenses: fetchExpenses };
};

export default useExpenses;
