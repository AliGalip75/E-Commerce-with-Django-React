import { CartContext } from "@/contexts/CartContext";
import { useContext } from "react";


export const useCart = () => {

  const { cartCount, setCartCount, cartItems, setCartItems } = useContext(CartContext);
  const incCartCount = (qty = 1) => setCartCount(prev => prev + qty);
  const decCartCount = (qty = 1) => setCartCount(prev => prev - qty);
  const updateCartCount = (count) => setCartCount(count);

  return { cartCount, setCartCount, cartItems, setCartItems, incCartCount, decCartCount, updateCartCount };
};