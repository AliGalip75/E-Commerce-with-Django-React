export const mergeLocalCartToBackend = async (axios) => {
  const localCart = JSON.parse(localStorage.getItem("cart")) || [];

  for (const item of localCart) {
    try {
      await axios.post("cart/", {
        product_id: item.product_id,
        quantity: item.quantity,
      });
      console.log("merge başarılı");
    } catch (err) {
      console.error("Sepet merge hatası:", err);
    }
  }

  localStorage.removeItem("cart");
  window.dispatchEvent(new Event("cartUpdated"));
};

