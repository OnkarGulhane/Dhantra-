import React from "react";

export const Dashboard = () => {
    return (
        <div className="dashboard-page">
            <h1>Dhantra — Financial Dashboard</h1>
            <p>Welcome to Dhantra Core Expense Management Platform (V1).</p>
            <div className="dashboard-cards">
                <div className="card">
                    <h3>Total Expenses</h3>
                    <p className="card-value">₹0.00</p>
                </div>
                <div className="card">
                    <h3>Expense Count</h3>
                    <p className="card-value">0</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
