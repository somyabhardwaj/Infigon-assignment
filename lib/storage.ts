import { FavoritesState } from '@/types/types';

const FAVORITES_KEY = 'favorites';

export function getFavorites(): FavoritesState {
    if (typeof window === 'undefined') return new Set();

    const stored = localStorage.getItem(FAVORITES_KEY);
    if (!stored) return new Set();

    return new Set(JSON.parse(stored));
}

function saveFavorites(favorites: FavoritesState) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
}

export function toggleFavorite(productId: number, currentFavorites: FavoritesState): FavoritesState {
    const newFavorites = new Set(currentFavorites);

    if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
    } else {
        newFavorites.add(productId);
    }

    saveFavorites(newFavorites);
    return newFavorites;
}
