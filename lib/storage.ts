import { FavoritesState } from '@/types/types';

const FAVORITES_STORAGE_KEY = 'product-favorites';

/**
 * Get favorites from localStorage
 */
export function getFavorites(): FavoritesState {
    if (typeof window === 'undefined') {
        return new Set();
    }

    try {
        const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (!stored) {
            return new Set();
        }
        const favoritesArray = JSON.parse(stored) as number[];
        return new Set(favoritesArray);
    } catch (error) {
        console.error('Error reading favorites from localStorage:', error);
        return new Set();
    }
}

/**
 * Save favorites to localStorage
 */
function saveFavorites(favorites: FavoritesState): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        const favoritesArray = Array.from(favorites);
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoritesArray));
    } catch (error) {
        console.error('Error saving favorites to localStorage:', error);
    }
}

/**
 * Toggle favorite status for a product
 */
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
