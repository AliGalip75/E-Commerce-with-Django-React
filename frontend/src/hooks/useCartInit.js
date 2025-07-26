import { useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import useAxios from "@/hooks/useAxios";
import { useAuth } from "@/hooks/useAuth";
import { fetchCartCount } from "@/utils/fetchCartCount";

export const useCartInit = () => {
  const { updateCartCount } = useCart();
  const { accessToken } = useAuth();
  const axios = useAxios();

  // sadece ilk render'da çalışıri event listener ile tetiklenebilir.
  useEffect(() => {
    const fetchAndSetCartCount = async () => {
      const count = await fetchCartCount(axios, accessToken);
      updateCartCount(count);
    };
    fetchAndSetCartCount();

    const handleCartUpdated = () => {
      fetchAndSetCartCount();
    };

    window.addEventListener("cartUpdated", handleCartUpdated);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdated);
    };
  }, [accessToken]);
};