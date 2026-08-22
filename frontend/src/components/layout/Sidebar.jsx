import React from 'react';
import { DashboardIcon, ExpenseIcon, CategoryIcon, BudgetIcon, CloseIcon, ShieldCheckIcon } from '../common/Icons';

export const Sidebar = ({ activeTab, onTabChange, isMobileOpen, onCloseMobile }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'expenses', label: 'Expenses', icon: ExpenseIcon },
    { id: 'categories', label: 'Categories', icon: CategoryIcon },
    { id: 'budgets', label: 'Budgets & Goals', icon: BudgetIcon },
  ];

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      {isMobileOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={onCloseMobile}
        />
      )}

      <aside className={`sidebar ${isMobileOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="brand-logo">D</div>
          <div className="brand-name">Dhantra</div>
          {isMobileOpen && (
            <button className="mobile-close-btn" onClick={onCloseMobile} aria-label="Close menu">
              <CloseIcon size={18} />
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  onTabChange(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
              >
                <span className="nav-icon">
                  <IconComponent size={20} color={isActive ? 'var(--color-primary)' : 'var(--text-secondary)'} />
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div style={{ padding: '1rem', borderTop: '1px solid var(--border-subtle)', margin: 'auto 0 0 0' }}>
          <div style={{
            backgroundColor: 'var(--color-primary-light)',
            borderRadius: 'var(--radius-md)',
            padding: '0.875rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: 700 }}>
              <ShieldCheckIcon size={14} /> V1 Production Ready
            </div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              Dhantra Financial Engine
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
