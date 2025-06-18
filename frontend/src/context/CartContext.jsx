import { createContext, useEffect, useContext, useState } from "react";
import axiosInstance from "@/api/AxiosInstance";
import { AuthContext } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const { accessToken } = useContext(AuthContext);
  
  // Sepetteki veya localStorage'daki ürünlerin sayısını set et
  const fetchCartCount = async () => {
    try {
      if (accessToken) {
        // Giriş yapılmış → backend'den sepeti çek
        const res = await axiosInstance.get("cart/");
        const total = res.data.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(total);
      } else {
        // Giriş yapılmamış → localStorage'dan oku
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        const total = localCart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        setCartCount(total);
      }
    } catch (err) {
      console.error("Sepet yüklenemedi", err);
    }
  };

  // Sepet sayacını 1 artır
  const incrementCart = (qty = 1) => setCartCount(prev => prev + qty);
  // Güncel sepet sayısını çek
  const resetCart = () => fetchCartCount();

  useEffect(() => {
    fetchCartCount();
    // Merge sonrası güncelleme
    const handleCartUpdate = () => fetchCartCount();
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, [accessToken]);

  return (
    <CartContext.Provider value={{ cartCount, incrementCart, resetCart}}>
      {children}
    </CartContext.Provider>
  );
};