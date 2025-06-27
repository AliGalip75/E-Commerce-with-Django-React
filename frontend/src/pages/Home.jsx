// Home.jsx
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import HeroBanner from "../components/HeroBanner";
import CategoryScroller from "@/components/CategoryScroller";
import ProductCard from "@/components/ProductCard";
import { FaArrowLeft, FaArrowRight, FaArrowDown } from "react-icons/fa";
import axiosInstance from '@/api/AxiosInstance';
import { SessionStorageManager } from '@/utils/sessionStorageManager';
import { motion } from "framer-motion"; 


const Home = () => {
  const { loading: authLoading } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const [scrollPositionRestored, setScrollPositionRestored] = useState(false); // Önceki sayfanın scroll değerini sakla

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryRes, productRes] = await Promise.all([
          axiosInstance.get("categories/"),
          axiosInstance.get("products/populer/")
        ]);
        setCategories(categoryRes.data);
        setProducts(productRes.data);

      } catch (error) {
        console.error("Veri çekme hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useLayoutEffect(() => {
    if (!loading && products.length && !scrollPositionRestored) {
      const scrollPosition = SessionStorageManager.getScrollPosition();
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        SessionStorageManager.removeScrollPosition();
        setScrollPositionRestored(true);
      }
    }
  }, [loading, products, scrollPositionRestored]);



  const scrollToSection = () => {
    const element = document.getElementById("targetDiv");
    if (element) {
      const yOffset = -76; // Yukarıya 76px kaydır(navbar nedeniyle)
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };


  // Tıklanan butona göre kaydır
  const handleScroll = (direction) => {
    if (scrollRef.current) {
        const scrollContainer = scrollRef.current;
        // Ekran genişliğine göre kaydırma miktarı belirle
        let dynamicAmount = 250;
        const screenWidth = window.innerWidth;

        if (screenWidth < 640) {
            dynamicAmount = 150; // mobil
        } else if (screenWidth < 1024) {
            dynamicAmount = 200; // tablet
        } else {
            dynamicAmount = 400; // masaüstü
        }

        const delta = direction === 'left' ? -dynamicAmount : dynamicAmount;
        scrollContainer.scrollBy({ left: delta, behavior: 'smooth' });
    }
  };


  return (
    <>
      {authLoading || loading ? (
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
        <>
          <HeroBanner />
          <div className="flex justify-center relative mt-5 mx-5">
            <div className="flex items-center justify-between container">
              <div className="group">
                <button
                  onClick={() => handleScroll("left")}
                  className="rounded-full border-3 border-zinc-800 p-4 transform transition-all duration-300 group-hover:-translate-x-1.5 cursor-pointer"
                >
                  <FaArrowLeft className="size-5" />
                </button>
              </div>

              <CategoryScroller categories={categories} scrollRef={scrollRef} />

              <div className="group">
                <button
                  onClick={() => handleScroll("right")}
                  className="rounded-full border-3 border-zinc-800 bg-gray-100 dark:bg-zinc-900 p-4 transform transition-all duration-300 group-hover:translate-x-1.5 cursor-pointer"
                >
                  <FaArrowRight className="size-5" />
                </button>
              </div>
            </div>
          </div>

          <br />
          <div className="w-full h-[100px] flex justify-center items-center dark:text-white mt-5">
            <div
              onClick={scrollToSection}
              className="rounded-full border-3 animate-bounce border-zinc-800 bg-gray-100 dark:bg-zinc-900 p-4 cursor-pointer"
            >
              <FaArrowDown className="fill-current size-5" />
            </div>
          </div>

          <div id="targetDiv" className="flex flex-col">
            <h2 className="flex justify-center text-3xl pt-20">Popüler Ürünler</h2>
            <div className="flex justify-center flex-wrap pt-10">
              <div className="container flex justify-center flex-wrap gap-10">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );

};

export default Home;