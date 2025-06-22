import axios from 'axios';
import { LocalStorageManager } from "@/utils/localStorageManager";

const API_BASE_URL = 'http://localhost:8000/api/';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// İstek öncesi AccessToken'ı herader'a ekle
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = LocalStorageManager.getAccessToken();
    if (accessToken && LocalStorageManager.isTokenValid(accessToken)) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Dönen yanıta göre işlem yap
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
      
      try {
        const response = await axios.post(
          `${API_BASE_URL}accounts/token/refresh/`,
          {},
          { withCredentials: true }
        );
        
        const newAccessToken = response.data.access;
        LocalStorageManager.setAccessToken(newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh başarısız olursa Access Token'ı sil ve Login'e yönlendir
        LocalStorageManager.removeAccessToken();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);


const isAuthEndpoint = (url) => {
  const authEndpoints = ['accounts/token/', 'accounts/token/refresh/'];
  return authEndpoints.some(endpoint => url.includes(endpoint));
};

export default axiosInstance;
