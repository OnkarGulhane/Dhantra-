import React from 'react';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import CategoryPieChart from '../components/dashboard/CategoryPieChart';
import IncomeVsExpenseChart from '../components/dashboard/IncomeVsExpenseChart';
import CategoryBadge from '../components/common/CategoryBadge';
import { useApp } from '../context/AppContext';
import { ExpenseIcon, CategoryIcon, TrendingUpIcon, SearchIcon, SparklesIcon, ShieldCheckIcon } from '../components/common/Icons';

export const Dashboard = () => {
  const { expenses, categories, isExpensesLoading, isCategoriesLoading, expensesError, fetchExpenses } = useApp();

  if (isExpensesLoading || isCategoriesLoading) {
    return <Loader message="Loading dashboard statistics..." />;
  }

  if (expensesError) {
    return <ErrorMessage message={expensesError} onRetry={fetchExpenses} />;
  }

  // Dynamic Time Greeting
  const currentHour = new Date().getHours();
  const timeGreeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';

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
        <CategoryBadge name={item.category?.name || 'Uncategorized'} />
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

      {/* EXECUTIVE FINANCIAL HEALTH HERO BANNER */}
      <div className="dashboard-hero-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div className="banner-sparkle-icon">
            <SparklesIcon size={20} color="#ffffff" />
          </div>
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary-300)' }}>
            {timeGreeting}, Financial Master 👋
          </span>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
          Master Your Wealth & Cash Flow Velocity
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-on-primary)', opacity: 0.9, marginTop: '0.375rem', maxWidth: '700px' }}>
          Real-time income vs expense analytics, monthly spending trend graphs, category distribution, and cloud sync.
        </p>

        <div className="banner-stats-row">
          <div className="banner-stat-chip">
            <ShieldCheckIcon size={16} color="#10b981" />
            <span>Encrypted Supabase & Render Sync</span>
          </div>
          <div className="banner-stat-chip">
            <TrendingUpIcon size={16} color="#f59e0b" />
            <span>{totalCount} Total Transactions Logged</span>
          </div>
        </div>
      </div>

      {/* METRICS CARDS ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        <Card glass interactive>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Total Expenses
              </p>
              <h2 style={{ fontSize: '1.75rem', marginTop: '0.25rem', fontWeight: 800 }}>
                ₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </h2>
            </div>
            <div style={{
              width: 46,
              height: 46,
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-danger-bg)',
              color: 'var(--color-danger)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ExpenseIcon size={24} />
            </div>
          </div>
        </Card>

        <Card glass interactive>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Transactions
              </p>
              <h2 style={{ fontSize: '1.75rem', marginTop: '0.25rem', fontWeight: 800 }}>
                {totalCount}
              </h2>
            </div>
            <div style={{
              width: 46,
              height: 46,
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-info-bg)',
              color: 'var(--color-info)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <SearchIcon size={24} />
            </div>
          </div>
        </Card>

        <Card glass interactive>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Avg Transaction
              </p>
              <h2 style={{ fontSize: '1.75rem', marginTop: '0.25rem', fontWeight: 800 }}>
                ₹{Number(avgAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </h2>
            </div>
            <div style={{
              width: 46,
              height: 46,
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-warning-bg)',
              color: 'var(--color-warning)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TrendingUpIcon size={24} />
            </div>
          </div>
        </Card>

        <Card glass interactive>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Active Categories
              </p>
              <h2 style={{ fontSize: '1.75rem', marginTop: '0.25rem', fontWeight: 800 }}>
                {categoryCount}
              </h2>
            </div>
            <div style={{
              width: 46,
              height: 46,
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-success-bg)',
              color: 'var(--color-success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CategoryIcon size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* MONTHLY SPENDING GRAPH & INCOME VS EXPENSES COMPARISON */}
      <IncomeVsExpenseChart expenses={expenses} />

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
