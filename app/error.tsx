'use client';

import { useEffect } from 'react';
import { ErrorState } from '@/components/ErrorState';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Error:', error);
    }, [error]);

    return (
        <div className="container mx-auto px-4 py-8">
            <ErrorState
                message={error.message || 'An unexpected error occurred.'}
                onRetry={reset}
            />
        </div>
    );
}
