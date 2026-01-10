import { Product, Category } from '@/types/types';
const API_BASE_URL = 'https://fakestoreapi.com';

// Fetch all products from the FakeStore API
export async function fetchProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products`, {
        cache: 'no-store', 
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    return response.json();
}

// Fetch a single product by ID
export async function fetchProduct(id: number): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    return response.json();
}

// Fetch all available categories
export async function fetchCategories(): Promise<Category[]> {
    const response = await fetch(`${API_BASE_URL}/products/categories`, {
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    return response.json();
}
