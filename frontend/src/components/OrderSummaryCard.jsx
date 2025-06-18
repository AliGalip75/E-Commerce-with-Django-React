import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axiosInstance from "@/api/AxiosInstance";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';


const OrderSummaryCard = ({ items }) => {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const navigate = useNavigate();
  const { resetCart } = useCart();
  const { accessToken } = useContext(AuthContext);
  const KDV = total * 0.10;
  const finalTotal = total + KDV;

  const handleCheckout = async () => {
    try {
      if (!accessToken) {
        return navigate("/accounts/login", { state: { from: "/cart" } });
      }
      await axiosInstance.post("orders/"); // backend sepetten alıyor
      toast.success("Sipariş oluşturuldu!");
      resetCart();
      navigate("/");
    } catch (err) {
      toast.error("Sipariş oluşturulamadı!");
      console.log(err.response.data)
    }
  };

  return (
    <div className="border rounded p-5 shadow-sm bg-gray-50 dark:bg-zinc-900">
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

}
export default OrderSummaryCard;