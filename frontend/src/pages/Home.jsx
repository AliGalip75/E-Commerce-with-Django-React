// src/components/Home.jsx (Örnek)
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext'; // AuthContext'i import edin
import { toast } from 'react-hot-toast';
import axiosInstance from '@/api/AxiosInstance';
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import HeroBanner from "../components/HeroBanner";
import ProductCard from "../components/ProductCard";

const Home = () => {
    const { user, loading } = useContext(AuthContext); // user, loading ve logout'u alın
    const [products, setProducts] = useState([]);

    if (loading) {
        return <div>Yükleniyor...</div>; // Kullanıcı bilgileri yüklenirken bir yükleme göstergesi
    }

    if (!user) {
        // Kullanıcı bilgisi yoksa (örneğin oturum açılmamışsa) login sayfasına yönlendirilebilir
        // veya bir mesaj gösterilebilir.
        return <div>Oturum açmadınız. Lütfen giriş yapın.</div>;
    }

    const handle = () => {
        toast.success("Ürünler Listelendi", {
                style: {
                    padding: '25px',
                    boxShadow: "0 4px 10px 5px rgba(0, 0, 0, 0.15)",
                    border: "1px solid #ddd",
                    fontWeight: "600",
                },
            });

        axiosInstance.get("products/")
        .then(res => {
            setProducts(res.data);
        })
        .catch(err => {
            console.error("Ürünler alınamadı:", err);
        });
    }

    return (
        <>
            <HeroBanner />
            <div className="flex min-w-[100%] justify-center mt-5">
                <Button onClick={handle} className="dark:bg-whitef">Ürünleri Getir</Button>
            </div>
            <div className="flex justify-center mt-5">
                <div className="container">
                    

                    <div className="flex gap-5 flex-wrap justify-center">
                        {products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                    
                    </div>
                    
                </div>
            </div>
            
        </>
        
    );
};

export default Home;