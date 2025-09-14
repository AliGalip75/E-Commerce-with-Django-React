import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/layouts/sections/SiteFooter';
import SiteHeader from '@/layouts/sections/SiteHeader';
import Footer from '@/components/Footer';

const MainLayout = () => {

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 text-gray-900 dark:text-white">

      {/* Header */}
      <SiteHeader>
        <Navbar />
      </SiteHeader>

      {/* Main Content */}
      <main className="grow">
        <Outlet />
      </main>

      {/* Footer */}
      <SiteFooter>
        <Footer />
      </SiteFooter>
    </div>
  );
};

export default MainLayout;