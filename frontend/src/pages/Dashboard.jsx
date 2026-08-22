import React from 'react';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import CategoryPieChart from '../components/dashboard/CategoryPieChart';
import { useApp } from '../context/AppContext';

export const Dashboard = () => {
  const { expenses, categories, isExpensesLoading, isCategoriesLoading, expensesError, fetchExpenses } = useApp();

  if (isExpensesLoading || isCategoriesLoading) {
    return <Loader message="Loading dashboard statistics..." />;
  }

  if (expensesError) {
    return <ErrorMessage message={expensesError} onRetry={fetchExpenses} />;
  }

  // Calculate Metrics
  const totalAmount = expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const totalCount = expenses.length;
  const avgAmount = totalCount > 0 ? (totalAmount / totalCount).toFixed(2) : 0;
  const categoryCount = categories.length;

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
        <span className="badge badge-primary">
          {item.category?.name || 'Uncategorized'}
        </span>
      )
    },
    {
      header: 'Date',
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
    }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* METRICS CARDS ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        <Card glass interactive>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Total Expenses
              </p>
              <h2 style={{ fontSize: '1.75rem', marginTop: '0.25rem' }}>
                ₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </h2>
            </div>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-danger-bg)',
              color: 'var(--color-danger)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              fontWeight: 'bold'
            }}>
              💸
            </div>
          </div>
        </Card>

        <Card glass interactive>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Transactions
              </p>
              <h2 style={{ fontSize: '1.75rem', marginTop: '0.25rem' }}>
                {totalCount}
              </h2>
            </div>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-info-bg)',
              color: 'var(--color-info)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem'
            }}>
              🧾
            </div>
          </div>
        </Card>

        <Card glass interactive>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Avg Transaction
              </p>
              <h2 style={{ fontSize: '1.75rem', marginTop: '0.25rem' }}>
                ₹{Number(avgAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </h2>
            </div>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-warning-bg)',
              color: 'var(--color-warning)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem'
            }}>
              📈
            </div>
          </div>
        </Card>

        <Card glass interactive>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Active Categories
              </p>
              <h2 style={{ fontSize: '1.75rem', marginTop: '0.25rem' }}>
                {categoryCount}
              </h2>
            </div>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-success-bg)',
              color: 'var(--color-success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem'
            }}>
              🏷️
            </div>
          </div>
        </Card>
      </div>

      {/* CATEGORY DISTRIBUTION PIE DIAGRAM */}
      <CategoryPieChart expenses={expenses} />

      {/* RECENT TRANSACTIONS TABLE */}
      <Card title="Recent Transactions" subtitle="Latest expense items logged in the system">
        <Table columns={columns} data={expenses.slice(0, 5)} emptyMessage="No recent expenses logged." />
      </Card>

    </div>
  );
};

export default Dashboard;
