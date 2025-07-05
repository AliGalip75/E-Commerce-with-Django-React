export const AuthService = {
  async register(axios, userData) {
    const res = await axios.post("accounts/users/", userData);
    return res.data;
  },

  async refreshToken(axios) {
    const res = await axios.post("accounts/token/refresh/", {}, { withCredentials: true });
    return res.data;
  },

  async getProfile(axios) {
    const res = await axios.get("accounts/users/profile/");
    return res.data;
  },

  async logout(axios) {
    const res = await axios.post("accounts/token/logout/", {}, { withCredentials: true });
    return res.data;
  },

  async login(axios, email, password) {
    const res = await axios.post("/accounts/token/", { email, password }, { withCredentials: true });
    return res.data; // sadece access döner
  }

};