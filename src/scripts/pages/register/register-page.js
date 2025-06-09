import RegisterView from "../../pages/register/register-view";
import RegisterPresenter from "../../pages/register/register-presenter";

export default class RegisterPage {
  async render() {
    const view = new RegisterView();
    return view.render();
  }

  async afterRender() {
    const view = new RegisterView();
    const presenter = new RegisterPresenter(view);
    view.bindEvents();
  }
}
