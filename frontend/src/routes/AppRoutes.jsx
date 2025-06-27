import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProductDetail from '../pages/ProductDetail';
import AccountLayout from '../layouts/AccountLayout';
import NotFound from '@/pages/NotFound';
import Profile from '@/pages/Profile';
import PrivateRoute from '@/routes/PrivateRoute';


const AppRoute = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path='cart' element={<Cart />} />
                    <Route path='products/:id' element={<ProductDetail />} />
                    <Route path='profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
                </Route>
                <Route path='/accounts/' element={<AccountLayout />}>
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};
export default AppRoute;