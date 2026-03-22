import { createBrowserRouter } from 'react-router-dom';
import { Products } from '../pages/products.jsx';
import { Profile } from '../pages/profile.jsx'
import { AppLayout } from './layout.jsx';
import { ProductDetail } from '../pages/ProductDetail.jsx';
import { Login } from '../pages/login.jsx';
import { Register } from '../pages/register.jsx';

export const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: <Products />
            },
            {
                path: '/products',
                element: <Products />
            },
            {
                path: '/products/:id', 
                element: <ProductDetail />
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            }
        ]
    }
], {
    basename: "/web_shop" 
});