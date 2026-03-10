import { create } from 'zustand'

export const useCartStore = create((set) => ({
    isOpen: false,

    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}))