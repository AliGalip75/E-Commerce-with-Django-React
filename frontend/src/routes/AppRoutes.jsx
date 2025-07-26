import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import CartPage from '../pages/CartPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import AccountLayout from '../layouts/AccountLayout';
import NotFound from '@/pages/NotFoundPage';
import ProfilePage from '@/pages/ProfilePage';
import PrivateRoute from '@/routes/PrivateRoute';


const AppRoute = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path='cart' element={<CartPage />} />
                    <Route path='products/:id' element={<ProductDetailPage />} />
                    <Route path='profile' element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                </Route>
                <Route path='/accounts/' element={<AccountLayout />}>
                    <Route path='login' element={<LoginPage />} />
                    <Route path='register' element={<RegisterPage />} />            
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};
export default AppRoute;