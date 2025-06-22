import axiosInstance from "@/api/AxiosInstance";

export const mergeLocalCartToBackend = async () => {
  const localCart = JSON.parse(localStorage.getItem("cart")) || [];

  for (const item of localCart) {
    try {
      const response = await axiosInstance.post("cart/", {
        product_id: item.product_id,
        quantity: item.quantity,
      });
      console.log("Merged item:", item.product_id, "→ response:", response.data);
    } catch (err) {
      console.error("Sepet merge hatası:", err);
    }
  }

  localStorage.removeItem("cart");
  // Sepet değiştiğini bildir
  window.dispatchEvent(new Event("cartUpdated"));
};
