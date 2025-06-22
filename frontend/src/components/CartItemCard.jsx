import { Button } from "@/components/ui/button";
import axiosInstance from "@/api/AxiosInstance";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import QuantityDisplay from "@/components/Quantity";
import { LocalStorageManager } from '@/utils/localStorageManager';

const CartItemCard = ({ item }) => {
  const { accessToken } = useAuth();
  const { updateCartCount } = useCart();

  const updateQuantity = async (newQty) => {
    if (accessToken) {
      await axiosInstance.patch(`cart/${item.id}/`, { quantity: newQty });
    } else {
      // localStorage update
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = localCart.map((i) =>
        i.product_id === item.product.id ? { ...i, quantity: newQty } : i
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    updateCartCount();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Access'e göre sepetten veya localden item sil
  const deleteItem = async () => {
    if (accessToken) {
      await axiosInstance.delete(`cart/${item.id}/`);
    } else {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = localCart.filter(
        (i) => i.product_id !== item.product.id
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    updateCartCount();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="flex justify-between items-center p-4 border rounded-md shadow-sm/10 dark:shadow-md/40 bg-white dark:bg-zinc-900">
      <div className="flex items-center gap-4">
        <img src={item.product.image} className="w-20 h-20 object-cover" />
        <div>
          <h3 className="font-semibold">{item.product.name}</h3>
          <p>{item.product.price} ₺</p>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <Button onClick={() => updateQuantity(item.quantity - 1)} className="cursor-pointer" disabled={item.quantity === 1}>-</Button>
        <QuantityDisplay quantity={item.quantity} />
        <Button onClick={() => updateQuantity(item.quantity + 1)} className="cursor-pointer">+</Button>
        <Button variant="destructive" onClick={deleteItem}  className="cursor-pointer dark:bg-red-500">Sil</Button>
      </div>
    </div>
  );
};


export default CartItemCard;