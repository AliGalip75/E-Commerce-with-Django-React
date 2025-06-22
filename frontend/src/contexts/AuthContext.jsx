import { createContext, useState } from "react";
import { LocalStorageManager } from "@/utils/localStorageManager";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(LocalStorageManager.getAccessToken());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

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