import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import MobileBottomNav from '../components/layout/MobileBottomNav';
import ExpenseFormModal from '../components/expense/ExpenseFormModal';

export const MainLayout = ({ children, activeTab, onTabChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);

  return (
    <div className="app-container">
      <Sidebar
        activeTab={activeTab}
        onTabChange={onTabChange}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      <div className="main-wrapper">
        <Navbar
          activeTab={activeTab}
          onQuickAddExpense={() => setIsAddExpenseModalOpen(true)}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        <main className="main-content">
          {children}
        </main>
      </div>

      <MobileBottomNav
        activeTab={activeTab}
        onTabChange={onTabChange}
        onQuickAddExpense={() => setIsAddExpenseModalOpen(true)}
      />

      <ExpenseFormModal
        isOpen={isAddExpenseModalOpen}
        onClose={() => setIsAddExpenseModalOpen(false)}
      />
    </div>
  );
};

export default MainLayout;
