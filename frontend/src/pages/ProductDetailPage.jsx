import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import { motion } from "framer-motion"; 


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`products/${id}/`);
        setProduct(response.data);
      } catch (error) {
        console.error("Ürün çekilemedi.", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

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
              ease: "linear"
            }}
          />
        </div>
      ) : (
        <div className="w-full flex justify-center h-dvh">
          <div className="container flex mt-10 ">
            <motion.div
              className="max-w-xl p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              >
                <img src={product.image} alt={product.name} className="w-full mb-4 rounded-xl" />
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <p className="text-sm text-muted-foreground">{product.category?.name}</p>
                <p className="mt-2">{product.description}</p>
                <p className="mt-4 text-xl font-bold">{parseFloat(product.price).toFixed(2)} ₺</p>
            </motion.div>
            <div className="bg-red-500 flex-1"></div>
          </div>
        </div>
      )} 
    </>
  );
};

export default ProductDetail;
