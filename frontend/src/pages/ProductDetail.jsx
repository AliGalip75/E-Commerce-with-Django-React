import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "@/api/AxiosInstance";
import { motion } from "framer-motion"; 

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get(`products/${id}/`)
      .then(res => {
        setProduct(res.data);
        setLoading(false); // veri geldikten sonra loading'i kapat
      })
      .catch(err => {
        console.error("Ürün verisi çekilemedi:", err);
        setLoading(false); // hata olsa bile loading'i kapat
      });
  }, [id]);


  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <motion.div
            className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      ) : (
        <div className="max-w-xl mx-auto p-4">
          <img src={product.image} alt={product.name} className="w-full mb-4" />
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-sm text-muted-foreground">{product.category?.name}</p>
          <p className="mt-2">{product.description}</p>
          <p className="mt-4 text-xl font-bold">{parseFloat(product.price).toFixed(2)} ₺</p>
        </div>
      )} 
    </>
  );
};

export default ProductDetail;
