import AuthModel from "../../data/auth-model";

export default class LoginPresenter {
  constructor(view) {
    this.view = view;
    this.view.setPresenter(this);
  }

  async handleLogin({ email, password }) {
    try {
      const result = await AuthModel.login(email, password);
      localStorage.setItem("token", result.loginResult.token);
      this.view.showToast("Login berhasil!");
      this.view.navigateToHome();
    } catch (error) {
      this.view.showToast(error.message, true);
    }
  }
}