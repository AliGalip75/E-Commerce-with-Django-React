import RegisterForm from "@/components/forms/RegisterForm";
import Logo from "@/components/Logo";

const RegisterPage = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center p-4 dark:text-white bg-gray-50 dark:bg-zinc-900">
      <Logo />
      <div className="w-full max-w-lg mt-10 p-8 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Kayıt Ol
        </h1>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
