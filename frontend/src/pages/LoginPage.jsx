import AuthForm from "@/components/forms/AuthForm";
import Logo from "@/components/Logo"; // Varsa logonu koruyabilirsin

const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center p-4 dark:text-white bg-gray-50 dark:bg-zinc-900"> {/* Arka plan ekledik */}
      <Logo />

      <div className="w-full max-w-lg mt-10 p-8 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"> {/* Kart stili burada! */}
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white"> {/* Başlık rengi ve alt boşluk */}
          Giriş Yap
        </h1>
        <AuthForm />
      </div>

      {/* İstersen buraya küçük bir footer veya kayıt olma linki ekleyebilirsin */}
      {/* <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Hesabın yok mu? <a href="/signup" className="text-blue-600 hover:underline">Kaydol</a>
      </div> */}
    </div>
  );
};


export default LoginPage;