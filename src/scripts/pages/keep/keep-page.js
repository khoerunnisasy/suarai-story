import KeepView from "./keep-view";
import KeepPresenter from "./keep-presenter";

export default class KeepPage {
  async render() {
    this._view = KeepView;
    return this._view.render();
  }

  async afterRender() {
    const presenter = new KeepPresenter({ view: this._view });
    presenter.init();
  }
}