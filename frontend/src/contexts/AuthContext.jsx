import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = 'http://localhost:8000/api/';

  {/** Sayfa yenilenince refresh varsa access token'ı yenile */}
  useEffect(() => {
    const refreshAccessToken = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${API_BASE_URL}accounts/token/refresh/`,
          {},
          { withCredentials: true }
        );
        setAccessToken(response.data.access);
      } catch (err) {
        console.error("error : ", err);
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    refreshAccessToken();
  }, []);

  return (
    <AuthContext.Provider value={{
      accessToken,
      setAccessToken,
      user,
      setUser,
      loading,
      setLoading}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;