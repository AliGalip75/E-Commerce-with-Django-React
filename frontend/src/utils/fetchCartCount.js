// Sepetteki ürün sayısı
export const fetchCartCount = async (axios, accessToken) => {
  try {
    if (accessToken) {
      const response = await axios.get("cart/");
      return Number(response.data.reduce((sum, item) => sum + item.quantity, 0));
    } else {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      return Number(localCart.reduce((sum, item) => sum + (item.quantity || 1), 0));
    }
  } catch (err) {
    console.error("Sepet yüklenemedi", err);
    return 0;
  }
};