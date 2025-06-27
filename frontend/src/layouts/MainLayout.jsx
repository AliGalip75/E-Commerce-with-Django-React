import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-white">

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
