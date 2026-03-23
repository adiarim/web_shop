import { create } from 'zustand';

export const useBasket = create((set) => ({
    items: [], 

    addToBasket: (product) => set((state) => {
        const existingItem = state.items.find(item => item.id === product.id);

        if (existingItem) {
            return {
                items: state.items.map(item =>
                    item.id === product.id
                        ? { ...item, count: (item.count || 1) + 1 }
                        : item
                )
            };
        }

        return { items: [...state.items, { ...product, count: 1 }] };
    }),

    removeFromBasket: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
    })),

    clearBasket: () => set({ items: [] }),
}));