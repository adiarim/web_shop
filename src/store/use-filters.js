import { create } from "zustand";

export const useFiltersStore = create((set, get) => ({
    search: '',
    categoryId: null,

    setSearch: (search) => set({ search }),
    setCategoryId: (categoryId) => set({ categoryId })
}))