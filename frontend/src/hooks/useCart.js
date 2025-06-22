import { CartContext } from "@/contexts/CartContext";
import { useContext, useEffect } from "react";
import { fetchCartCount } from "@/utils/fetchCartCount";
import { LocalStorageManager } from "@/utils/localStorageManager";

export const useCart = () => {
    const { cartCount, setCartCount } = useContext(CartContext);

    const updateCartCount = async () => {
        const count = await fetchCartCount(LocalStorageManager.getAccessToken());
        setCartCount(count);
    };

    // Sayfa yenilenmediği sürece sadece başlangıçta çalışır.
    useEffect(() => {
        updateCartCount();
    }, []); 

    // Sepet ikonundaki sayıyı 1 artır
    const incCartCount = (qty = 1) => setCartCount(prev => prev + qty);

    return { cartCount, incCartCount, updateCartCount };
}