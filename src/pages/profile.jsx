import React from 'react';
import { Card, Button, Descriptions, Avatar, Empty } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useSession } from '../store/session-store';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const { user, clearSession } = useSession(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    clearSession(); 
    navigate('/login'); 
  };

  if (!user) {
    return (
      <div style={{ maxWidth: 600, margin: '50px auto' }}>
        <Card>
          <Empty 
            description="Вы не авторизованы" 
            children={<Button type="primary" onClick={() => navigate('/login')}>Войти</Button>} 
          />
        </Card>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: '50px auto', padding: '0 20px' }}>
      <Card 
        title="Личный кабинет" 
        extra={
          <Button 
            danger 
            icon={<LogoutOutlined />} 
            onClick={handleLogout}
          >
            Выйти
          </Button>
        }
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Avatar size={100} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
          <h2 style={{ marginTop: '10px' }}>{user.username || 'Пользователь'}</h2>
        </div>

        <Descriptions bordered column={1}>
          <Descriptions.Item label="Имя">{user.username}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="ID пользователя">{user.id}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

