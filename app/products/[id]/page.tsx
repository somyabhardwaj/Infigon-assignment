import { fetchProduct } from '@/lib/api';
import { ProductDetailClient } from '@/components/products/ProductDetail';
import { ErrorState } from '@/components/ErrorState';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface ProductDetailPageProps {
    params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
    try {
        const { id } = await params;
        const productId = Number(id);
        
        if (isNaN(productId)) {
            return {
                title: 'Product Not Found - Product Explorer',
            };
        }
        
        const product = await fetchProduct(productId);
        return {
            title: `${product.title} - Product Explorer`,
            description: product.description,
        };
    } catch {
        return {
            title: 'Product Not Found - Product Explorer',
        };
    }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    try {
        const { id } = await params;
        const productId = Number(id);

        if (isNaN(productId)) {
            notFound();
        }

        const product = await fetchProduct(productId);
        return <ProductDetailClient product={product} />;
    } catch (error) {
        console.error('ProductDetailPage error:', error);
        return (
            <div className="container mx-auto px-4 py-8">
                <ErrorState
                    message="Failed to load product. Please check your internet connection and try again."
                />
            </div>
        );
    }
}
