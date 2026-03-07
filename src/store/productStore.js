import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getProducts, getCategories } from '../services/productService';

const useProductStore = create(
  persist(
    (set, get) => ({
      products: [],
      categories: [],
      loading: false,
      error: null,
      filters: {
        category: null,
        search: '',
        minPrice: null,
        maxPrice: null,
        size: null,
        color: null,
      },

      setFilters: (newFilters) => {
        set({ filters: { ...get().filters, ...newFilters } });
      },

      clearFilters: () => {
        set({
          filters: {
            category: null,
            search: '',
            minPrice: null,
            maxPrice: null,
            size: null,
            color: null,
          },
        });
      },

      fetchProducts: async (filters = {}) => {
        // If we already have products in local storage, don't fetch from JSON unless requested
        if (get().products.length > 0 && !filters.forceRefresh) {
          return;
        }

        set({ loading: true, error: null });
        try {
          const products = await getProducts(filters || get().filters);
          set({ products, loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      fetchCategories: async () => {
        if (get().categories.length > 0) return;
        try {
          const categories = await getCategories();
          set({ categories });
        } catch (error) {
          set({ error: error.message });
        }
      },

      addProduct: (product) => {
        set((state) => ({
          products: [
            ...state.products,
            { ...product, id: product.id || `prod_${Date.now()}` }
          ]
        }));
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          )
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id)
        }));
      },
    }),
    {
      name: 'toliya-product-storage',
    }
  )
);

export default useProductStore;



