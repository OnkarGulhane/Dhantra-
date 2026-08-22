import React from 'react';

export const MobileBottomNav = ({ activeTab, onTabChange, onQuickAddExpense }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'expenses', label: 'Expenses', icon: '💸' },
    { id: 'categories', label: 'Categories', icon: '🏷️' },
    { id: 'budgets', label: 'Budgets', icon: '🎯' },
  ];

  return (
    <div className="mobile-bottom-nav">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
            onClick={() => onTabChange(item.id)}
          >
            <span className="mobile-nav-icon">{item.icon}</span>
            <span className="mobile-nav-label">{item.label}</span>
          </button>
        );
      })}

      <button
        className="mobile-fab-btn"
        onClick={onQuickAddExpense}
        title="Quick Add Expense"
        aria-label="Add Expense"
      >
        +
      </button>
    </div>
  );
};

export default MobileBottomNav;
