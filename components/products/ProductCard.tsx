'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/types';
import { Heart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
    isFavorite: boolean;
    onToggleFavorite: (id: number) => void;
}

export function ProductCard({ product, isFavorite, onToggleFavorite }: ProductCardProps) {
    return ( 
        <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
            <Link href={`/products/${product.id}`} className="block">
                {/* Image Container */}
                <div className="relative aspect-square bg-gray-50 dark:bg-gray-900 overflow-hidden">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Category Badge */} 
                    <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 text-xs font-medium   dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                            {product.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {product.title}
                    </h3> 

                    <div className="flex items-center justify-between mt-3">
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                ${product.price.toFixed(2)}
                            </span>
                            <div className="flex items-center gap-1 mt-1">
                                <span className="text-yellow-500">★</span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {product.rating.rate} ({product.rating.count})
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>

            {/* Favorite Button */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    onToggleFavorite(product.id);
                }}
                className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-transform duration-200 border border-gray-200 dark:border-gray-600"
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                <Heart
                    className={`w-5 h-5 ${isFavorite
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}
                />
            </button>
        </div>
    );
}
