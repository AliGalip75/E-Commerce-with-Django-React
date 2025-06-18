import React, { useEffect, useState, useContext } from 'react';
import axiosInstance from '@/api/AxiosInstance';
import CartItemCard from "@/components/CartItemCard";
import OrderSummaryCard from "@/components/OrderSummaryCard";
import { AuthContext } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import {
  Alert,
  AlertTitle,
  AlertDescription
} from "@/components/ui/alert";

const Cart = () => {

    const [cartItems, setCartItems] = useState([]);
    const { accessToken } = useContext(AuthContext);
    const { resetCart } = useCart();

    useEffect(() => {
        const fetchCart = async () => {
            if (!accessToken) {
                const localCart = JSON.parse(localStorage.getItem("cart")) || [];
                const detailedCart = await Promise.all(
                    localCart.map(async (item) => {
                        const res = await axiosInstance.get(`/products/${item.product_id}/`);
                        return {
                            product: res.data,
                            quantity: item.quantity
                        };
                    })
                );
                setCartItems(detailedCart);
            } else {
                const res = await axiosInstance.get("cart/");
                setCartItems(res.data);
            }
        };
        fetchCart();
        resetCart();
        // Eğer başka bir yerden tetiklenirse (örneğin login sonrası)
        const handleCartUpdate = () => fetchCart();
        window.addEventListener("cartUpdated", handleCartUpdate);
        return () => window.removeEventListener("cartUpdated", handleCartUpdate);

    }, [accessToken]);


    return (
        <div className="w-full flex justify-center">
            <div className="container mx-5 mt-10">
                <div className="flex md:flex-row justify-center flex-col gap-5">
                    <div className="md:w-[75%] w-[100%]">
                        <h2 className="text-xl font-semibold mb-4">Sepetim</h2>
                        {cartItems.length === 0 ? (
                            <Alert variant="default | destructive">
                                <AlertTitle>Burası boş</AlertTitle>
                                <AlertDescription>
                                    Henüz sepete ürün eklemediniz.
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <>
                                <ul className="space-y-5">
                                    {cartItems.map((item, index) => (
                                        <li key={item.id || item.product_id || index}>
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