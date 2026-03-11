import { Card, Tag, Typography, Button } from 'antd'
import { Link } from 'react-router-dom'
import { useCategory } from '../store/category-store'
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Paragraph, Text, Title } = Typography

export function ProductCard({ product, currentCategory }) {
    
    const handleAddToCart = (e) => {
        e.preventDefault(); 
        e.stopPropagation();
        
        console.log(`Товар ${product.name} летит в корзину!`);

        const categories = useCategory(state => state.data)
        const currentCategory = categories.find((item) => item.value === product.slug)?.label
    };

    return (
        <Link to={`/products/${product.id}`} className="product-card-link">
            <Card
                hoverable
                className="product-card"
                cover={
                    <div className="product-card__image-wrapper">
                        <img
                            src={product.picture}
                            alt={product.name}
                            className="product-card__image"
                        />
                    </div>
                }
                actions={[
                    <Button 
                        type="primary" 
                        icon={<ShoppingCartOutlined />} 
                        onClick={handleAddToCart}
                        className="product-card__add-btn"
                    >
                        В корзину
                    </Button>
                ]}
            >
                <div className="product-card__body">
                    <Title level={5} className="product-card__title">
                        {product.name}
                    </Title>
                    <div className="product-card__price-row">
                        <Text strong className="product-card__price">
                            ${product.price}
                        </Text>
                    </div>
                    <div className="product-card__tags">
                        <Tag color="blue" className="product-card__tag">{product.brand}</Tag>
                        <Tag className="product-card__tag">{currentCategory}</Tag>
                    </div>
                    <Paragraph
                        type="secondary"
                        ellipsis={{ rows: 2 }}
                        className="product-card__description"
                    >
                        {product.description}
                    </Paragraph>
                </div>
            </Card>
        </Link>
    );
}