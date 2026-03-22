import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { ConfigProvider, Layout, Menu, Typography } from 'antd'
import { useCartStore } from '../store/cart-store.js'
import { CartDrawer } from '../components/cart-drawer'
import { useSession } from '../store/session-store.js'

const { Header, Content } = Layout
const { Title, Text } = Typography

export function AppLayout() {
    const open = useCartStore(state => state.open)
    const { token, clear } = useSession()
    const navigate = useNavigate()

    const renderAuthButton = () => {
        if (token) {
            return (
                <button
                onClick={() => {
                    clear()
                    navigate('/login')
                }}
                className='app-header__link app-header__cart-button'
                >Выйти</button>
            )
        }
        else {
            return <NavLink to='/login' className='app-header__link'>
            Войти
            </NavLink>
        }
    }

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#1677ff',
                    borderRadius: 12,
                    fontFamily:
                        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
                },
            }}
        >
            <Layout className="app-layout">
                <Header
                    className="app-header"
                >
                    <div className="app-header__left">
                        <Title level={3} className="app-header__title">
                            World Wide Clothing
                        </Title>
                        <Text type="secondary" className="app-header__subtitle">
                            Каталог винтажной одежды
                        </Text>
                    </div>
                    <Menu
                        mode="horizontal"
                        selectable={false}
                        className="app-header__menu"
                        items={[
                            {
                                key: 'catalog',
                                label: (
                                    <NavLink to="/products" className="app-header__link">
                                        Каталог
                                    </NavLink>
                                ),
                            },
                            {
                                key: 'profile',
                                label: (
                                    <NavLink to="/profile" className="app-header__link">
                                        Профиль
                                    </NavLink>
                                ),
                            },
                            {
                                key: 'login',
                                label: renderAuthButton(),
                            },
                            {
                                key: 'cart',
                                label: (
                                    <button
                                        type="button"
                                        className="app-header__link app-header__cart-button"
                                        onClick={open}
                                    >
                                        Корзина
                                    </button>
                                ),
                            },
                        ]}
                    />
                </Header>
                <Content
                    className="app-content"
                >
                    <div className="app-content-inner">
                        <Outlet />
                    </div>
                </Content>
                <CartDrawer />
            </Layout>
        </ConfigProvider>
    )
}