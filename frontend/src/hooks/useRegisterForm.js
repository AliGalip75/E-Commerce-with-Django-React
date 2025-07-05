{/**
  
  import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { validators } from '../utils/validators';
import { formatRegisterError } from '../utils/errorHandler';
import toast from 'react-hot-toast';

export const useRegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  // Formu verilerle birlikte gönder
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    const validation = validators.validateRegisterForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await toast.promise(
        authService.register({
          email: formData.email,
          password: formData.password
        }),
        {
          loading: "Kayıt olunuyor...",
          success: "Kayıt başarılı!",
          error: (err) => formatRegisterError(err)
        }
      );
      
      navigate("/accounts/login");
    } catch (error) {
      console.error("Register error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit
  };
};
  
  */}