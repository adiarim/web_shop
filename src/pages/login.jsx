import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/auth-store';

export function Login() {
  const { login, isLoggingIn } = useAuth();

  const onFinish = (values) => {
    login(values);
  };

  return (
    <div style={{ 
      maxWidth: 600, 
      margin: '50px auto', 
      padding: '20px', 
      border: '1px solid #f0f0f0', 
      borderRadius: '8px',
      backgroundColor: '#fff' 
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Вход в систему</h2>
      
      <Form
        name="login_form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Пожалуйста, введите ваш Email!' },
            { type: 'email', message: 'Введите корректный Email!' }
          ]}
        >
          <Input placeholder="example@mail.com" />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
        >
          <Input.Password placeholder="Ваш пароль" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={isLoggingIn} // Кнопка показывает спиннер, пока идет запрос
            style={{ width: '100%' }}
          >
            Войти
          </Button>
        </Form.Item>
      </Form>

      <p style={{ textAlign: 'center', marginTop: '16px' }}>
        Еще нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
      </p>
    </div>
  );
}