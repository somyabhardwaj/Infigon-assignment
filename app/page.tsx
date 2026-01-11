import { fetchProducts, fetchCategories } from '@/lib/api';
import { ProductList } from '@/components/products/ProductList';
import { ErrorState } from '@/components/ErrorState';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
    try {
        // Fetch data on the server
        const [products, categories] = await Promise.all([
            fetchProducts(),
            fetchCategories(),
        ]);

        return (
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Explore Our Products
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Browse through our collection and find your favorites
                    </p>
                </div>

                <ProductList
                    initialProducts={products}
                    initialCategories={categories}
                />
            </div>
        );
    } catch (error) {
        console.error('HomePage error:', error);
        return (
            <div className="container mx-auto px-4 py-8">
                <ErrorState
                    message="Failed to load products. Please check your internet connection and try again."
                />
            </div>
        );
    }
}
