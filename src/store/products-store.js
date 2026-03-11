import { create } from 'zustand';
import { classicApi } from '../api/axios';

export const useProductsStore = create((set) => ({
    data: [],
    loading: false,

    loadData: async (search = '', categorySlug = 'all') => {
        set({ loading: true });

        const params = {
            name: search ? `*${search}*` : undefined,
            category: categorySlug === 'all' ? undefined : categorySlug 
        };

        const { data } = await classicApi.get('/products', { params });
        
        set({ data, loading: false });
    }
}));