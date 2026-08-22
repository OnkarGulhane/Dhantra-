import React from "react";

export const MainLayout = ({ children, activeTab, onTabChange }) => {
    return (
        <div className="main-layout">
            <header className="navbar" style={{ display: "flex", justifyContent: "space-between", padding: "1rem 2rem", background: "var(--card-bg)", borderBottom: "1px solid var(--border-color)" }}>
                <div className="brand" style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--primary-color)" }}>
                    Dhantra (PennyPilot)
                </div>
                <nav style={{ display: "flex", gap: "1rem" }}>
                    <button onClick={() => onTabChange("dashboard")} className={activeTab === "dashboard" ? "btn-primary" : "btn-secondary"}>Dashboard</button>
                    <button onClick={() => onTabChange("expenses")} className={activeTab === "expenses" ? "btn-primary" : "btn-secondary"}>Expenses</button>
                    <button onClick={() => onTabChange("categories")} className={activeTab === "categories" ? "btn-primary" : "btn-secondary"}>Categories</button>
                </nav>
            </header>
            <main className="content" style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
