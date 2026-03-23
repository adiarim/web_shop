import { create } from 'zustand'

export const useCartStore = create((set) => ({
    isOpen: false,
    items: [], 

    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),

    addToCart: (product) => set((state) => {
        const exists = state.items.find(item => item.id === product.id);
        if (exists) return state; 
        return { items: [...state.items, product] };
    }),

    removeFromCart: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
    })),

    clearCart: () => set({ items: [] })
}))