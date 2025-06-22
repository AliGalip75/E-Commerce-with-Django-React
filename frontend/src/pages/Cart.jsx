import React, { useEffect, useState} from 'react';
import axiosInstance from '@/api/AxiosInstance';
import CartItemCard from "@/components/CartItemCard";
import OrderSummaryCard from "@/components/OrderSummaryCard";
import { useAuth } from "@/hooks/useAuth";
import {
  Alert,
  AlertTitle,
  AlertDescription
} from "@/components/ui/alert";
import { LocalStorageManager } from '@/utils/localStorageManager';

const Cart = () => {

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const accessToken = LocalStorageManager.getAccessToken();
    
    useEffect(() => {
        const fetchCart = async () => {
            try {
                if (!accessToken) {
                    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
                    // Local'deki ID'li ürün listesini gerçek ürün listesine çevir
                    const detailedCart = await Promise.all(
                        localCart.map(async (item) => {
                            const response = await axiosInstance.get(`/products/${item.product_id}/`);
                            return {
                                product: response.data,
                                quantity: item.quantity
                            };
                        })
                    );
                    setCartItems(detailedCart);
                } else {
                    const response = await axiosInstance.get("cart/");
                    
                    setCartItems(response.data);
                }
            } catch (error) {
                console.error("Sepet verisi alınamadı", error);
            }    
            setLoading(false);
        };
        fetchCart();
        // Eğer Login gerçekleşirse merge işleminden sonra sepeti güncelleyen event 
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
                            <div className="animate-pulse text-md text-gray-400">Sepet yükleniyor...</div>
                        ) : cartItems.length === 0 ? (
                            <Alert variant="default">
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