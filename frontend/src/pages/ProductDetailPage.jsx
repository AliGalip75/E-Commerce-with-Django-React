import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import { motion } from "framer-motion"; 
import { Button } from "@/components/ui/button"; 
import toast from "react-hot-toast";
import { useCart } from "@/hooks/useCart"; 
import { useAuth } from "@/hooks/useAuth";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();
  const { incCartCount } = useCart();
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`products/${id}/`);
        setProduct(response.data);
      } catch (error) {
        console.error("Ürün çekilemedi.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = async (productId) => {
    try {
      if (accessToken) {
        await axios.post("cart/", { product_id: productId });
      } else {
        // LocalStorage fallback
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItemIndex = localCart.findIndex(item => item.product_id === productId);
        if (existingItemIndex > -1) {
          localCart[existingItemIndex].quantity += 1;
        } else {
          localCart.push({ product_id: productId, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(localCart));
      }

      incCartCount();
      toast.success("Sepete eklendi");
    } catch (error) {
      console.error("Sepete ekleme hatası", error);
      toast.error("Ürün sepete eklenemedi");
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center min-h-screen items-center py-10">
          <motion.div
            className="w-12 h-12 border-4 border-gray-300 border-t-zinc-950 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      ) : (
        <div className="w-full flex justify-center min-h-screen">
          <div className="container flex flex-col lg:flex-row max-w-4/5 gap-10 mt-10">
            {/* Sol taraf: ürün görseli */}
            <motion.div
              className="lg:w-3/5 lg:h-4/5 flex justify-center"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-xl rounded-2xl shadow-lg object-contain"
              />
            </motion.div>

            {/* Sağ taraf: ürün bilgisi */}
            <motion.div
              className="lg:w-1/2 space-y-4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-muted-foreground">{product.category?.name}</p>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
              
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {parseFloat(product.price).toFixed(2)} ₺
              </p>

              <p className="text-sm text-green-600 font-medium">
                {product.stock > 0 ? "Stokta mevcut ✅" : "Tükendi ❌"}
              </p>

              <div className="pt-4">
                <Button 
                  size="lg" 
                  className="w-full lg:w-auto"
                  onClick={() => handleAddToCart(product.id)}
                  disabled={product.stock <= 0}
                >
                  Sepete Ekle
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
