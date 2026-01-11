'use client';

import { useState, useEffect } from 'react';
import { getFavorites, toggleFavorite as toggleFavoriteStorage } from '@/lib/storage';

/**
 * Custom hook for managing favorites with localStorage persistence
 */
export function useFavorites() {
    const [favorites, setFavorites] = useState<Set<number>>(new Set());
    const [isLoaded, setIsLoaded] = useState(false);

    // Load favorites from localStorage on mount
    useEffect(() => {
        setFavorites(getFavorites());
        setIsLoaded(true);
    }, []);

    const toggleFavorite = (productId: number) => {
        const newFavorites = toggleFavoriteStorage(productId, favorites);
        setFavorites(newFavorites);
    };

    const isFavorite = (productId: number): boolean => {
        return favorites.has(productId);
    };

    return {
        favorites,
        toggleFavorite,
        isFavorite,
        isLoaded,
    };
}
