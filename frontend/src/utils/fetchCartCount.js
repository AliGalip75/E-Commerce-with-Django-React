import axiosInstance from '@/api/AxiosInstance';

export const fetchCartCount = async (accessToken) => {
  try {
    if (accessToken) {
      const res = await axiosInstance.get("cart/");
      return res.data.reduce((sum, item) => sum + item.quantity, 0);
    } else {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      return localCart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    }
  } catch (err) {
    console.error("Sepet yüklenemedi", err);
    return 0;
  }
};
