import { ProductList } from '@/components/products/ProductList';

export default function HomePage() {
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

            <ProductList />
        </div>
    );
}
