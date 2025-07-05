import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const API_BASE_URL = 'http://localhost:8000/api/';

const useAxios = () => {
  const { accessToken, setAccessToken } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Access token'ı istekten önce header'a ekle
  axiosInstance.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // 401 olursa refresh token isteği
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !isAuthEndpoint(originalRequest.url)
      ) {
        originalRequest._retry = true;

        try {
          const response = await axios.post(
            `${API_BASE_URL}accounts/token/refresh/`,
            {},
            { withCredentials: true }
          );

          const newAccessToken = response.data.access;
          setAccessToken(newAccessToken);

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          window.location.href = "/accounts/login";
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

const isAuthEndpoint = (url) => {
  const authPaths = ["accounts/token/", "accounts/token/refresh/"];
  return authPaths.some((path) => url?.includes(path));
};


export default useAxios;
