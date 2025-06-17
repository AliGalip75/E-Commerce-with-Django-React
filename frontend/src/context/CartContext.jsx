import { createContext, useEffect, useContext, useState } from "react";
import axiosInstance from "@/api/AxiosInstance";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  
  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get("cart/");
      const total = res.data.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    } catch (err) {
      console.error("Sepet yüklenemedi", err);
    }
  };

  const incrementCart = (qty = 1) => setCartCount(prev => prev + qty);
  const resetCart = () => fetchCart();

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, incrementCart, resetCart }}>
      {children}
    </CartContext.Provider>
  );
};