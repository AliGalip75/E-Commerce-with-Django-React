import Logo from '../components/Logo';
import LoginForm from '../components/forms/LoginForm';
import { useLoginForm } from '../hooks/useLoginForm';

const Login = () => {
  const { formData, isSubmitting, handleInputChange, handleSubmit } = useLoginForm();

  return (
    <div className="flex flex-col h-full dark:text-gray-300">
      <div className="h-[30%] flex justify-center items-end mt-5">
        <Logo />
      </div>
      
      <div className="h-[70%] flex justify-center items-center mb-5">
        <LoginForm
          formData={formData}
          isSubmitting={isSubmitting}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Login;