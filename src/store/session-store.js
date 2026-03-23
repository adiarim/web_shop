import { create } from "zustand";

export const useSession = create((set) => ({
    user: (() => {
        try {
            const item = localStorage.getItem('user');
            return item && item !== "undefined" ? JSON.parse(item) : null;
        } catch (e) {
            console.error("Ошибка парсинга юзера из localStorage", e);
            return null;
        }
    })(),

    token: localStorage.getItem('token') || null,
    isAuth: !!localStorage.getItem('token'), 

    setSession: (userData, token) => {
        if (!userData || !token) return; 

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData)); 
        
        set({ user: userData, token: token, isAuth: true });
    },

    clear: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null, token: null, isAuth: false });
    }
}));