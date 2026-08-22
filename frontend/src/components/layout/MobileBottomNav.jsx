import React from 'react';
import { DashboardIcon, ExpenseIcon, CategoryIcon, BudgetIcon, PlusIcon } from '../common/Icons';

export const MobileBottomNav = ({ activeTab, onTabChange, onQuickAddExpense }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'expenses', label: 'Expenses', icon: ExpenseIcon },
    { id: 'categories', label: 'Categories', icon: CategoryIcon },
    { id: 'budgets', label: 'Budgets', icon: BudgetIcon },
  ];

  return (
    <div className="mobile-bottom-nav">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        const IconComponent = item.icon;
        return (
          <button
            key={item.id}
            className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
            onClick={() => onTabChange(item.id)}
          >
            <span className="mobile-nav-icon">
              <IconComponent size={20} color={isActive ? 'var(--color-primary)' : 'var(--text-muted)'} />
            </span>
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
        <PlusIcon size={24} color="#ffffff" />
      </button>
    </div>
  );
};

export default MobileBottomNav;
