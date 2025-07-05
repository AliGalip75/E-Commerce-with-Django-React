import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useCart } from "@/hooks/useCart"; 
import { useAuth } from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import { motion } from "framer-motion"; 
import { useNavigate } from "react-router-dom";
import { SessionStorageManager } from "@/utils/sessionStorageManager";


const MotionCard = motion.create(Card);

const ProductCard = ({ product }) => {
  const axios = useAxios();
  const { incCartCount } = useCart();
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = async (productId) => {
    try {
      if (accessToken) {
        await axios.post("cart/", { product_id: productId });
      } else {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItemIndex = localCart.findIndex(item => item.product_id === productId);

        if (existingItemIndex !== -1) {
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

  {/* Ürünün detay sayfasına yönlendir */}
  const handleCardClick = () => {
    SessionStorageManager.setScrollPosition(window.scrollY);
    navigate(`/products/${product.id}/`);
  };

  return (
    <MotionCard 
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.01 }}
      viewport={{ once: true }}
      className="w-full max-w-sm rounded-2xl shadow-md bg-white hover:shadow-lg dark:bg-zinc-900 max-h-[500px] cursor-pointer"
    >
      {/* Ürün resmi */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-50 object-cover"
      />

      <CardContent className="p-4 space-y-1">
        {/* Kategori adı */}
        <p className="text-xs text-muted-foreground">
          {product.category?.name || "Kategori yok"}
        </p>

        {/* Ürün adı */}
        <h3 className="text-lg font-semibold truncate">{product.name}</h3>

        {/* Açıklama */}
        {product.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {product.description.length > 40
              ? product.description.substring(0, 40) + "..."
              : product.description}
          </p>
        )}

        {/* Fiyat */}
        <p className="text-base font-bold">{parseFloat(product.price).toFixed(2)} ₺</p>
      </CardContent>

      <CardFooter className="p-4">
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product.id);
            }}  
            className="w-full cursor-pointer"
          >
            Sepete Ekle
          </Button>
        </motion.div>
      </CardFooter>
    </MotionCard>
  );
};

export default ProductCard;