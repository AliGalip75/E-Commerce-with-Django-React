import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/api/AxiosInstance";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext"; 
import { AuthContext } from '../context/AuthContext';
import { useContext, useEffect } from "react";

const ProductCard = ({ product }) => {

  const { incrementCart, cartCount } = useCart(); // CartContext'ten fonksiyonu al
  const { accessToken } = useContext(AuthContext);

  const handleAddToCart = async (productId) => {
    try {
      if (accessToken) {
        // Giriş yapılmış → API'ye istek
        await axiosInstance.post("cart/", { product_id: productId });
      } else {
        // Giriş yapılmamış → localStorage kullan
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingItemIndex = localCart.findIndex(item => item.product_id === productId);

        if (existingItemIndex !== -1) {
          // Zaten varsa quantity artır
          localCart[existingItemIndex].quantity += 1;
        } else {
          // Yoksa yeni ekle
          localCart.push({ product_id: productId, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(localCart));
      }

      incrementCart(); // context'teki sepet sayacını artır
      toast.success("Ürün başarıyla sepete eklendi");
    } catch (error) {
      console.error("Sepete ekleme hatası", error);
      toast.error("Ürün sepete eklenemedi");
    }
  };

  return (
    <Card className="w-full max-w-sm rounded-2xl shadow-md bg-white transform transition-all duration-400 hover:-translate-y-1 hover:shadow-lg dark:bg-zinc-900">
      {/* Ürün resmi */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
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
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Fiyat */}
        <p className="text-base font-bold">{parseFloat(product.price).toFixed(2)} ₺</p>
      </CardContent>

      <CardFooter className="p-4">
        <Button onClick={() => handleAddToCart(product.id)} className="w-full cursor-pointer">Sepete Ekle</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
