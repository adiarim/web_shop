import { Drawer, Typography, Button, Empty, Space } from 'antd'
import { useCartStore } from '../store/cart-store.js'
import { DeleteOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

export function CartDrawer() {
    const { isOpen, close, items, removeFromCart } = useCartStore()

    const totalPrice = items.reduce((sum, item) => sum + item.price, 0)

    return (
        <Drawer
            title="Твоя корзина"
            placement="right"
            onClose={close}
            open={isOpen}
            size={450} 
        >
            {items.length === 0 ? (
                <Empty description="В корзине пока пусто" />
            ) : (
                <div className="cart-items-list">
                    {items.map((item) => (
                        <div key={item.id} className="cart-product-card">
                            <img src={item.imageUrl} alt={item.title} className="cart-product-img" />
                            <div className="cart-product-info">
                                <Text className="cart-product-title">{item.title}</Text>
                                <Text type="secondary" className="cart-product-price">${item.price}</Text>
                            </div>
                            <Button 
                                type="text" 
                                danger 
                                icon={<DeleteOutlined />} 
                                onClick={() => removeFromCart(item.id)}
                            />
                        </div>
                    ))}

                    <div style={{ marginTop: 30, padding: '20px 0', borderTop: '1px solid #eee' }}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text strong>Итого:</Text>
                                <Text strong style={{ fontSize: 18 }}>${totalPrice}</Text>
                            </div>
                            <Button type="primary" size="large" block style={{ background: 'black', border: 'none' }}>
                                Оформить заказ
                            </Button>
                        </Space>
                    </div>
                </div>
            )}
        </Drawer>
    )
}