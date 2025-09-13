import { Outlet } from 'react-router-dom';
import Footer from '@/components/Footer';
import SiteFooter from './sections/SiteFooter';

const AccountLayout = () => {

    return (
        <div className="flex flex-col h-screen bg-zinc-50 dark:bg-zinc-900 dark:text-white">
            <div className="basis-9/10 ">
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
