import DetailView from "./detail-view";
import DetailPresenter from "./detail-presenter";

export default class DetailPage {
  async render() {
    this._view = new DetailView();
    return this._view.getTemplate();
  }

  async afterRender() {
    const presenter = new DetailPresenter({ view: this._view });
    presenter.init();
  }
}