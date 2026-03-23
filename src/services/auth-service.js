import { classicApi } from "../api/axios.js";

class AuthService {
    async register(registerData) {
        const response = await classicApi.post('/register', registerData);
        return response.data;
    }

    async login(loginData) {
        const response = await classicApi.post('/auth', loginData);

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        
        return response.data; 
    }

    logout() {
        localStorage.removeItem('token');
    }
}

export const authService = new AuthService();