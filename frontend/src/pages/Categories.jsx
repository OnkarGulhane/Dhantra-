import React, { useState } from 'react';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import CategoryFormModal from '../components/category/CategoryFormModal';
import { useApp } from '../context/AppContext';

export const CategoriesPage = () => {
  const { categories, expenses, isCategoriesLoading, categoriesError, fetchCategories, deleteCategory } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Compute expense count per category
  const getExpenseCountForCategory = (catId) => {
    return expenses.filter(exp => exp.category?.id === catId).length;
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete category "${name}"?`)) {
      setDeletingId(id);
      try {
        await deleteCategory(id, name);
      } catch (err) {
        // FR-13 safeguard handled with Toast message in AppContext
      } finally {
        setDeletingId(null);
      }
    }
  };

  const columns = [
    {
      header: 'Category Name',
      accessor: 'name',
      render: (item) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--color-primary-light)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '0.875rem'
          }}>
            {item.name.charAt(0)}
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>{item.name}</div>
            {item.description && (
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.description}</div>
            )}
          </div>
        </div>
      )
    },
    {
      header: 'Assigned Expenses',
      render: (item) => {
        const count = getExpenseCountForCategory(item.id);
        return (
          <span className={`badge ${count > 0 ? 'badge-primary' : 'badge-secondary'}`}>
            {count} {count === 1 ? 'Expense' : 'Expenses'}
          </span>
        );
      }
    },
    {
      header: 'Created On',
      accessor: 'createdAt',
      render: (item) => item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }) : '—'
    },
    {
      header: 'Actions',
      align: 'center',
      render: (item) => (
        <Button
          variant="danger"
          size="sm"
          isLoading={deletingId === item.id}
          onClick={() => handleDelete(item.id, item.name)}
        >
          Delete
        </Button>
      )
    }
  ];

  if (isCategoriesLoading) return <Loader message="Loading categories..." />;
  if (categoriesError) return <ErrorMessage message={categoriesError} onRetry={fetchCategories} />;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* CATEGORIES HEADER BAR */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem' }}>Dynamic Category Management</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Create, view, and manage custom expense categories in your platform.
            </p>
          </div>
          <Button variant="primary" icon="+" onClick={() => setIsAddModalOpen(true)}>
            Add Category
          </Button>
        </div>
      </Card>

      {/* CATEGORY GRID CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
        {categories.map((cat) => {
          const expCount = getExpenseCountForCategory(cat.id);
          return (
            <Card key={cat.id} glass interactive>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1.125rem'
                  }}>
                    {cat.name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>{cat.name}</h3>
                    <span className={`badge ${expCount > 0 ? 'badge-primary' : 'badge-secondary'}`} style={{ marginTop: '0.25rem' }}>
                      {expCount} {expCount === 1 ? 'Expense' : 'Expenses'}
                    </span>
                  </div>
                </div>

                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => handleDelete(cat.id, cat.name)}
                  title="Delete category"
                  style={{ color: 'var(--color-danger)' }}
                >
                  ✕
                </button>
              </div>

              {cat.description && (
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.75rem', lineHeight: 1.4 }}>
                  {cat.description}
                </p>
              )}
            </Card>
          );
        })}
      </div>

      {/* CATEGORY TABLE */}
      <Card title="Category Directory" subtitle="Comprehensive list of active category entities">
        <Table columns={columns} data={categories} emptyMessage="No categories found." />
      </Card>

      <CategoryFormModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};

export default CategoriesPage;
