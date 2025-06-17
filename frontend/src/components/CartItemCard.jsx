import React from "react";

const CartItemCard = ({ item }) => {
  const { product, quantity } = item;

  return (
    <div className="flex items-center border rounded p-4 shadow-sm gap-5">
      {/* Ürün görseli */}
      <img
        src={product.image || "/placeholder.jpg"}
        alt={product.name}
        className="w-20 h-20 object-cover rounded"
      />

      {/* Ürün bilgileri */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-base font-medium">{product.name}</h3>
        <p className="text-sm text-gray-500">{parseFloat(product.price).toFixed(2)} ₺</p>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">Adet: {quantity}</p>
      </div>
    </div>
  );
};

export default CartItemCard;