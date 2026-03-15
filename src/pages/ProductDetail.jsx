import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../api/axios";
import { useQuery } from "@tanstack/react-query"; 
import { Col, Row, Typography, Space, Spin, Button, Tag } from "antd";

const { Title, Text, Paragraph } = Typography;

export function ProductDetail() {
  const { id } = useParams();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  if (isLoading) {
    return (
      <div className="page-product__loading">
        <Spin size="large" tip="Загружаю товар..." />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="page-product__error">
        <Title level={4}>Товар не найден</Title>
        <Text>Произошла ошибка при загрузке. Попробуйте обновить страницу.</Text>
      </div>
    );
  }

  return (
    <div className="page page-product">
      <Row gutter={[40, 40]} className="page-product__grid" align="middle">
        
        <Col xs={24} md={12} className="page-product__image-col">
          <div className="page-product__image-wrapper">
            <img
              src={product.picture}
              alt={product.name}
              className="page-product__image"
            />
          </div>
        </Col>

        <Col xs={24} md={12} className="page-product__info-col">
          <Space direction="vertical" size="middle" className="page-product__info-space">
            
            <Space size="small">
                <Text type="secondary" className="page-product__brand-label">Бренд:</Text>
                <Tag color="black" className="page-product__brand">{product.brand}</Tag>
            </Space>

            <Title level={2} className="page-product__name">
              {product.name}
            </Title>

            <Text className="page-product__price">${product.price}</Text>
            
            <Paragraph className="page-product__description">
              {product.description}
            </Paragraph>

            <Button type="primary" size="large" block className="page-product__add-btn">
              Добавить в корзину
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
}