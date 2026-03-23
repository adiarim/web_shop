import axios from 'axios';

class CartService {
    async checkout(orderData) {
        try {
            const response = await axios.post('https://ваша-ссылка.mokky.dev/orders', orderData);
            return response.data;
        } catch (error) {
            console.error("Ошибка при оформлении заказа", error);
        }
    }
}

export const cartService = new CartService();