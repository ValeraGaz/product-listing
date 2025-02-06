import { create } from 'zustand';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  searchQuery: string;
  categoryFilter: string;
  sortBy: string;
  setProducts: (products: Product[]) => void;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string) => void;
  setSortBy: (sort: string) => void;
  applyFilters: () => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  filteredProducts: [],
  searchQuery: '',
  categoryFilter: '',
  sortBy: '',
  setProducts: (products) => set({ products, filteredProducts: products }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setCategoryFilter: (category) => set({ categoryFilter: category }),
  setSortBy: (sort) => set({ sortBy: sort }),
  applyFilters: () => {
    let { products, searchQuery, categoryFilter, sortBy } = get();
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    if (sortBy === 'low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-low') {
      filtered.sort((a, b) => b.price - a.price);
    }

    set({ filteredProducts: filtered });
  }
}));