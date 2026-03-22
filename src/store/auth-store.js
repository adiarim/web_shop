
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
        onSuccess: () => {
            notification.success({
                message: 'Успешная регистрация',
                description: 'Теперь вы можете войти в систему под своим аккаунтом.',
                placement: 'topRight', 
                duration: 3, 
            });
            navigate('/login');
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
        onSuccess: (data) => {
            setSession('/profile'); 
            navigate('/profile'); 
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