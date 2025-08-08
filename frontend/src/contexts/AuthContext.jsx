import { createContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Context oluşturuluyor. Bu, uygulamanın genelinde kullanılacak state'leri ve fonksiyonları tutar.
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // --- STATE YÖNETİMİ ---
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [profile, setProfile] = useState({});
  const API_BASE_URL = 'http://localhost:8000/api/';

  // Token yenileme işlemini iptal etmek için bir referans tutuluyor.
  const timeoutRef = useRef(null);

  // --- FONKSİYONEL İŞLEMLER ---
  // Access Token'ı yenileme ve süre dolmadan tekrar yenileme zamanlayıcısını kurma
  const refreshAccessToken = async () => {
    try {
      setLoading(true);
      setIsReady(false);
      const response = await axios.post(
        `${API_BASE_URL}accounts/token/refresh/`,
        {},
        { withCredentials: true }
      );
      const newAccess = response.data.access;
      setAccessToken(newAccess);

      const decoded = jwtDecode(newAccess);
      const exp = decoded.exp * 1000; // Son kullanma tarihi milisaniye cinsine çevrilir.
      const now = Date.now();
      const delay = exp - now - 60 * 1000; // 1 dakika öncesinde yenilemek için gecikme hesaplanır.

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (delay > 0) {
        timeoutRef.current = setTimeout(refreshAccessToken, delay);
      } else {
        refreshAccessToken(); // Çok yakınsa hemen yenile.
      }

      return true;
    } catch (e) {
      console.error("Token yenileme başarısız:", e);
      // Hata durumunda state'ler temizlenir ve zamanlayıcı iptal edilir.
      setAccessToken(null);
      setUser(null);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return false;
    } finally {
      setLoading(false);
      setIsReady(true);
    }
  };

  // --- YAŞAM DÖNGÜSÜ YÖNETİMİ (useEffect) ---
  // Komponent ilk render edildiğinde token yenileme işlemini başlatır.
  useEffect(() => {
    refreshAccessToken();

    // Komponent unmount edildiğinde zamanlayıcıyı temizler.
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // --- CONTEXT DEĞERİNİ SAĞLAMA ---
  // Tüm state'ler ve fonksiyonlar `value` prop'u üzerinden alt bileşenlere sağlanır.
  return (
    <AuthContext.Provider value={{
      accessToken,
      setAccessToken,
      user,
      setUser,
      profile,
      setProfile,
      loading,
      setLoading,
      isReady,
      setIsReady
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;