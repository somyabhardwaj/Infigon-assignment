'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Heart, Star } from 'lucide-react';
import { Product } from '@/types/types';
import { useFavorites } from '../../hooks/useFavorites';
import { fetchProduct } from '@/lib/api';
import { ErrorState } from '../ErrorState';
import { LoadingSkeleton } from './LoadingSkeleton';

interface ProductDetailProps {
    productId: number;
}

export function ProductDetailClient({ productId }: ProductDetailProps) {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { isFavorite, toggleFavorite } = useFavorites();

    useEffect(() => {
        async function loadProduct() {
            try {
                setIsLoading(true);
                setError(null);
                const productData = await fetchProduct(productId);
                setProduct(productData);
            } catch (err) {
                console.error('Error loading product:', err);
                setError(err instanceof Error ? err.message : 'Failed to load product');
            } finally {
                setIsLoading(false);
            }
        }
        loadProduct();
    }, [productId]);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-current" />
                    <span>Back to Products</span>
                </Link>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-current" />
                    <span>Back to Products</span>
                </Link>
                <ErrorState
                    message={error}
                    onRetry={() => {
                        setError(null);
                        setIsLoading(true);
                        fetchProduct(productId)
                            .then(setProduct)
                            .catch((err) => {
                                setError(err instanceof Error ? err.message : 'Failed to load product');
                            })
                            .finally(() => setIsLoading(false));
                    }}
                />
            </div>
        );
    }

    if (!product) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back Button */}
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
            >
                <ArrowLeft className="w-5 h-5 text-current" />
                <span>Back to Products</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Product Image */}
                <div className="relative aspect-square bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 p-8">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                    />
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                    {/* Category Badge */}
                    <div>
                        <span className="inline-block px-4 py-1.5 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-white rounded-full capitalize">
                            {product.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-200">
                        {product.title}
                    </h1>

                    {/* Rating */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${i < Math.round(product.rating.rate)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300 dark:text-gray-600'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-gray-800 dark:text-gray-400">
                            {product.rating.rate} ({product.rating.count} reviews)
                        </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-4">
                        <span className="text-5xl font-bold text-gray-900 dark:text-gray-200">
                            ${product.price.toFixed(2)}
                        </span>
                    </div>

                    {/* Description */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                            Description
                        </h2>
                        <p className="text-gray-800 dark:text-gray-400 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 pt-6">
                        <button
                            onClick={() => toggleFavorite(product.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${isFavorite(product.id)
                                    ? 'bg-red-600 hover:bg-red-700 text-white'
                                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600'
                                }`}
                            aria-label={isFavorite(product.id) ? 'Remove from favorites' : 'Add to favorites'}
                        >
                            <Heart
                                className={`w-5 h-5 ${isFavorite(product.id) 
                                    ? 'fill-current text-current' 
                                    : 'text-gray-600 dark:text-gray-400'
                                }`}
                            />
                            {isFavorite(product.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
