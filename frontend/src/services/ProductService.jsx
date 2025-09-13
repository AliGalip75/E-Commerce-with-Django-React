export const ProductService = {
  async getCategories(axios) {
    try {
      const res = await axios.get("categories/");
      return res.data; // artık veriyi döner
    } catch (error) {
      console.error("Kategori çekilemedi:", error);
      return null; // veya [] dönebilirsin
    }
  }
};
