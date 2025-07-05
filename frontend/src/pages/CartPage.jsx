import React, { useContext, useEffect, useState } from 'react';
import useAxios from "@/hooks/useAxios";
import CartItemCard from "@/components/CartItemCard";
import OrderSummaryCard from "@/components/OrderSummaryCard";
import { motion } from "framer-motion"; 
import {
  Alert,
  AlertTitle,
  AlertDescription
} from "@/components/ui/alert";
import { AuthContext } from '@/contexts/AuthContext';


const Cart = () => {
    const axios = useAxios();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { accessToken } = useContext(AuthContext);
    
    useEffect(() => {
        const fetchCart = async () => {
            try {
                if (!accessToken) {
                    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
                    const detailedCart = await Promise.all(
                        localCart.map(async (item) => {
                            const response = await axios.get(`/products/${item.product_id}/`);
                            return {
                                product: response.data,
                                quantity: item.quantity
                            };
                        })
                    );
                    setCartItems(detailedCart);
                } else {
                    const response = await axios.get("cart/");
                    setCartItems(response.data);
                }
            } catch (error) {
                console.error("Sepet verisi alınamadı", error);
            } finally {
                setLoading(false);
            }    
        };
        fetchCart();
        
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
                        
                        {loading ? (
                            <div className="flex justify-center items-center py-10">
                                <motion.div
                                    className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                />
                            </div>
                        ) : cartItems.length === 0 ? (
                            <Alert className="dark:bg-zinc-800 bg-white">
                                <AlertTitle>Burası boş</AlertTitle>
                                <AlertDescription>
                                Henüz sepete ürün eklemediniz.
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <ul className="space-y-5">
                                {cartItems.map((item) => {
                                    const key = accessToken ? item.id : item.product.id;
                                    return (
                                        <li key={key}>
                                            <CartItemCard item={item} />
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                    <div className="md:w-[40%] w-[100%]">
                        <div className="w-full md:h-full h-[250px]">
                            <OrderSummaryCard items={cartItems} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;