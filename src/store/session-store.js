import { create } from "zustand";

export const useSession = create((set) => ({
    user: null,
    token: localStorage.getItem('token'),
    
    setSession: (userData, token) => {
        localStorage.setItem('token', token); 
        set({ user: userData, token: token });
    },

    clear: () => {
        localStorage.removeItem('token'); 
        set({ user: null, token: null }); 
    }
}));