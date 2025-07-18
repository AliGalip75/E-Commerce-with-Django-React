import { useAuth } from '@/hooks/useAuth';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/Footer';
import SiteFooter from './sections/SiteFooter';

const AccountLayout = () => {
    const { loading } = useAuth();

    // Yüklenme animasyonu
    const Loading = () => {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-70">
                <div className="w-12 h-12 border-4 border-zinc-950 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 dark:bg-zinc-900 dark:text-white">
            <div className="basis-9/10 ">
                {loading && <Loading />}
            
                <div className="w-full h-full">
                    <Outlet />
                </div>
                
            </div>
            
            <div className="basis-1/10">
                <SiteFooter>
                    <Footer />
                </SiteFooter>  
            </div>
        </div>
    );
};

export default AccountLayout;
