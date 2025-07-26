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
  const { user, setUser, accessToken, profile, setProfile, setAccessToken, setLoading, loading} = useContext(AuthContext);


  const login = async (email, password, redirectCallback) => {
    try {
      setLoading(true);

      const data = await AuthService.login(axios, email, password);
      setAccessToken(data.access);

      axios.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
      
      // Sepet birleştirme
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

  const logout = async () => {
    try {
      await toast.promise(
        AuthService.logout(axios),
        {
          loading: "Çıkış yapılıyor...",
          success: (response) => response.message || "Çıkış başarılı",
          error: "Çıkış sırasında bir hata oluştu"
        },
      );
      
      // Frontend belleğini temizle
      setAccessToken(null);
      setUser(null);

      navigate("/accounts/login/");
    } catch (error) {
      console.error("Hata:", error);
    }
  };

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

  return { 
    user,
    login,
    logout,
    fetchUserProfile,
    isAuthenticated: !!user,
    loading,
    profile,
    setProfile,
    accessToken,
    setAccessToken
  };
};
