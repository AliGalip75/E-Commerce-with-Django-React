import axios from "axios";
import { useContext, useMemo } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const API_BASE_URL = "http://localhost:8000/api/";

const useAxios = () => {
  const { accessToken } = useContext(AuthContext);

  return useMemo(() => {
    const instance = axios.create({
      baseURL: API_BASE_URL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    instance.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return instance;
  }, [accessToken]);
};


export default useAxios;
