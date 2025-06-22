import axiosInstance from "@/api/AxiosInstance";

export const mergeLocalCartToBackend = async () => {
  const localCart = JSON.parse(localStorage.getItem("cart")) || [];

  for (const item of localCart) {
    try {
      await axiosInstance.post("cart/", {
        product_id: item.product_id,
        quantity: item.quantity,
      });
    } catch (err) {
      console.error("Sepet merge hatası:", err);
    }
  }

  localStorage.removeItem("cart");
  // Sepet değiştiğini bildir
  window.dispatchEvent(new Event("cartUpdated"));
};
