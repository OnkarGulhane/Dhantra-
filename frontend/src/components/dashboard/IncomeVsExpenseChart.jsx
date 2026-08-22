import React, { useState, useEffect, useMemo } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { TrendingUpIcon, EditIcon } from '../common/Icons';

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

  // GENERATE LAST 6 ROLLING MONTHS STRUCTURE WITH REAL DATABASE EXPENSE MAPPING
  const monthData = useMemo(() => {
    const today = new Date();
    const list = [];

    // Calculate sum of expenses per month key (e.g. "Mar 26", "Aug 26")
    const actualMap = {};
    expenses.forEach((item) => {
      if (!item.expenseDate) return;
      const d = new Date(item.expenseDate);
      if (isNaN(d.getTime())) return;
      const monthKey = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      actualMap[monthKey] = (actualMap[monthKey] || 0) + (Number(item.amount) || 0);
    });

    // Generate past 6 calendar months ending with current month
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const label = d.toLocaleDateString('en-US', { month: 'short' });
      const fullKey = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });

      const expenseAmount = actualMap[fullKey] || 0;
      const income = monthlyIncome;
      const savings = Math.max(income - expenseAmount, 0);
      const savingsRate = income > 0 ? ((savings / income) * 100).toFixed(1) : 0;
      const isCurrentMonth = i === 0;

      list.push({
        month: label,
        fullKey,
        income,
        expense: expenseAmount,
        savings,
        savingsRate,
        isCurrentMonth,
        hasEntries: expenseAmount > 0
      });
    }

    return list;
  }, [expenses, monthlyIncome]);

  const handleSaveIncome = (e) => {
    e.preventDefault();
    const val = Number(tempIncomeInput);
    if (!isNaN(val) && val > 0) {
      setMonthlyIncome(val);
      setIsEditingIncome(false);
    }
  };

  // Latest month stats (current month)
  const currentMonthStats = monthData[monthData.length - 1];
  const maxVal = Math.max(...monthData.map(d => Math.max(d.income, d.expense)), 1000);

  return (
    <Card glass title="Income vs Expenses & Monthly Spending Analytics" subtitle="6-Month rolling calendar comparison (0 entries = ₹0 expense logged)">
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

          {/* Current Month Expense */}
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              {currentMonthStats.month} Expenses
            </span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-danger)', marginTop: '0.25rem' }}>
              ₹{currentMonthStats.expense.toLocaleString('en-IN')}
            </h3>
          </div>

          {/* Net Savings Retained */}
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Net Savings Retained
            </span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: currentMonthStats.savings > 0 ? 'var(--color-info)' : 'var(--color-danger)', marginTop: '0.25rem' }}>
              ₹{currentMonthStats.savings.toLocaleString('en-IN')}
            </h3>
          </div>

          {/* Savings Rate % */}
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Savings Rate
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {currentMonthStats.savingsRate}%
              </h3>
              <span className={`badge ${Number(currentMonthStats.savingsRate) >= 30 ? 'badge-primary' : 'badge-secondary'}`}>
                {Number(currentMonthStats.savingsRate) >= 30 ? 'Healthy' : 'Moderate'}
              </span>
            </div>
          </div>

        </div>

        {/* 6-MONTH COMPARISON BAR CHART WITH REAL ENTRY DATA */}
        <div className="chart-bars-container" style={{ padding: '1rem 0' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              6 Calendar Months View (Months without entries show ₹0 Expense)
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
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '1rem',
            alignItems: 'flex-end',
            height: 220,
            borderBottom: '2px solid var(--border-color)',
            paddingBottom: '0.5rem'
          }}>
            {monthData.map((d) => {
              const incomeHeight = (d.income / maxVal) * 180;
              const expenseHeight = d.expense > 0 ? (d.expense / maxVal) * 180 : 0;
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
                      <div style={{ fontWeight: 700 }}>{d.month} Analytics</div>
                      <div style={{ color: 'var(--color-success)' }}>Income: ₹{d.income.toLocaleString('en-IN')}</div>
                      <div style={{ color: 'var(--color-danger)' }}>
                        Expense: {d.expense > 0 ? `₹${d.expense.toLocaleString('en-IN')}` : '₹0 (No entries)'}
                      </div>
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
                        height: `${Math.max(expenseHeight, d.expense > 0 ? 8 : 2)}px`,
                        backgroundColor: d.expense > 0 ? 'var(--color-danger)' : 'var(--border-subtle)',
                        borderRadius: '4px 4px 0 0',
                        opacity: isHovered ? 1 : 0.85,
                        transition: 'height 0.5s ease, opacity 0.2s ease',
                        boxShadow: isHovered && d.expense > 0 ? '0 0 12px rgba(239, 68, 68, 0.4)' : 'none'
                      }}
                    />
                  </div>

                  {/* Month Label */}
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: d.isCurrentMonth ? 800 : 600,
                    color: d.isCurrentMonth ? 'var(--color-primary)' : 'var(--text-muted)'
                  }}>
                    {d.month} {d.isCurrentMonth ? '(Now)' : ''}
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
