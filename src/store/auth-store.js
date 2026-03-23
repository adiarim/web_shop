
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query"; 
import { authService } from "../services/auth-service";
import { useSession } from "./session-store";
import { notification } from "antd";

export const useAuth = () => {
    const navigate = useNavigate();
    const setSession = useSession((state) => state.setSession);

    const registerMutation = useMutation({
        mutationFn: (data) => authService.register(data),
        onSuccess: (response) => {
            console.log(response)
            const user = response.data; 
            const token = response.token;
            
            if (user && token) {
                setSession(user, token); 
                toast.success(`Привет, ${user.username}! ✨`);
                navigate('/profile');
            }

            setSession(user, token); 
            navigate('/profile'); 
},
        onError: (error) => {
            notification.error({
                message: 'Ошибка регистрации',
                description: error.response?.data?.message || 'Что-то пошло не так, попробуйте позже.',
                placement: 'topRight',
            });
        }
    });

    const loginMutation = useMutation({
        mutationFn: (data) => authService.login(data),
        onSuccess: (response) => {
            console.log("Данные из консоли:", response);

            // Достаем данные СТРОГО как в консоли на скрине
            const userData = response.data; // Тут лежит объект {username, email...}
            const token = response.token;   // Тут лежит длинная строка токена

            if (userData && token) {
                setSession(userData, token); // Передаем оба аргумента в стор
                toast.success('Вход выполнен! ✨');
                navigate('/profile');
            }
        },
        onError: (error) => {
            notification.error({
                message: 'Ошибка входа',
                description: 'Неверный email или пароль. Проверьте данные.',
                placement: 'topRight',
            });
        }
    });

    return {
        register: registerMutation.mutate,
        isRegistering: registerMutation.isPending, 
        
        login: loginMutation.mutate,
        isLoggingIn: loginMutation.isPending, 
    };
};