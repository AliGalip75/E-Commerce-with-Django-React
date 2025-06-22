import axiosInstance from '@/api/AxiosInstance';

class AuthService {
  async login(email, password) {
    const response = await axiosInstance.post("accounts/token/", { email, password });
    return response.data;
  }

  async logout() {
    const response = await axiosInstance.post("accounts/token/logout/");
    return response.data;
  }

  async register(userData) {
    const response = await axiosInstance.post("accounts/users/", userData);
    return response.data;
  }

  async getProfile() {
    const response = await axiosInstance.get("accounts/users/profile/");
    return response.data;
  }

  async refreshToken() {
    const response = await axiosInstance.post("accounts/token/refresh/", {}, { withCredentials: true });
    return response.data;
  }
}

export const authService = new AuthService();