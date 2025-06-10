import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

import Home from '../pages/Home';
import ProductDetail from '../pages/ProductDetail';

const AppRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path='products/:id' element={<ProductDetail />} />
            </Route>
        </Routes>
    );
};

export default AppRoute;