'use client';

import { ArrowUpDown } from 'lucide-react';
import { SortOption } from '@/types/types';

interface SortSelectProps {
    value: SortOption;
    onChange: (value: SortOption) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
    return (
        <div className="flex items-center gap-1.5 sm:gap-2">
            <ArrowUpDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" />
            <select
                value={value}
                onChange={(e) => onChange(e.target.value as SortOption)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                aria-label="Sort products"
            >
                <option value="none">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
            </select>
        </div>
    );
}
