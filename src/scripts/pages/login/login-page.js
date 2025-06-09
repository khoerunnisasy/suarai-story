import LoginView from "./login-view";
import LoginPresenter from "./login-presenter";

export default class LoginPage {
  async render() {
    const view = new LoginView();
    return view.render();
  }

  async afterRender() {
    const view = new LoginView();
    const presenter = new LoginPresenter(view);
    view.bindEvents();
  }
}