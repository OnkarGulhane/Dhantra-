import React, { useState } from "react";
import { AppProvider } from "./context/AppContext";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import ExpensesPage from "./pages/Expenses";
import CategoriesPage from "./pages/Categories";
import NotFound from "./pages/NotFound";

export const App = () => {
    const [currentTab, setCurrentTab] = useState("dashboard");

    const renderView = () => {
        switch (currentTab) {
            case "dashboard":
                return <Dashboard />;
            case "expenses":
                return <ExpensesPage />;
            case "categories":
                return <CategoriesPage />;
            default:
                return <NotFound onGoHome={() => setCurrentTab("dashboard")} />;
        }
    };

    return (
        <AppProvider>
            <MainLayout activeTab={currentTab} onTabChange={setCurrentTab}>
                {renderView()}
            </MainLayout>
        </AppProvider>
    );
};

export default App;
