import { registerUser } from "../../data/auth-api";

export default class RegisterPresenter {
  constructor(view) {
    this.view = view;
    this.view.setPresenter(this);
  }

  async handleRegister({ name, email, password }) {
    try {
      await registerUser(name, email, password);
      this.view.showToast("Pendaftaran berhasil! Silakan login.");
      this.view.redirectToLogin();
    } catch (error) {
      this.view.showToast(error.message, true);
    }
  }
}