import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const API_BASE_URL = "http://localhost:8000/api/";

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [profile, setProfile] = useState({});

  // 🚀 İlk açılışta refresh token varsa yeni access iste
  const initAuth = async () => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}accounts/token/refresh/`,
        {},
        { withCredentials: true }
      );
      const newAccess = res.data.access;
      setAccessToken(newAccess);

      const decoded = jwtDecode(newAccess);
      setUser({ id: decoded.user_id, ...decoded });

    } catch (err) {
      console.error("❌ Refresh başarısız:", err.response?.data || err.message);
      setAccessToken(null);
    } finally {
      setLoading(false);
      setIsReady(true);
    }
  };


  useEffect(() => {
    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        user,
        setUser,
        profile,
        setProfile,
        loading,
        setLoading,
        isReady
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
