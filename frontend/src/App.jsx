import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from "@/contexts/CartContext";
import ThemeToggle from "@/components/ThemeToggle";
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from "@/contexts/ThemeContext";
import AuthProvider from "./contexts/AuthContext";


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
