import React, { createContext, useState, useEffect, useContext } from 'react';

// Créer le contexte du thème
const ThemeContext = createContext();

// Hook personnalisé pour utiliser le contexte du thème
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme doit être utilisé dans un ThemeProvider');
    }
    return context;
};

// Provider du thème
export const ThemeProvider = ({ children }) => {
    // Récupérer le thème depuis localStorage ou utiliser 'light' par défaut
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        const icon = document.querySelector("link[rel='icon']");
        if (icon) {
            icon.href = theme === 'dark'
                ? '/favicon-dark.png'
                : '/favicon.png';
        }
    }, [theme]);

    // Fonction pour basculer entre light et dark
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const value = {
        theme,
        toggleTheme,
        isDark: theme === 'dark'
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
