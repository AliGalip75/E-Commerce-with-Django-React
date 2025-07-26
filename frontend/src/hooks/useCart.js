import { CartContext } from "@/contexts/CartContext";
import { useContext } from "react";

export const useCart = () => {
  const { cartCount, setCartCount } = useContext(CartContext);
  const incCartCount = (qty = 1) => setCartCount(prev => prev + qty);
  const decCartCount = (qty = 1) => setCartCount(prev => prev - qty);
  const updateCartCount = (count) => setCartCount(count);

  return { cartCount, setCartCount, incCartCount, decCartCount, updateCartCount };
};