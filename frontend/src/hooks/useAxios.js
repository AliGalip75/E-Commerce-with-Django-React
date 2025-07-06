import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const API_BASE_URL = 'http://localhost:8000/api/';

// ---- Global kontrol değişkenleri ----
let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (newAccessToken) => {
  refreshSubscribers.forEach((cb) => cb(newAccessToken));
  refreshSubscribers = [];
};

const isAuthEndpoint = (url) => {
  const authPaths = ["accounts/token/", "accounts/token/refresh/"];
  return authPaths.some((path) => url?.includes(path));
};

const useAxios = () => {
  const { accessToken, setAccessToken } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // ---- Her istek öncesi access token'ı ekle ----
  axiosInstance.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // ---- 401 olduğunda retry yapma sistemi ----
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !isAuthEndpoint(originalRequest.url)
      ) {
        originalRequest._retry = true;

        // Eğer başka biri refresh yapıyorsa sıraya gir
        if (isRefreshing) {
          return new Promise((resolve) => {
            subscribeTokenRefresh((newToken) => {
              originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
              resolve(axiosInstance(originalRequest));
            });
          });
        }

        // Refresh işlemini başlat
        isRefreshing = true;

        try {
          const response = await axios.post(
            `${API_BASE_URL}accounts/token/refresh/`,
            {},
            { withCredentials: true }
          );

          const newAccessToken = response.data.access;
          setAccessToken(newAccessToken);
          onRefreshed(newAccessToken);

          // Retry
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          window.location.href = "/accounts/login";
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
