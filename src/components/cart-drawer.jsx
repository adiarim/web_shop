import { Drawer, Typography } from 'antd'
import { useCartStore } from '../store/cart-store.js'

const { Title, Paragraph } = Typography

export function CartDrawer() {
    const { isOpen, close } = useCartStore()

    return (
        <Drawer
            title="Корзина"
            placement="right"
            open={isOpen}
            onClose={close}
            size={720}
        >
            <Title level={4}>Корзина</Title>
            <Paragraph>Здесь будет список товаров, добавленных в корзину.</Paragraph>
        </Drawer>
    )
}