import { create } from 'zustand';
import { classicApi } from '../api/axios';

export const useProductsStore = create((set) => ({
    data: [],
    loading: false,
    error: null,

    loadData: async () => {
        set({ loading: true, error: null });
        try {
            const response = await classicApi.get('/products');
            set({ data: response.data, loading: false });
        } catch (error) {
            console.error("Ошибка API:", error);
            set({ error: error.message, loading: false });
        }
    }
}));