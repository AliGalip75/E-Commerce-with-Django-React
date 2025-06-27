import { useState, useEffect } from "react";
import axiosInstance from "@/api/AxiosInstance"; // ya da fetch kullanıyorsan ona göre

export const useOrders = (enabled = true) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!enabled) return;

    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/orders/");
        setOrders(response.data);
      } catch (error) {
        console.error("Siparişler alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [enabled]);

  return { orders, loading };
};
