import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';

const RegisterForm = ({ 
  formData, 
  errors,
  isSubmitting, 
  onInputChange, 
  onSubmit 
}) => {
  return (
    <div className="min-w-md min-h-10/15 p-6 border-2 border-gray-200 rounded-lg shadow-md bg-white dark:bg-zinc-900 dark:text-white">
      <h2 className="text-2xl font-semibold text-center mb-6 dark:text-gray-200">
        Kayıt Ol
      </h2>
      
      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        <EmailField 
          value={formData.email}
          error={errors.email}
          onChange={(value) => onInputChange('email', value)}
          disabled={isSubmitting}
        />
        
        <PasswordField 
          value={formData.password}
          error={errors.password}
          onChange={(value) => onInputChange('password', value)}
          disabled={isSubmitting}
        />
        
        <PasswordConfirmField 
          value={formData.password2}
          error={errors.password2}
          onChange={(value) => onInputChange('password2', value)}
          disabled={isSubmitting}
        />
        
        <SubmitButton isSubmitting={isSubmitting} />
      </form>
      
      <LoginLink />
    </div>
  );
};

// Form field components
const EmailField = ({ value, error, onChange, disabled }) => (
  <div className="mb-5">
    <label htmlFor="email" className="block text-sm font-medium mb-1">
      E-posta
    </label>
    <Input
      type="email"
      id="email"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
    />
    {error && (
      <p className="mt-1 text-sm text-red-600">{error}</p>
    )}
  </div>
);

const PasswordField = ({ value, error, onChange, disabled }) => (
  <div className="mb-5">
    <label htmlFor="password" className="block text-sm font-medium mb-1">
      Şifre
    </label>
    <Input
      type="password"
      id="password"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
    />
    {error && (
      <p className="mt-1 text-sm text-red-600">{error}</p>
    )}
  </div>
);

const PasswordConfirmField = ({ value, error, onChange, disabled }) => (
  <div className="mb-5">
    <label htmlFor="password2" className="block text-sm font-medium mb-1">
      Şifre Tekrar
    </label>
    <Input
      type="password"
      id="password2"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
    />
    {error && (
      <p className="mt-1 text-sm text-red-600">{error}</p>
    )}
  </div>
);

const SubmitButton = ({ isSubmitting }) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className="w-full bg-zinc-800 outline-1 text-white py-2 rounded hover:bg-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed flex flex-row justify-center items-center group h-[45px]"
  >
    <div className="flex h-full">
      <h1 className="me-1 flex items-center h-full">
        {isSubmitting ? 'Kayıt olunuyor...' : 'Kayıt ol'}
      </h1>
      {!isSubmitting && (
        <div className="transform transition-all duration-300 group-hover:translate-x-1.5 h-full flex items-center">
          <svg 
            className="size-4 fill-current" 
            xmlns="http://www.w3.org/2000/svg" 
            height="20px" 
            viewBox="0 -960 960 960" 
            width="20px"
          >
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/>
          </svg>
        </div>
      )}
    </div>
  </button>
);

const LoginLink = () => (
  <p className="text-center mt-4 text-sm dark:text-gray-200 text-gray-900">
    Zaten hesabın var mı?{' '}
    <Link to="/accounts/login" className="text-blue-600 hover:underline">
      Giriş yap
    </Link>
  </p>
);

export default RegisterForm;