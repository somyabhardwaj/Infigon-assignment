export function LoadingSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 animate-pulse">
            {/* Image Skeleton */}
            <div className="aspect-square bg-gray-200 dark:bg-gray-700" />

            {/* Content Skeleton */}
            <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mt-4" />
            </div>
        </div>
    );
}

export function LoadingGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
                <LoadingSkeleton key={i} />
            ))}
        </div>
    );
}
