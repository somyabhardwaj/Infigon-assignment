'use client';

import { Heart } from 'lucide-react';

interface FavoritesToggleProps {
    showFavoritesOnly: boolean;
    onToggle: () => void;
    favoritesCount: number;
}

export function FavoritesToggle({
    showFavoritesOnly,
    onToggle,
    favoritesCount,
}: FavoritesToggleProps) {
    return (
        <button
            onClick={onToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${showFavoritesOnly
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-red-500 dark:hover:border-red-400'
                }`}
            aria-pressed={showFavoritesOnly}
            aria-label={showFavoritesOnly ? 'Show all products' : 'Show favorites only'}
        >
            <Heart
                className={`w-5 h-5 ${showFavoritesOnly ? 'fill-current' : ''}`}
            />
            <span>
                Favorites {favoritesCount > 0 && `(${favoritesCount})`}
            </span>
        </button>
    );
}
