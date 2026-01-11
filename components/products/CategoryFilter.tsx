'use client';

import { Category } from '@/types/types';

interface CategoryFilterProps {
    categories: Category[];
    selectedCategory: string | null;
    onSelectCategory: (category: string | null) => void;
}

export function CategoryFilter({
    categories,
    selectedCategory,
    onSelectCategory,
}: CategoryFilterProps) {
    return (
        <>
            {/* Mobile: Dropdown */}
            <div className="sm:hidden w-full">
                <select
                    value={selectedCategory || ''}
                    onChange={(e) => onSelectCategory(e.target.value || null)}
                    className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all capitalize"
                    aria-label="Filter by category"
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category} className="capitalize">
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {/* Desktop: Buttons */}
            <div className="hidden sm:flex flex-wrap gap-2">
                <button
                    onClick={() => onSelectCategory(null)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-medium transition-all ${selectedCategory === null
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'
                        }`}
                    aria-pressed={selectedCategory === null}
                >
                    All
                </button>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-medium transition-all capitalize ${selectedCategory === category
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'
                            }`}
                        aria-pressed={selectedCategory === category}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </>
    );
}
