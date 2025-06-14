import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true,  // Cookie’leri otomatik gönder
  headers: {
    "Content-Type": "application/json",
  },
});

// Access Token'ı her isteğe ekle
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Login ve refresh endpoint'lerini interceptor'dan muaf tut
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry && 
      !originalRequest.url.includes('accounts/token/') &&
      !originalRequest.url.includes('accounts/token/refresh/')
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          "http://localhost:8000/api/accounts/token/refresh/",
          {},
          { withCredentials: true }
        );
        const newAccess = res.data.access;
        localStorage.setItem("access", newAccess);
        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
        console.log("Ben çalıştım")
        return axiosInstance(originalRequest); // isteği tekrar dene
      } catch (err) {
        localStorage.removeItem("access");
        window.location.href = "/login";  // Otomatik logout
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
