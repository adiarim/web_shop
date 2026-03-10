import { useParams } from "react-router-dom";
import { useProductsStore } from "../store/products-store"; // Импортируем твой стор
import { useEffect } from "react";

export function ProductDetail() {
  const { id } = useParams(); // Забираем id из URL
  const { data, loadData, loading } = useProductsStore();

  // Если пользователь обновил страницу, данные в сторе могут быть пустыми. 
  // Поэтому подстрахуемся и вызовем загрузку.
  useEffect(() => {
    if (data.length === 0) {
      loadData();
    }
  }, []);

  // Ищем конкретный товар в массиве по его id
  const product = data.find((item) => String(item.id) === String(id));

  if (loading) return <div>Загрузка...</div>;
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