import React, { useState, useEffect, useMemo } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { TrendingUpIcon, ShieldCheckIcon, EditIcon } from '../common/Icons';

export const IncomeVsExpenseChart = ({ expenses = [] }) => {
  const [monthlyIncome, setMonthlyIncome] = useState(() => {
    const saved = localStorage.getItem('dhantra_monthly_income');
    return saved ? Number(saved) : 60000;
  });

  const [isEditingIncome, setIsEditingIncome] = useState(false);
  const [tempIncomeInput, setTempIncomeInput] = useState(monthlyIncome);
  const [activeMonthHover, setActiveMonthHover] = useState(null);

  useEffect(() => {
    localStorage.setItem('dhantra_monthly_income', monthlyIncome.toString());
  }, [monthlyIncome]);

  // 100% PURE DYNAMIC MONTHLY GROUPING BASED ON ACTUAL DATABASE EXPENSE DATES
  const monthData = useMemo(() => {
    if (!expenses || expenses.length === 0) return [];

    const map = {};

    expenses.forEach((item) => {
      if (!item.expenseDate) return;
      const dateObj = new Date(item.expenseDate);
      if (isNaN(dateObj.getTime())) return;

      // Group key: e.g. "Aug 26" or "Aug 2026"
      const monthKey = dateObj.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      const timestamp = dateObj.getTime();
      const amount = Number(item.amount) || 0;

      if (!map[monthKey]) {
        map[monthKey] = {
          month: monthKey,
          expense: 0,
          timestamp
        };
      }
      map[monthKey].expense += amount;
    });

    // Sort months chronologically
    const sorted = Object.values(map).sort((a, b) => a.timestamp - b.timestamp);

    // Compute income, savings, and savings rate per actual month
    return sorted.map((d) => {
      const income = monthlyIncome;
      const savings = Math.max(income - d.expense, 0);
      const savingsRate = income > 0 ? ((savings / income) * 100).toFixed(1) : 0;
      return {
        ...d,
        income,
        savings,
        savingsRate
      };
    });
  }, [expenses, monthlyIncome]);

  const handleSaveIncome = (e) => {
    e.preventDefault();
    const val = Number(tempIncomeInput);
    if (!isNaN(val) && val > 0) {
      setMonthlyIncome(val);
      setIsEditingIncome(false);
    }
  };

  // If no expense records exist in database
  if (monthData.length === 0) {
    return (
      <Card glass title="Income vs Expenses & Monthly Spending Analytics">
        <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
          <TrendingUpIcon size={36} color="var(--color-primary)" />
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginTop: '0.75rem', color: 'var(--text-primary)' }}>
            No Expense Records Logged Yet
          </h4>
          <p style={{ fontSize: '0.8125rem', marginTop: '0.25rem', color: 'var(--text-muted)' }}>
            Add your first expense to automatically generate your 100% dynamic monthly cash flow graph.
          </p>
        </div>
      </Card>
    );
  }

  // Calculate current active month stats (latest month logged)
  const latestMonthStats = monthData[monthData.length - 1];
  const maxVal = Math.max(...monthData.map(d => Math.max(d.income, d.expense)), 1000);

  return (
    <Card glass title="Income vs Expenses & Monthly Spending Analytics" subtitle="100% Dynamic monthly cash flow graph generated strictly from your database records">
      <div className="income-chart-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* METRICS HEADER BANNER */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          padding: '1.25rem',
          backgroundColor: 'var(--bg-app)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)'
        }}>
          
          {/* Monthly Income Stat */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Estimated Monthly Income
              </span>
              <button
                onClick={() => { setTempIncomeInput(monthlyIncome); setIsEditingIncome(!isEditingIncome); }}
                style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer' }}
                title="Edit Monthly Income"
              >
                <EditIcon size={14} />
              </button>
            </div>
            {isEditingIncome ? (
              <form onSubmit={handleSaveIncome} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                <input
                  type="number"
                  value={tempIncomeInput}
                  onChange={(e) => setTempIncomeInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.25rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    fontWeight: 700
                  }}
                  autoFocus
                />
                <Button size="sm" variant="primary" type="submit">Save</Button>
              </form>
            ) : (
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-success)', marginTop: '0.25rem' }}>
                ₹{monthlyIncome.toLocaleString('en-IN')}
              </h3>
            )}
          </div>

          {/* Latest Month Expense */}
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              {latestMonthStats.month} Expenses
            </span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-danger)', marginTop: '0.25rem' }}>
              ₹{latestMonthStats.expense.toLocaleString('en-IN')}
            </h3>
          </div>

          {/* Net Savings Retained */}
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Net Savings Retained
            </span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: latestMonthStats.savings > 0 ? 'var(--color-info)' : 'var(--color-danger)', marginTop: '0.25rem' }}>
              ₹{latestMonthStats.savings.toLocaleString('en-IN')}
            </h3>
          </div>

          {/* Savings Rate % */}
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Savings Rate
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {latestMonthStats.savingsRate}%
              </h3>
              <span className={`badge ${Number(latestMonthStats.savingsRate) >= 30 ? 'badge-primary' : 'badge-secondary'}`}>
                {Number(latestMonthStats.savingsRate) >= 30 ? 'Healthy' : 'Moderate'}
              </span>
            </div>
          </div>

        </div>

        {/* 100% PURE DYNAMIC COMPARISON BAR CHART */}
        <div className="chart-bars-container" style={{ padding: '1rem 0' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Showing {monthData.length} active month{monthData.length > 1 ? 's' : ''} logged in database
            </span>
            <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.8125rem', fontWeight: 600 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: 'var(--color-success)' }} />
                <span>Income</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: 'var(--color-danger)' }} />
                <span>Expenses</span>
              </div>
            </div>
          </div>

          {/* Bar Graph Columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${monthData.length}, 1fr)`,
            gap: '1rem',
            alignItems: 'flex-end',
            height: 220,
            borderBottom: '2px solid var(--border-color)',
            paddingBottom: '0.5rem'
          }}>
            {monthData.map((d) => {
              const incomeHeight = (d.income / maxVal) * 180;
              const expenseHeight = (d.expense / maxVal) * 180;
              const isHovered = activeMonthHover === d.month;

              return (
                <div
                  key={d.month}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    height: '100%',
                    justifyContent: 'flex-end',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={() => setActiveMonthHover(d.month)}
                  onMouseLeave={() => setActiveMonthHover(null)}
                >
                  {/* Tooltip on Hover */}
                  {isHovered && (
                    <div style={{
                      position: 'absolute',
                      marginTop: '-60px',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      boxShadow: 'var(--shadow-lg)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.5rem 0.75rem',
                      zIndex: 10,
                      fontSize: '0.75rem',
                      textAlign: 'center',
                      pointerEvents: 'none'
                    }}>
                      <div style={{ fontWeight: 700 }}>{d.month} Data</div>
                      <div style={{ color: 'var(--color-success)' }}>In: ₹{d.income.toLocaleString('en-IN')}</div>
                      <div style={{ color: 'var(--color-danger)' }}>Out: ₹{d.expense.toLocaleString('en-IN')}</div>
                    </div>
                  )}

                  {/* Dual Bars */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', width: '100%', justifyContent: 'center' }}>
                    {/* Income Bar */}
                    <div
                      style={{
                        width: '35%',
                        maxWidth: '28px',
                        height: `${Math.max(incomeHeight, 8)}px`,
                        backgroundColor: 'var(--color-success)',
                        borderRadius: '4px 4px 0 0',
                        opacity: isHovered ? 1 : 0.85,
                        transition: 'height 0.5s ease, opacity 0.2s ease',
                        boxShadow: isHovered ? '0 0 12px rgba(16, 185, 129, 0.4)' : 'none'
                      }}
                    />
                    {/* Expense Bar */}
                    <div
                      style={{
                        width: '35%',
                        maxWidth: '28px',
                        height: `${Math.max(expenseHeight, 8)}px`,
                        backgroundColor: 'var(--color-danger)',
                        borderRadius: '4px 4px 0 0',
                        opacity: isHovered ? 1 : 0.85,
                        transition: 'height 0.5s ease, opacity 0.2s ease',
                        boxShadow: isHovered ? '0 0 12px rgba(239, 68, 68, 0.4)' : 'none'
                      }}
                    />
                  </div>

                  {/* Month Label */}
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)'
                  }}>
                    {d.month}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </Card>
  );
};

export default IncomeVsExpenseChart;
