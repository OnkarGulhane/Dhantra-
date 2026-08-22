import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AppProvider } from './context/AppContext';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import ExpensesPage from './pages/Expenses';
import CategoriesPage from './pages/Categories';
import BudgetsPage from './pages/Budgets';
import NotFound from './pages/NotFound';

export const App = () => {
  const [currentTab, setCurrentTab] = useState('dashboard');

  const renderView = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'expenses':
        return <ExpensesPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'budgets':
        return <BudgetsPage />;
      default:
        return <NotFound onGoHome={() => setCurrentTab('dashboard')} />;
    }
  };

  return (
    <ThemeProvider>
      <ToastProvider>
        <AppProvider>
          <MainLayout activeTab={currentTab} onTabChange={setCurrentTab}>
            {renderView()}
          </MainLayout>
        </AppProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
