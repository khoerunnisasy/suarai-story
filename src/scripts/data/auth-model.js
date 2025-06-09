import { loginUser } from "./auth-api";

const AuthModel = {
  async login(email, password) {
    const result = await loginUser(email, password);
    const token = result?.loginResult?.token;

    if (token) {
      localStorage.setItem("token", token);
    }

    return result;
  },

  getToken() {
    return localStorage.getItem("token");
  },

  logout() {
    localStorage.removeItem("token");
  },
};

export default AuthModel;
