'use client';

import { useState, useEffect } from 'react';
import { getFavorites, toggleFavorite as toggleFavoriteStorage } from '@/lib/storage';

export function useFavorites() {
    const [favorites, setFavorites] = useState<Set<number>>(new Set());

    useEffect(() => {
        setFavorites(getFavorites());
    }, []);

    const toggleFavorite = (productId: number) => {
        const newFavorites = toggleFavoriteStorage(productId, favorites);
        setFavorites(newFavorites);
    };

    const isFavorite = (productId: number) => {
        return favorites.has(productId);
    };

    return { favorites, toggleFavorite, isFavorite };
}
