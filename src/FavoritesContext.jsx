import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within FavoritesProvider');
    }
    return context;
};

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (postSlug) => {
        setFavorites(prev => {
            if (!prev.includes(postSlug)) {
                return [...prev, postSlug];
            }
            return prev;
        });
    };

    const removeFavorite = (postSlug) => {
        setFavorites(prev => prev.filter(slug => slug !== postSlug));
    };

    const isFavorite = (postSlug) => {
        return favorites.includes(postSlug);
    };

    const toggleFavorite = (postSlug) => {
        if (isFavorite(postSlug)) {
            removeFavorite(postSlug);
        } else {
            addFavorite(postSlug);
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
