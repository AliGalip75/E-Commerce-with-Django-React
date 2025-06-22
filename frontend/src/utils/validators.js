// ===== 1. utils/validators.js =====
// Extract validation logic
export const validators = {
  email: (email) => {
    if (!email) return "E-posta gereklidir";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Lütfen geçerli bir e-posta adresi girin (örn: kullanici@example.com)";
    }
    return null;
  },

  password: (password) => {
    if (!password) return "Şifre gereklidir";
    if (password.length < 8) return "Şifre en az 8 karakter olmalıdır";
    return null;
  },

  passwordConfirm: (password, confirmPassword) => {
    if (!confirmPassword) return "Şifre tekrarı gereklidir";
    if (password !== confirmPassword) return "Şifreler uyuşmuyor!";
    return null;
  },

  validateRegisterForm: (formData) => {
    const errors = {};
    
    const emailError = validators.email(formData.email);
    if (emailError) errors.email = emailError;
    
    const passwordError = validators.password(formData.password);
    if (passwordError) errors.password = passwordError;
    
    const confirmError = validators.passwordConfirm(formData.password, formData.password2);
    if (confirmError) errors.password2 = confirmError;
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
};