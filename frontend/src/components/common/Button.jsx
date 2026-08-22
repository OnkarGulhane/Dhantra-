import React from "react";

export const Button = ({ children, variant = "primary", onClick, type = "button", disabled = false }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`btn-${variant}`}
        >
            {children}
        </button>
    );
};

export default Button;
