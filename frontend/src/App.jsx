import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from "./contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from "@/components/theme-provider";
import ThemeToggle from "@/components/ThemeToggle";


const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ThemeProvider>
            <AppRoutes />
            <ThemeToggle />
            <Toaster position="top-center" reverseOrder={false} />
          </ThemeProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
