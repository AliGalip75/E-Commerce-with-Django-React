export const ProductService = {
  async getCategories(axios) {
    try {
      const res = await axios.get("categories/");
      return res.data; // artık veriyi döner
    } catch (error) {
      console.error("Kategori çekilemedi:", error);
      return null; // veya [] dönebilirsin
    }
  },

  async getProducts(axios, { category = null, search = "" } = {}) {
    try {
      const params = {};

      if (category) {
        params.category = category;
      }
      if (search) {
        params.search = search;
      }

      const res = await axios.get("products/", { params });
      return res.data.results;
    } catch (error) {
      console.error("Ürünler çekilemedi:", error);
      return [];
    }
  },
};
