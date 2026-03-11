import { create } from "zustand";
import { classicApi } from "../api/axios";

export const useCategory = create((set) => ({
    data: [],

    loadCategories: async () => {
        const { data } = await classicApi.get('/categories')

        const categories = data?.map((item) => {
            return {
                label: item.name,
                value: item.slug
            }
        })

        set({ data: categories })
    }
}))