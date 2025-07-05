import { CartContext } from "@/contexts/CartContext";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect } from "react";
import { fetchCartCount } from "@/utils/fetchCartCount";
import useAxios from "@/hooks/useAxios";

export const useCart = () => {
    const { cartCount, setCartCount } = useContext(CartContext);
    const { accessToken } = useContext(AuthContext);
    const axios = useAxios();

    const updateCartCount = async () => {
        const count = await fetchCartCount(axios, accessToken);   
        setCartCount(count);
    };

    // Sayfa yenilenmediği sürece sadece başlangıçta çalışır.
    useEffect(() => {
        updateCartCount();
    }, [accessToken]); 

    // Sepet ikonundaki sayıyı 1 artır
    const incCartCount = (qty = 1) => setCartCount(prev => prev + qty);

    return { cartCount, incCartCount, updateCartCount };
}