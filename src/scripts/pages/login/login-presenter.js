import AuthModel from "../../data/auth-model";

export default class LoginPresenter {
  constructor(view) {
    this.view = view;
    this.view.setPresenter(this);
  }

  async handleLogin({ email, password }) {
    try {
      const result = await AuthModel.login(email, password);
      this.view.showMessage("Login berhasil!");
      this.view.navigateToHome(); // 🔁 Ganti dari window.location.hash
    } catch (error) {
      this.view.showMessage(error.message, true);
    }
  }
}