import { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/AxiosInstance";
import toast from "react-hot-toast";
import { useNavigate} from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ( {children} ) => {

    const [accessToken, setAccessToken] = useState(localStorage.getItem("access"));
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // İlk yüklemede veya accessToken değişiminde kullanıcıyı getir
    useEffect( () => {
        const init = async () => {
            if (accessToken) {
                fetchUser();
            } else {
                setLoading(false);
            }
        };
        init();
    }, [accessToken]);

    // Kullanıcı profilini getir
    const fetchUser = async () => {
        try {
            const response = await axiosInstance.get("accounts/users/profile/");
            setUser(response.data);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false); // İşlem tamamlandı
        }
    }

    // Giriş yap
    const login = async (email, password) => {
        try {

            const response = await axiosInstance.post("accounts/token/", { email, password });
           
            const access = response.data.access;
            localStorage.setItem("access", access);
            setAccessToken(access);
           
        } catch (err) {
            console.error("Giriş Başarısız", err);
        }
    };


    const logout = async () => {
        try {
            const response = await axiosInstance.post("/accounts/token/logout/");
            toast.success(response.data.message, {
                style: {
                    padding: '25px',
                    boxShadow: "0 4px 10px 5px rgba(0, 0, 0, 0.15)",
                    border: "1px solid #ddd",
                    fontWeight: "600",
                },
            });
            localStorage.removeItem("access");
            setAccessToken(null);
            setUser(null);
            navigate("/accounts/login/");
        } catch (err) {
            toast.error("Çıkış sırasında bir hata oluştu.");
            console.error("Logout hatası:", err);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                user,
                login,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;