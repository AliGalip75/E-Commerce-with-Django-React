import { Button } from "@/components/ui/button";
import useAxios from "@/hooks/useAxios";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import QuantityDisplay from "@/components/Quantity";
import toast from "react-hot-toast";

const CartItemCard = ({ item }) => {
  const axios = useAxios();
  const { accessToken } = useAuth();
  const { updateCartCount, incCartCount, decCartCount } = useCart();

  const updateQuantity = async (newQty, type) => {
    try {
      if (accessToken) {
        await axios.patch(`cart/${item.id}/`, { quantity: newQty });
      } else {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = localCart.map((i) =>
          i.product_id === item.product.id ? { ...i, quantity: newQty } : i
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }

      window.dispatchEvent(new Event("cartUpdated"));
      if (type==="inc") {
        incCartCount();
      } else {
        decCartCount();
      }

    } catch (error) {
      toast.error("Miktar güncellenemedi.");
    }
  };

  // Access'e göre sepetten veya localden item sil
  const deleteItem = async () => {
    try {
      if (accessToken) {
        await axios.delete(`cart/${item.id}/`);
      } else {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = localCart.filter(
          (i) => i.product_id !== item.product.id
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
      updateCartCount();
      toast.success(`${item.product.name} silindi.`);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      toast.error("Ürün silinemedi.");
    }
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
        <Button onClick={() => updateQuantity(item.quantity - 1, "dec")} className="cursor-pointer" disabled={item.quantity === 1}>-</Button>
        <QuantityDisplay quantity={item.quantity} />
        <Button onClick={() => updateQuantity(item.quantity + 1, "inc")} className="cursor-pointer">+</Button>
        <Button variant="destructive" onClick={deleteItem}  className="cursor-pointer dark:bg-red-500">Sil</Button>
      </div>
    </div>
  );
};


export default CartItemCard;