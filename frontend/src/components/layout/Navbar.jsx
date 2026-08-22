import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';
import { SunIcon, MoonIcon, PlusIcon, MenuIcon } from '../common/Icons';

export const Navbar = ({ activeTab, onQuickAddExpense, onMobileMenuToggle }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
        <button
          className="btn btn-ghost btn-icon-only mobile-hamburger-btn"
          onClick={onMobileMenuToggle}
          aria-label="Toggle menu"
        >
          <MenuIcon size={20} />
        </button>
        <div>
          <h2 style={{ fontSize: '1.25rem', textTransform: 'capitalize', fontWeight: 700 }}>
            {activeTab === 'budgets' ? 'Budgets & Goals' : activeTab}
          </h2>
          <p className="navbar-subtitle" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Welcome back to your financial control center
          </p>
        </div>
      </div>

      <div className="navbar-actions">
        <Button
          variant="secondary"
          className="btn-icon-only"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <SunIcon size={18} color="#f59e0b" /> : <MoonIcon size={18} color="#6366f1" />}
        </Button>

        <Button variant="primary" onClick={onQuickAddExpense}>
          <PlusIcon size={16} /> Add Expense
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
