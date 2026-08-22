import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import { TrendingUpIcon, TrendingDownIcon, SparklesIcon, EditIcon } from '../common/Icons';

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

  // Generate 6 Months Data Trend
  const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

  // Calculate actual total current expense
  const totalExpenseAll = expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  // Distribute expenses across months for demonstration trend
  const monthData = months.map((monthName, index) => {
    // Current month (index 5) gets actual live expenses sum
    const isCurrentMonth = index === 5;
    const baseExpense = isCurrentMonth ? totalExpenseAll : Math.round(monthlyIncome * (0.45 + (index * 0.05)));
    const income = monthlyIncome;
    const savings = Math.max(income - baseExpense, 0);
    const savingsRate = income > 0 ? ((savings / income) * 100).toFixed(1) : 0;

    return {
      month: monthName,
      income,
      expense: baseExpense,
      savings,
      savingsRate,
      isCurrentMonth
    };
  });

  const maxVal = Math.max(...monthData.map(d => Math.max(d.income, d.expense)), 1000);

  const handleSaveIncome = (e) => {
    e.preventDefault();
    const val = Number(tempIncomeInput);
    if (!isNaN(val) && val > 0) {
      setMonthlyIncome(val);
      setIsEditingIncome(false);
    }
  };

  const currentMonthStats = monthData[5];

  return (
    <Card glass title="Income vs Expenses & Monthly Spending Analytics" subtitle="Interactive cash flow ratio, savings rate, and 6-month historical trend analysis">
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
                Monthly Income
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
              Current Expenses
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

        {/* DUAL COMPARISON BAR CHART */}
        <div className="chart-bars-container" style={{ padding: '1rem 0' }}>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1.25rem', marginBottom: '1.25rem', fontSize: '0.8125rem', fontWeight: 600 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: 'var(--color-success)' }} />
              <span>Income</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: 'var(--color-danger)' }} />
              <span>Expenses</span>
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
                      <div style={{ fontWeight: 700 }}>{d.month} Analytics</div>
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
                        maxWidth: '24px',
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
                        maxWidth: '24px',
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
