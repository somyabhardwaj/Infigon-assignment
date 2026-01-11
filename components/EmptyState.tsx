import { Package, Heart } from 'lucide-react';

interface EmptyStateProps {
    type: 'no-results' | 'no-favorites';
}

export function EmptyState({ type }: EmptyStateProps) {
    const config = {
        'no-results': {
            icon: Package,
            title: 'No products found',
            description: 'Try adjusting your search or filters to find what you\'re looking for.',
        },
        'no-favorites': {
            icon: Heart,
            title: 'No favorites yet',
            description: 'Start adding products to your favorites by clicking the heart icon.',
        },
    };

    const { icon: Icon, title, description } = config[type];

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-4 mb-4">
                <Icon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                {description}
            </p>
        </div>
    );
}
