import {createBrowserRouter} from 'react-router-dom'
import {Home} from '../pages/home.jsx'
import {Products} from '../pages/products.jsx'
import {Profile} from '../pages/profile.jsx'
import {AppLayout} from './layout.jsx'
import { ProductDetail } from '../pages/ProductDetail.jsx'

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
        ]
    }
])