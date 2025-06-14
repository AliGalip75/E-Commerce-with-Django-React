import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProductDetail from '../pages/ProductDetail';
import AccountLayout from '../layouts/AccountLayout';

const AppRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path='products/:id' element={<ProductDetail />} />
            </Route>
            <Route path='/accounts/' element={<AccountLayout />}>
                <Route path='login' element={<Login />} />
                <Route path='Register' element={<Register />} />
            </Route>
            
        </Routes>
    );
};

export default AppRoute;