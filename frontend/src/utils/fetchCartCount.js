// Sepetteki ürün sayısı
export const fetchCartCount = async (axios, accessToken) => {
  try {
    if (accessToken) {
      // console.log("🛒 Sepet verisi çekiliyor...");
      const response = await axios.get("cart/");
      return response.data.reduce((sum, item) => sum + item.quantity, 0);
    } else {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      return localCart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    }
  } catch (err) {
    console.error("Sepet yüklenemedi", err);
    return 0;
  }
};