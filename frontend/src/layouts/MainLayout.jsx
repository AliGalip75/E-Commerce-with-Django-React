import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { LiaCartArrowDownSolid } from "react-icons/lia";

const MainLayout = () => {
  const { loading } = useContext(AuthContext);

  // Yüklenme animasyonu
  const Loading = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-70">
            <div className="w-12 h-12 border-4 border-zinc-950 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-white">

      <div className="bg-zinc-800 text-white text-sm py-2 text-center hidden md:block">
        Lorem ipsum dolor sit amet.
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
