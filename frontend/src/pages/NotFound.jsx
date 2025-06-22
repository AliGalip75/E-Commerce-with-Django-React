import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white px-4">
      <h1 className="text-7xl font-extrabold">404</h1>
      <p className="mt-4 text-2xl font-semibold">Sayfa Bulunamadı</p>
      <p className="mt-2 text-center text-zinc-500 dark:text-zinc-400">
        Aradığınız sayfa mevcut değil ya da taşınmış olabilir.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 rounded-2xl bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 font-medium hover:scale-105 transition"
      >
        Anasayfaya Dön
      </Link>
    </div>
  );
};

export default NotFound;
