// useAuth.js
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { AuthService } from '../services/authService';
import { mergeLocalCartToBackend } from '@/utils/mergeLocalCartToBackend';
import toast from 'react-hot-toast';
import useAxios from "@/hooks/useAxios";


export const useAuth = () => {
  const axios = useAxios();
  const navigate = useNavigate();

  const { user, setUser, accessToken, profile, setProfile, setAccessToken, setLoading, loading, isReady, setIsReady} = useContext(AuthContext);

  // Kullanıcı girişi fonksiyonu
  const login = async (email, password, redirectCallback) => {
    try {
      setLoading(true);

      const data = await AuthService.login(axios, email, password);
      setAccessToken(data.access);

      // Axios instance'ına Authorization header eklenir.
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
      
      await mergeLocalCartToBackend(axios);
      window.dispatchEvent(new Event("cartUpdated"));
      
      if (redirectCallback) redirectCallback();
      
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Kullanıcı çıkışı fonksiyonu
  const logout = async () => {
    try {
      await toast.promise(AuthService.logout(axios), {
        loading: "Çıkış yapılıyor...",
        success: (response) => response.message || "Çıkış başarılı",
        error: "Çıkış sırasında bir hata oluştu"
      });
      
      // Frontend state'leri temizlenir.
      setAccessToken(null);
      setUser(null);

      navigate("/accounts/login/");
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  // Kullanıcı profili bilgilerini çekme fonksiyonu
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const userData = await AuthService.getProfile(axios);
      setUser(userData);
      return userData;
    } catch (error) {
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Profil güncelleme fonksiyonu
  const updateUserProfile = async (userData) => {
    setLoading(true);
    try {
      const updatedProfile = await AuthService.updateProfile(axios, userData, accessToken);
      setProfile(updatedProfile);
      setUser(updatedProfile);
      toast.success("Profil başarıyla güncellendi");
      return true;
    } catch (e) {
      console.error("Profil güncelleme başarısız:", e.response?.data || e.message);
      toast.error("Profil güncellenirken bir hata oluştu: " + (e.response && e.response.data ? JSON.stringify(e.response.data) : e.message));
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Bileşenlerin kullanabileceği değerler ve fonksiyonlar döndürülür.
  return { 
    user,
    login,
    logout,
    fetchUserProfile,
    updateUserProfile,
    loading,
    setLoading,
    isReady,
    setIsReady,
    profile,
    setProfile,
    accessToken,
    setAccessToken
  };
};