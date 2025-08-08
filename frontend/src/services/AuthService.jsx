export const AuthService = {
  async register(axios, userData) {
    const res = await axios.post("accounts/users/", userData);
    return res.data;
  },

  async getProfile(axios) {
    const res = await axios.get("accounts/users/profile/");
    return res.data;
  },

  async updateProfile(axios, userData, accessToken) {
    const res = await axios.patch(
      "accounts/users/profile/update/",
       userData, 
       {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
       }
      );
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