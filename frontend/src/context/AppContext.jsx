import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import categoryService from '../services/categoryService';
import expenseService from '../services/expenseService';
import { useToast } from './ToastContext';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const [isExpensesLoading, setIsExpensesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState(null);
  const [expensesError, setExpensesError] = useState(null);

  const { addToast } = useToast();

  // Fetch all categories from API
  const fetchCategories = useCallback(async () => {
    setIsCategoriesLoading(true);
    setCategoriesError(null);
    try {
      const data = await categoryService.getAllCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to load categories';
      setCategoriesError(msg);
    } finally {
      setIsCategoriesLoading(false);
    }
  }, []);

  // Fetch all expenses from API
  const fetchExpenses = useCallback(async () => {
    setIsExpensesLoading(true);
    setExpensesError(null);
    try {
      const data = await expenseService.getAllExpenses();
      setExpenses(Array.isArray(data) ? data : []);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to load expenses';
      setExpensesError(msg);
    } finally {
      setIsExpensesLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchCategories();
    fetchExpenses();
  }, [fetchCategories, fetchExpenses]);

  // Create Category helper
  const createCategory = async (categoryData) => {
    try {
      const newCategory = await categoryService.createCategory(categoryData);
      setCategories(prev => [...prev, newCategory]);
      addToast(`Category "${newCategory.name}" created successfully`, 'success');
      return newCategory;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to create category';
      addToast(msg, 'error');
      throw err;
    }
  };

  // Delete Category helper (Handles FR-13 safeguard!)
  const deleteCategory = async (id, name) => {
    try {
      await categoryService.deleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
      addToast(`Category "${name}" deleted successfully`, 'success');
    } catch (err) {
      if (err.response?.status === 409) {
        addToast(`Cannot delete category "${name}" because it is currently assigned to existing expenses.`, 'warning', 6000);
      } else {
        const msg = err.response?.data?.message || err.message || 'Failed to delete category';
        addToast(msg, 'error');
      }
      throw err;
    }
  };

  // Create Expense helper
  const createExpense = async (expenseData) => {
    try {
      const newExpense = await expenseService.createExpense(expenseData);
      await fetchExpenses();
      addToast(`Expense "${newExpense.title}" created successfully`, 'success');
      return newExpense;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to create expense';
      addToast(msg, 'error');
      throw err;
    }
  };

  // Delete Expense helper
  const deleteExpense = async (id, title) => {
    try {
      await expenseService.deleteExpense(id);
      setExpenses(prev => prev.filter(e => e.id !== id));
      addToast(`Expense "${title}" deleted`, 'info');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to delete expense';
      addToast(msg, 'error');
      throw err;
    }
  };

  return (
    <AppContext.Provider
      value={{
        categories,
        expenses,
        isCategoriesLoading,
        isExpensesLoading,
        categoriesError,
        expensesError,
        fetchCategories,
        fetchExpenses,
        createCategory,
        deleteCategory,
        createExpense,
        deleteExpense
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
