import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { authService } from '../services/authService';
import { mergeLocalCartToBackend } from '@/utils/mergeLocalCartToBackend';
import toast from 'react-hot-toast';
import { LocalStorageManager } from '@/utils/localStorageManager';
import { useCart } from '@/hooks/useCart';

export const useAuth = () => {
  const navigate = useNavigate();
  const { user, setUser, accessToken, setAccessToken, setLoading, loading} = useContext(AuthContext);
  const { cartCount, updateCartCount } = useCart();


  const login = async (email, password, redirectCallback) => {
    try {
      setLoading(true);
      const data = await authService.login(email, password);
      LocalStorageManager.setAccessToken(data.access);
      setAccessToken(data.access);
      
      // Merge cart after successful login
      await mergeLocalCartToBackend();
      window.dispatchEvent(new Event("cartUpdated"));
      updateCartCount();
      
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
        authService.logout(),
        {
          loading: "Çıkış yapılıyor...",
          success: (response) => response.message || "Çıkış başarılı",
          error: "Çıkış sırasında bir hata oluştu"
        },
      );
      
      LocalStorageManager.removeAccessToken();
      setAccessToken(null);
      setUser(null);

      navigate("/accounts/login/");

    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const userData = await authService.getProfile();
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
    isLoading: loading,
    accessToken,
    setAccessToken
  };
};
