import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const API_BASE_URL = "http://localhost:8000/api/";
//const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const useAxios = () => {
  const { accessToken, setAccessToken } = useContext(AuthContext);

  const tokenRef = useRef(accessToken);
  const axiosInstance = useRef(
    axios.create({
      baseURL: API_BASE_URL,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    })
  );

  // accessToken değiştikçe sadece ref’i güncelle
  useEffect(() => {
    tokenRef.current = accessToken;
  }, [accessToken]);

  useEffect(() => {
    const instance = axiosInstance.current;

    const requestInterceptor = instance.interceptors.request.use(
      (config) => {
        if (tokenRef.current) {
          config.headers.Authorization = `Bearer ${tokenRef.current}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const res = await axios.post(
              `${API_BASE_URL}accounts/token/refresh/`,
              {},
              { withCredentials: true }
            );

            const newAccess = res.data.access;

            setAccessToken(newAccess);
            tokenRef.current = newAccess;

            originalRequest.headers.Authorization = `Bearer ${newAccess}`;
            return instance(originalRequest);
          } catch (refreshError) {
            console.error("Token yenileme başarısız:", refreshError);
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [setAccessToken]); 

  return axiosInstance.current;
};

export default useAxios;
