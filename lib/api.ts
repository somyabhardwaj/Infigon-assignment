import { Product, Category } from '@/types/types';

const API_BASE_URL = 'https://fakestoreapi.com';
const FETCH_TIMEOUT = 10000; // 10 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Fetch configuration for server-side rendering
const getFetchOptions = (signal?: AbortSignal) => ({
    cache: 'no-store' as const,
    next: { revalidate: 0 },
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://fakestoreapi.com/',
    },
    ...(signal && { signal }),
});

// Helper function to delay retries
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch all products from the FakeStore API
export async function fetchProducts(): Promise<Product[]> {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

            const response = await fetch(`${API_BASE_URL}/products`, {
                ...getFetchOptions(controller.signal),
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                // If 403, try again with a delay
                if (response.status === 403 && attempt < MAX_RETRIES) {
                    console.warn(`Attempt ${attempt} failed with 403, retrying...`);
                    await delay(RETRY_DELAY * attempt);
                    continue;
                }
                throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            lastError = error as Error;
            if (error instanceof Error && error.name === 'AbortError') {
                if (attempt < MAX_RETRIES) {
                    await delay(RETRY_DELAY * attempt);
                    continue;
                }
                throw new Error('Request timeout: The API took too long to respond');
            }
            if (attempt < MAX_RETRIES) {
                await delay(RETRY_DELAY * attempt);
                continue;
            }
        }
    }
    
    console.error('Error fetching products after retries:', lastError);
    throw lastError || new Error('Failed to fetch products after multiple attempts');
}

//  Fetch a single product by ID
export async function fetchProduct(id: number): Promise<Product> {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

            const response = await fetch(`${API_BASE_URL}/products/${id}`, {
                ...getFetchOptions(controller.signal),
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                // If 403, try again with a delay
                if (response.status === 403 && attempt < MAX_RETRIES) {
                    console.warn(`Attempt ${attempt} failed with 403, retrying...`);
                    await delay(RETRY_DELAY * attempt);
                    continue;
                }
                throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            lastError = error as Error;
            if (error instanceof Error && error.name === 'AbortError') {
                if (attempt < MAX_RETRIES) {
                    await delay(RETRY_DELAY * attempt);
                    continue;
                }
                throw new Error('Request timeout: The API took too long to respond');
            }
            if (attempt < MAX_RETRIES) {
                await delay(RETRY_DELAY * attempt);
                continue;
            }
        }
    }
    
    console.error('Error fetching product after retries:', lastError);
    throw lastError || new Error('Failed to fetch product after multiple attempts');
}

// Fetch all available categories
export async function fetchCategories(): Promise<Category[]> {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

            const response = await fetch(`${API_BASE_URL}/products/categories`, {
                ...getFetchOptions(controller.signal),
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                // If 403, try again with a delay
                if (response.status === 403 && attempt < MAX_RETRIES) {
                    console.warn(`Attempt ${attempt} failed with 403, retrying...`);
                    await delay(RETRY_DELAY * attempt);
                    continue;
                }
                throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            lastError = error as Error;
            if (error instanceof Error && error.name === 'AbortError') {
                if (attempt < MAX_RETRIES) {
                    await delay(RETRY_DELAY * attempt);
                    continue;
                }
                throw new Error('Request timeout: The API took too long to respond');
            }
            if (attempt < MAX_RETRIES) {
                await delay(RETRY_DELAY * attempt);
                continue;
            }
        }
    }
    
    console.error('Error fetching categories after retries:', lastError);
    throw lastError || new Error('Failed to fetch categories after multiple attempts');
}
