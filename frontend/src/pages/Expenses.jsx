import React, { useState, useMemo } from 'react';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import ExpenseFormModal from '../components/expense/ExpenseFormModal';
import CategoryBadge from '../components/common/CategoryBadge';
import { useApp } from '../context/AppContext';
import { TrashIcon, PlusIcon } from '../components/common/Icons';

export const ExpensesPage = () => {
  const { expenses, categories, isExpensesLoading, expensesError, fetchExpenses, deleteExpense } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Filtered expenses calculation
  const filteredExpenses = useMemo(() => {
    return expenses.filter((exp) => {
      const matchesSearch = exp.title.toLowerCase().includes(search.toLowerCase()) ||
                            (exp.description && exp.description.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = selectedCategory ? String(exp.category?.id) === String(selectedCategory) : true;
      return matchesSearch && matchesCategory;
    });
  }, [expenses, search, selectedCategory]);

  const totalFilteredAmount = filteredExpenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete expense "${title}"?`)) {
      setDeletingId(id);
      try {
        await deleteExpense(id, title);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const columns = [
    {
      header: 'Title',
      accessor: 'title',
      render: (item) => (
        <div>
          <div style={{ fontWeight: 600 }}>{item.title}</div>
          {item.description && (
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.description}</div>
          )}
        </div>
      )
    },
    {
      header: 'Category',
      render: (item) => (
        <CategoryBadge name={item.category?.name || 'Uncategorized'} />
      )
    },
    {
      header: 'Expense Date',
      accessor: 'expenseDate',
      render: (item) => new Date(item.expenseDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    },
    {
      header: 'Amount',
      align: 'right',
      render: (item) => (
        <span style={{ fontWeight: 700, color: 'var(--color-danger)' }}>
          ₹{Number(item.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </span>
      )
    },
    {
      header: 'Actions',
      align: 'center',
      render: (item) => (
        <Button
          variant="danger"
          size="sm"
          isLoading={deletingId === item.id}
          onClick={() => handleDelete(item.id, item.title)}
        >
          <TrashIcon size={14} /> Delete
        </Button>
      )
    }
  ];

  if (isExpensesLoading) return <Loader message="Loading expenses list..." />;
  if (expensesError) return <ErrorMessage message={expensesError} onRetry={fetchExpenses} />;

  const categoryOptions = categories.map(c => ({ value: c.id, label: c.name }));

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* HEADER & FILTER BAR */}
      <Card>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '1rem', flex: 1, minWidth: '280px' }}>
            <div style={{ flex: 2 }}>
              <Input
                placeholder="Search expenses by title or notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div style={{ flex: 1, minWidth: '160px' }}>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                options={categoryOptions}
                placeholder="All Categories"
              />
            </div>
          </div>

          <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
            <PlusIcon size={16} /> Add New Expense
          </Button>
        </div>
      </Card>

      {/* SUMMARY BANNER */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.25rem',
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)'
      }}>
        <div>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Showing </span>
          <span style={{ fontWeight: 700 }}>{filteredExpenses.length}</span>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}> expenses</span>
        </div>
        <div>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginRight: '0.5rem' }}>Total Amount:</span>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-danger)' }}>
            ₹{totalFilteredAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* EXPENSE TABLE */}
      <Card>
        <Table columns={columns} data={filteredExpenses} emptyMessage="No expenses match your search filter." />
      </Card>

      <ExpenseFormModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};

export default ExpensesPage;
