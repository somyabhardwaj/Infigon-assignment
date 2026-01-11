import { Product, Category } from '@/types/types';

const API_BASE_URL = 'https://fakestoreapi.com';
const FETCH_TIMEOUT = 10000; // 10 seconds

// Fetch configuration for server-side rendering
const getFetchOptions = (signal?: AbortSignal) => ({
    cache: 'no-store' as const,
    next: { revalidate: 0 },
    headers: {
        'Content-Type': 'application/json',
    },
    ...(signal && { signal }),
});

// Fetch all products from the FakeStore API
export async function fetchProducts(): Promise<Product[]> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

        const response = await fetch(`${API_BASE_URL}/products`, {
            ...getFetchOptions(controller.signal),
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Request timeout: The API took too long to respond');
        }
        console.error('Error fetching products:', error);
        throw error;
    }
}

//  Fetch a single product by ID
export async function fetchProduct(id: number): Promise<Product> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            ...getFetchOptions(controller.signal),
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Request timeout: The API took too long to respond');
        }
        console.error('Error fetching product:', error);
        throw error;
    }
}

// Fetch all available categories
export async function fetchCategories(): Promise<Category[]> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

        const response = await fetch(`${API_BASE_URL}/products/categories`, {
            ...getFetchOptions(controller.signal),
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Request timeout: The API took too long to respond');
        }
        console.error('Error fetching categories:', error);
        throw error;
    }
}
