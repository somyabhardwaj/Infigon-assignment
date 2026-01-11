import { ProductDetailClient } from '@/components/products/ProductDetail';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface ProductDetailPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
    const { id } = await params;
    const productId = Number(id);
    
    if (isNaN(productId)) {
        return {
            title: 'Product Not Found - Product Explorer',
        };
    }
    
    return {
        title: `Product ${productId} - Product Explorer`,
        description: 'View product details',
    };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { id } = await params;
    const productId = Number(id);

    if (isNaN(productId)) {
        notFound();
    }

    return <ProductDetailClient productId={productId} />;
}
