import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [theme, setTheme] = useState("dark");

    const toggleTheme = () => {
        setTheme(prev => prev === "dark" ? "light" : "dark");
    };

    return (
        <AppContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
