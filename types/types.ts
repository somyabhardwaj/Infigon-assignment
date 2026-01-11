// Product type from FakeStore API
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Category type
export type Category = string;

// Filter state for search and category filtering
export interface FilterState {
  searchQuery: string;
  selectedCategory: string | null;
  showFavoritesOnly: boolean;
}

// Favorites state
export type FavoritesState = Set<number>;

// Sort options
export type SortOption = 'none' | 'price-asc' | 'price-desc';
