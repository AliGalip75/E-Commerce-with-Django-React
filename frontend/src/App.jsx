import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from "./context/AuthContext";
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from "@/components/theme-provider";
import ThemeToggle from "@/components/ui/ThemeToggle";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <AppRoutes/>
          <ThemeToggle />
        </ThemeProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
