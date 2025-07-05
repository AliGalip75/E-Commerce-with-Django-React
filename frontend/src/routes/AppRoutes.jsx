import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/HomePage';
import Cart from '../pages/CartPage';
import Login from '../pages/LoginPage';
// import Register from '../pages/Register';
import ProductDetail from '../pages/ProductDetailPage';
import AccountLayout from '../layouts/AccountLayout';
import NotFound from '@/pages/NotFoundPage';
import Profile from '@/pages/ProfilePage';
import PrivateRoute from '@/routes/PrivateRoute';


const AppRoute = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path='cart' element={<Cart />} />
                    <Route path='products/:id' element={<ProductDetail />} />
                    <Route path='profile' element={<Profile />} /> {/** <PrivateRoute> <Profile /> <PrivateRoute /> */}
                </Route>
                <Route path='/accounts/' element={<AccountLayout />}>
                    <Route path='login' element={<Login />} />
                    {/** 
                    <Route path='register' element={<Register />} />
                    */}
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};
export default AppRoute;