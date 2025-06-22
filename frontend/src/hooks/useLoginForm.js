import { useState } from 'react';
import { useAuth } from './useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { formatApiError } from '../utils/errorHandler';
import toast from 'react-hot-toast';

export const useLoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Email ve şifre gereklidir');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await toast.promise(
        login(formData.email, formData.password, () => {
          const redirectTo = location.state?.from || "/";
          navigate(redirectTo, { replace: true });
        }),
        {
          loading: "Giriş yapılıyor...",
          success: "Başarıyla giriş yapıldı!",
          error: (err) => formatApiError(err)
        }
      );

      if (!result.success) {
        // Additional error handling if needed
        console.error("Login failed:", result.error);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    handleInputChange,
    handleSubmit
  };
};