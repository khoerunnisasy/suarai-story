import RegisterView from "../../pages/register/register-view";
import RegisterPresenter from "../../pages/register/register-presenter";

export default class RegisterPage {
  constructor() {
    this._view = new RegisterView(); // buat sekali
  }

  async render() {
    return this._view.render(); // tampilkan view
  }

  async afterRender() {
    const presenter = new RegisterPresenter(this._view); // pakai view yg sama
    this._view.bindEvents(); // aktifkan event
  }
}