import { createContext, useState, useMemo, useEffect } from "react";
import useAxios from "@/hooks/useAxios";
import { useAuth } from "@/hooks/useAuth";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const { accessToken } = useAuth();
  const axios = useAxios();

  // ilk yüklemede sepeti getir
  useEffect(() => {
    const loadCart = async () => {
      if (accessToken) {
        const res = await axios.get("cart/");
        setCartItems(res.data);
        setCartCount(res.data.reduce((sum, i) => sum + i.quantity, cartCount));
        console.log(cartCount)
      } else {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(localCart);
        setCartCount(localCart.reduce((sum, i) => sum + (i.quantity || 1), 0));
      }
    };
    loadCart();
  }, [accessToken]);

  const value = useMemo(
    () => ({ cartCount, setCartCount, cartItems, setCartItems }),
    [cartCount, cartItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};