import React from "react";

export const ErrorMessage = ({ message }) => {
    if (!message) return null;
    return <div className="error-banner" style={{ color: "var(--danger-color)", margin: "0.5rem 0" }}>{message}</div>;
};

export default ErrorMessage;
