import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import useAxios from "@/hooks/useAxios";
import HeroBanner from "@/components/HeroBanner";
import CategoryScroller from "@/components/CategoryScroller";
import ProductCard from "@/components/ProductCard";
import { SessionStorageManager } from '@/utils/sessionStorageManager';
import { motion } from "framer-motion"; 
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { useAuth } from '@/hooks/useAuth';
import ShinyText from '@/components/ShinyText';
import LogoLoop from '@/components/LogoLoop';
import { SiReact, SiTailwindcss } from 'react-icons/si';
import { BiLogoDjango } from "react-icons/bi";
import { FaJs } from "react-icons/fa";
import { SiShadcnui } from "react-icons/si";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const axios = useAxios();
  const [products, setProducts] = useState([]);
  const { loading, setLoading, isReady, accessToken }  = useAuth();
  const scrollRef = useRef(null);
  const [scrollPositionRestored, setScrollPositionRestored] = useState(false); // Önceki sayfanın scroll değerini sakla
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <BiLogoDjango />, title: "Django", href:"https://www.djangoproject.com/"},
    { node: <FaJs />, title: "Javascript", href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript"},
    { node: <SiShadcnui />, title: "Shadcn", href:"https://ui.shadcn.com/"},
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        // Refresh işlemi ile token yenileme bitmeden veri çekmeye çalışmasın diye
        if (!isReady) {
          return
        }
        setLoading(true);
        const [categoryRes, productRes] = await Promise.all([
          axios.get("categories/"),
          axios.get("products/populer/")
        ]);
        setCategories(categoryRes.data);
        setProducts(productRes.data);

        console.log("categoryRes:", categoryRes.data);
        console.log("productRes:", productRes.data);

      } catch (error) {
        console.error("Veri çekme hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isReady && !initialLoadDone) {
      fetchData();
      setInitialLoadDone(true);
    }
  }, [isReady, initialLoadDone, accessToken]);

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
        <>
          <HeroBanner />

          <br />

          <div className="my-10" style={{ height: '80px', position: 'relative', overflow: 'hidden'}}>
            <LogoLoop
              logos={techLogos}
              speed={100}
              direction="right"
              logoHeight={50}
              gap={100}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="zinc-50"
              ariaLabel="Technology partners"
            />
          </div>

          <div className="flex justify-center relative mx-5">
            <div className="flex items-center justify-between container">

              {/* Sol kategori butonu */}
              <div className="group">
                <button
                  onClick={() => handleScroll("left")}
                  className="transform transition-all duration-300 group-hover:-translate-x-1.5 cursor-pointer"
                >
                  <SlArrowLeft className="size-7 mt-2"/>
                </button>
              </div>

              <CategoryScroller categories={categories} scrollRef={scrollRef} />

              {/* Sağ kategori butonu */}
              <div className="group">
                <button
                  onClick={() => handleScroll("right")}
                  className="transform transition-all duration-300 group-hover:translate-x-1.5 cursor-pointer"
                >
                  <SlArrowRight className="size-7 mt-2"/>
                </button>
              </div>

            </div>
          </div>

          <br />
          
          <div id="targetDiv" className="flex flex-col">
            <div className="flex justify-center">
              <ShinyText
                text="Popüler Ürünler"
                speed={3}
                disabled={false}
                className="text-3xl"
              />
            </div> 
            
            <div className="flex justify-center flex-wrap pt-10 mb-10">
              <div className="container flex justify-center flex-wrap gap-10">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product}/>
                ))}
              </div>
            </div>
          </div>
          
        </>
      )}
    </>
  );

};

export default HomePage;