import AboutView from "./about-view";
import AboutPresenter from "./about-presenter";

export default class AboutPage {
  constructor() {
    this._view = new AboutView();
  }

  async render() {
    return this._view.getTemplate();
  }

  async afterRender() {
    const presenter = new AboutPresenter({ view: this._view });
    await presenter.init();
  }
}
