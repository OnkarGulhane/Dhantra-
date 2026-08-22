import React from "react";

export const NotFound = ({ onGoHome }) => {
    return (
        <div className="not-found-page card" style={{ textAlign: "center", padding: "3rem" }}>
            <h2>404 — Page Not Found</h2>
            <p style={{ margin: "1rem 0", color: "var(--text-muted)" }}>The requested page does not exist.</p>
            {onGoHome && <button onClick={onGoHome} className="btn-primary">Go to Dashboard</button>}
        </div>
    );
};

export default NotFound;
