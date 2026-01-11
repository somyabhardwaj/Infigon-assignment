'use client';

import { useState, useEffect, useMemo } from 'react';
import { Product, Category, SortOption } from '@/types/types';
import { ProductCard } from './ProductCard';
import { ProductGrid } from './ProductGrid';
import { SearchBar } from './SearchBar';
import { CategoryFilter } from './CategoryFilter';
import { FavoritesToggle } from './FavoritesToggle';
import { SortSelect } from './SortSelect';
import { LoadingGrid } from './LoadingSkeleton';
import { ErrorState } from '../ErrorState';
import { EmptyState } from '../EmptyState';
import { useFavorites } from '../../hooks/useFavorites';
import { Pagination } from './Pagination';

interface ProductListProps {
    initialProducts: Product[];
    initialCategories: Category[];
}

const ITEMS_PER_PAGE = 12;

export function ProductList({ initialProducts, initialCategories }: ProductListProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [sortOption, setSortOption] = useState<SortOption>('none');
    const [currentPage, setCurrentPage] = useState(1);
    const { favorites, toggleFavorite, isFavorite, isLoaded } = useFavorites();

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let filtered = initialProducts;

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter((product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategory) {
            filtered = filtered.filter((product) => product.category === selectedCategory);
        }

        // Filter by favorites
        if (showFavoritesOnly) {
            filtered = filtered.filter((product) => favorites.has(product.id));
        }

        // Sort products
        if (sortOption === 'price-asc') {
            filtered = [...filtered].sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price-desc') {
            filtered = [...filtered].sort((a, b) => b.price - a.price);
        }

        return filtered;
    }, [initialProducts, searchQuery, selectedCategory, showFavoritesOnly, favorites, sortOption]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory, showFavoritesOnly, sortOption]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // Show loading skeleton until favorites are loaded
    if (!isLoaded) {
        return <LoadingGrid />;
    }

    return (
        <div className="space-y-6">
            {/* Filters Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <div className="space-y-4">
                    {/* Search Bar */}
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search products by title..."
                    />

                    {/* Category Filter and Actions */}
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        <CategoryFilter
                            categories={initialCategories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                        />

                        <div className="flex flex-wrap gap-3 items-center">
                            <FavoritesToggle
                                showFavoritesOnly={showFavoritesOnly}
                                onToggle={() => setShowFavoritesOnly(!showFavoritesOnly)}
                                favoritesCount={favorites.size}
                            />
                            <SortSelect value={sortOption} onChange={setSortOption} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
                <>
                    <ProductGrid>
                        {paginatedProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                isFavorite={isFavorite(product.id)}
                                onToggleFavorite={toggleFavorite}
                            />
                        ))}
                    </ProductGrid>

                    {/* Pagination */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        totalItems={filteredProducts.length}
                        itemsPerPage={ITEMS_PER_PAGE}
                    />
                </>
            ) : (
                <EmptyState type={showFavoritesOnly ? 'no-favorites' : 'no-results'} />
            )}
        </div>
    );
}
