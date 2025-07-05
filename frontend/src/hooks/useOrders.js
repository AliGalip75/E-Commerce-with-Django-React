import { useState, useEffect } from "react";
import useAxios from "@/hooks/useAxios";

export const useOrders = (enabled = true) => {
  const axios = useAxios();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!enabled) return;

    const fetchOrders = async () => {
      try {
        const response = await axios.get("/orders/");
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
