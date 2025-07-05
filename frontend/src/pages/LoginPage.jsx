import AuthForm from "@/components/forms/AuthForm";
import Logo from "@/components/Logo"; // Varsa logonu koruyabilirsin

const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center p-4 dark:text-white">
      <Logo />
      <div className="w-full max-w-sm mt-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Giriş Yap</h1>
        <AuthForm />
      </div>
    </div>
  );
};

export default LoginPage;