import React from 'react';
import { Button, Form, Input, Card } from 'antd';
import { Link } from 'react-router-dom'; 
import { useAuth } from '../store/auth-store';

export function Register() {
  const { register, isRegistering } = useAuth();

  const onFinish = (values) => {
    register(values);
  };

  return (
    <div style={{ maxWidth: 600, margin: '50px auto', padding: '0 20px' }}>
      <Card title={<h2 style={{ textAlign: 'center', margin: 0 }}>Регистрация</h2>}>
        <Form
          name="register_form"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Полное имя"
            name="username"
            rules={[{ required: true, message: 'Пожалуйста, введите ваше имя!' }]}
          >
            <Input placeholder="Иван Иванов" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Введите Email!' },
              { type: 'email', message: 'Введите корректный адрес!' } 
            ]}
          >
            <Input placeholder="example@mail.com" />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              { required: true, message: 'Введите пароль!' },
              { min: 6, message: 'Пароль должен быть не менее 6 символов!' }
            ]}
          >
            <Input.Password placeholder="минимум 6 символов" />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={isRegistering} 
              style={{ width: '100%' }}
            >
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>

        <p style={{ textAlign: 'center', marginBottom: 0 }}>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </Card>
    </div>
  );
}