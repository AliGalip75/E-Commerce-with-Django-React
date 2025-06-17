import React, { useEffect, useState } from 'react';
import axiosInstance from '@/api/AxiosInstance';
import CartItemCard from "@/components/CartItemCard";
import OrderSummaryCard from "@/components/OrderSummaryCard";

const Cart = () => {

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        axiosInstance.get("cart/")
        .then(res => setCartItems(res.data))
        .catch(err => console.error("Sepet yüklenemedi", err));
    }, []);

    return (
        <div className="w-full flex justify-center">
            <div className="container mx-5 mt-10">
                <div className="flex md:flex-row justify-center flex-col gap-5">
                    <div className="md:w-[75%] w-[100%]">
                        <h2 className="text-xl font-semibold mb-4">Sepetim</h2>
                        {cartItems.length === 0 ? (
                            <p>Sepetiniz boş.</p>
                        ) : (
                            <>
                            <ul className="space-y-5">
                                {cartItems.map(item => (
                                    <li key={item.id}>
                                        <CartItemCard item={item} />
                                    </li>
                                ))}
                            </ul>
                            </>
                        )}
                    </div>
                    <div className="md:w-[40%] w-[100%] ">
                        <div className=" w-full md:h-full h-[250px]">
                            <OrderSummaryCard items={cartItems} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;