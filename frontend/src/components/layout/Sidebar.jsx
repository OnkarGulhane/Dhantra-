import React from 'react';

export const Sidebar = ({ activeTab, onTabChange, isMobileOpen, onCloseMobile }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'expenses', label: 'Expenses', icon: '💸' },
    { id: 'categories', label: 'Categories', icon: '🏷️' },
    { id: 'budgets', label: 'Budgets & Goals', icon: '🎯' },
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
            <button className="mobile-close-btn" onClick={onCloseMobile}>
              ✕
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  onTabChange(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
              >
                <span className="nav-icon">{item.icon}</span>
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
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)' }}>
              V1 — Dynamic Tracker
            </p>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Dhantra Platform
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
