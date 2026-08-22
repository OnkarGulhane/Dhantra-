import React, { useState } from 'react';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import CategoryFormModal from '../components/category/CategoryFormModal';
import CategoryBadge from '../components/common/CategoryBadge';
import { useApp } from '../context/AppContext';
import { PlusIcon, TrashIcon, getCategoryIconInfo } from '../components/common/Icons';

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
          <CategoryBadge name={item.name} size={18} />
          {item.description && (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({item.description})</span>
          )}
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
          <TrashIcon size={14} /> Delete
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Dynamic Category Management</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Create, view, and manage custom expense categories with dedicated vector icons.
            </p>
          </div>
          <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
            <PlusIcon size={16} /> Add Category
          </Button>
        </div>
      </Card>

      {/* CATEGORY GRID CARDS WITH SEMANTIC SVG VECTOR ICONS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {categories.map((cat) => {
          const expCount = getExpenseCountForCategory(cat.id);
          const iconInfo = getCategoryIconInfo(cat.name);
          const IconComponent = iconInfo.icon;

          return (
            <Card key={cat.id} glass interactive>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: iconInfo.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <IconComponent size={24} color={iconInfo.color} />
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
                  <TrashIcon size={16} />
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
