import React from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import { useCart } from "@/hooks/useCart";

const OrderSummaryCard = ({ items }) => {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity,0);

  const KDV = total * 0.10;
  const finalTotal = total + KDV;

  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const axios = useAxios();
  const { setCartCount } = useCart();

  const handleCheckout = async () => {
    try {
      if (items.length === 0) {
        throw "sepette ürün yok";
      }
      if (!accessToken) {
        return navigate("/accounts/login", { state: { from: "/cart" } });
      }
      await axios.post("orders/"); 

      // Sepeti temizle
      setCartCount(0); // CartContext sıfırla
      localStorage.removeItem("cart"); // anonymous kullanıcı için local sepeti temizle
      window.dispatchEvent(new Event("cartUpdated")); // diğer component'lere bildir
      toast.success("Sipariş oluşturuldu!");
      navigate("/");
    } catch (err) {
      toast.error(err);
      console.error(err?.response?.data || err.message);
    }
  };

  return (
    <div className="border rounded p-5 shadow-sm/10 dark:shadow-md/50 bg-white dark:bg-zinc-900">
      <h3 className="text-lg font-semibold mb-4">Sipariş Özeti</h3>

      <div className="flex justify-between text-md mb-2">
        <span>Ürün Toplamı</span>
        <span>{total.toFixed(0)} ₺</span>
      </div>

      <div className="flex justify-between text-md mb-2">
        <span>KDV ( %10 )</span>
        <span>{KDV.toFixed(0)} ₺</span>
      </div>

      <div className="flex justify-between text-md mt-8">
        <span className="font-bold">Genel Toplam</span>
        <span>{finalTotal.toFixed(0)} ₺</span>
      </div>

      <div className="flex justify-end mt-5">
        <Button onClick={handleCheckout} className="cursor-pointer">
          <span>Sipariş ver</span>
        </Button>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
