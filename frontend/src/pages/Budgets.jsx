import React, { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';

// Default initial budget limits per category
const DEFAULT_BUDGETS = {
  Food: 10000,
  Transport: 5000,
  Shopping: 8000,
  Bills: 15000,
  Health: 6000,
  Entertainment: 4000,
  Other: 3000
};

export const BudgetsPage = () => {
  const { expenses, categories, isExpensesLoading, isCategoriesLoading, expensesError, fetchExpenses } = useApp();
  const { showSuccess, showError } = useToast();

  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem('dhantra_budgets');
    return saved ? JSON.parse(saved) : DEFAULT_BUDGETS;
  });

  const [selectedCat, setSelectedCat] = useState(null);
  const [budgetLimitInput, setBudgetLimitInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('dhantra_budgets', JSON.stringify(budgets));
  }, [budgets]);

  if (isExpensesLoading || isCategoriesLoading) {
    return <Loader message="Loading budget allocations..." />;
  }

  if (expensesError) {
    return <ErrorMessage message={expensesError} onRetry={fetchExpenses} />;
  }

  // Calculate actual spending per category
  const actualSpent = {};
  let totalSpentAll = 0;

  expenses.forEach((item) => {
    const catName = item.category?.name || 'Other';
    const amount = Number(item.amount) || 0;
    actualSpent[catName] = (actualSpent[catName] || 0) + amount;
    totalSpentAll += amount;
  });

  // Total monthly budget limit
  const totalBudgetLimit = categories.reduce((sum, cat) => {
    return sum + (budgets[cat.name] || 3000);
  }, 0);

  const overallPercentage = totalBudgetLimit > 0 ? ((totalSpentAll / totalBudgetLimit) * 100).toFixed(1) : 0;

  const handleEditBudget = (catName) => {
    setSelectedCat(catName);
    setBudgetLimitInput(budgets[catName] || 5000);
    setIsModalOpen(true);
  };

  const handleSaveBudget = (e) => {
    e.preventDefault();
    const val = Number(budgetLimitInput);
    if (isNaN(val) || val <= 0) {
      showError('Please enter a valid positive budget limit');
      return;
    }

    setBudgets((prev) => ({
      ...prev,
      [selectedCat]: val
    }));

    showSuccess(`Updated budget limit for ${selectedCat} to ₹${val.toLocaleString('en-IN')}`);
    setIsModalOpen(false);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* OVERALL MONTHLY BUDGET CARD */}
      <Card glass>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Overall Monthly Budget Target
              </p>
              <h2 style={{ fontSize: '1.875rem', marginTop: '0.25rem' }}>
                ₹{totalSpentAll.toLocaleString('en-IN')}
                <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                  {' '} / ₹{totalBudgetLimit.toLocaleString('en-IN')}
                </span>
              </h2>
            </div>
            <div style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: overallPercentage > 90 ? 'var(--color-danger-bg)' : overallPercentage > 70 ? 'var(--color-warning-bg)' : 'var(--color-success-bg)',
              color: overallPercentage > 90 ? 'var(--color-danger)' : overallPercentage > 70 ? 'var(--color-warning)' : 'var(--color-success)',
              fontWeight: 700,
              fontSize: '0.875rem'
            }}>
              {overallPercentage}% Used
            </div>
          </div>

          <div style={{ height: 10, backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
            <div style={{
              width: `${Math.min(overallPercentage, 100)}%`,
              height: '100%',
              backgroundColor: overallPercentage > 90 ? 'var(--color-danger)' : overallPercentage > 70 ? 'var(--color-warning)' : 'var(--color-success)',
              borderRadius: 'var(--radius-full)',
              transition: 'width 0.5s ease'
            }} />
          </div>
        </div>
      </Card>

      {/* CATEGORY BUDGET ALLOCATION GRID */}
      <div>
        <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', fontWeight: 700 }}>
          Category Monthly Budget Limits & Spending
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {categories.map((cat) => {
            const spent = actualSpent[cat.name] || 0;
            const limit = budgets[cat.name] || 3000;
            const pct = Math.min(((spent / limit) * 100), 100).toFixed(1);
            const isOver = spent > limit;
            const isWarning = spent >= limit * 0.75 && !isOver;

            let statusColor = 'var(--color-success)';
            let statusBg = 'var(--color-success-bg)';
            let statusText = 'On Track';

            if (isOver) {
              statusColor = 'var(--color-danger)';
              statusBg = 'var(--color-danger-bg)';
              statusText = 'Exceeded!';
            } else if (isWarning) {
              statusColor = 'var(--color-warning)';
              statusBg = 'var(--color-warning-bg)';
              statusText = 'Near Limit';
            }

            return (
              <Card key={cat.id} interactive>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ fontSize: '1.125rem', fontWeight: 700 }}>{cat.name}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {cat.description || 'Category budget'}
                      </p>
                    </div>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.625rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: statusBg,
                      color: statusColor
                    }}>
                      {statusText}
                    </span>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.375rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Spent: <strong>₹{spent.toLocaleString('en-IN')}</strong></span>
                      <span style={{ color: 'var(--text-muted)' }}>Limit: ₹{limit.toLocaleString('en-IN')}</span>
                    </div>

                    <div style={{ height: 8, backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                      <div style={{
                        width: `${pct}%`,
                        height: '100%',
                        backgroundColor: statusColor,
                        borderRadius: 'var(--radius-full)',
                        transition: 'width 0.4s ease'
                      }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Remaining: <strong>₹{Math.max(limit - spent, 0).toLocaleString('en-IN')}</strong>
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => handleEditBudget(cat.name)}>
                      ✏️ Edit Limit
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* EDIT BUDGET MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Set Budget Limit — ${selectedCat}`}
      >
        <form onSubmit={handleSaveBudget}>
          <Input
            label="Monthly Budget Limit (₹)"
            type="number"
            value={budgetLimitInput}
            onChange={(e) => setBudgetLimitInput(e.target.value)}
            placeholder="e.g. 10000"
            required
            autoFocus
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)} type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Budget Limit
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default BudgetsPage;
