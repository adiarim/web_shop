import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { classicApi, getProductById } from "../api/axios"; 
import { Spin } from 'antd';

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSingleProduct = async () => {
        try {
            setLoading(true);
            const data = await getProductById(id); 
            setProduct(data);
        } catch (err) {
            console.error(err);
            setError("Товар не найден или произошла ошибка сервера");
        } finally {
            setLoading(false);
        }
    };

    if (id) {
        fetchSingleProduct();
    }
}, [id]);

  if (loading) return <Spin size="large" />;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Товар не найден!</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{product.name}</h1>
      <img src={product.picture} alt={product.name} style={{ width: '300px' }} />
      <p>{product.description}</p>
      <p>Цена: ${product.price}</p>
      <p>Бренд: {product.brand}</p>
    </div>
  );
}