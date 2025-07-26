import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const API_BASE_URL = 'http://localhost:8000/api/';

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}accounts/token/refresh/`,
          {},
          { withCredentials: true }
        );
        setAccessToken(response.data.access);
      } catch (err) {
        console.error("Token yenileme başarısız:", err);
        setAccessToken(null);
        setUser(null);
      }
    };

    refreshAccessToken();

    const interval = setInterval(refreshAccessToken, 9 * 60 * 1000); // ! Token'ı expire süresinden 1 dk önce yenile
    return () => clearInterval(interval);
  }, []);


  return (
    <AuthContext.Provider value={{
      accessToken,
      setAccessToken,
      user,
      profile,
      setProfile,
      setUser,
      loading,
      setLoading}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

