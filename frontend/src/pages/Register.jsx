import Logo from '../components/Logo';
import RegisterForm from '../components/forms/RegisterForm';
import { useRegisterForm } from '../hooks/useRegisterForm';

const Register = () => {
  const { 
    formData, 
    errors, 
    isSubmitting, 
    handleInputChange, 
    handleSubmit 
  } = useRegisterForm();

  return (
    <div className="flex flex-col h-full dark:text-gray-300">
      <div className="h-[30%] flex justify-center items-end mt-5">
        <Logo />
      </div>
      
      <div className="h-[70%] flex justify-center items-center mb-5">
        <RegisterForm
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Register;