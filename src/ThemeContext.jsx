import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    // Theme can be: 'light', 'dark', or 'system'
    const [themeMode, setThemeMode] = useState(() => {
        const saved = localStorage.getItem('themeMode');
        return saved || 'system';
    });

    // Actual applied theme (resolved from system if mode is 'system')
    const [appliedTheme, setAppliedTheme] = useState(() => {
        // Initialize with default
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const saved = localStorage.getItem('themeMode');
        if (saved === 'light' || saved === 'dark') {
            return saved;
        }
        return mediaQuery.matches ? 'dark' : 'light';
    });

    // Set initial theme immediately
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', appliedTheme);
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const updateAppliedTheme = () => {
            if (themeMode === 'system') {
                setAppliedTheme(mediaQuery.matches ? 'dark' : 'light');
            } else {
                setAppliedTheme(themeMode);
            }
        };

        updateAppliedTheme();

        // Listen for system preference changes
        mediaQuery.addEventListener('change', updateAppliedTheme);
        return () => mediaQuery.removeEventListener('change', updateAppliedTheme);
    }, [themeMode]);

    useEffect(() => {
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', appliedTheme);
    }, [appliedTheme]);

    const setTheme = (mode) => {
        setThemeMode(mode);
        localStorage.setItem('themeMode', mode);
    };

    return (
        <ThemeContext.Provider value={{ themeMode, appliedTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
