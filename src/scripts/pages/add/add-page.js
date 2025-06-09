import AddPresenter from "./add-presenter";
import AddView from "./add-view";

export default class AddPage {
  async render() {
    const view = new AddView();
    this._view = view;
    return view.getTemplate();
  }

  async afterRender() {
    const presenter = new AddPresenter({ view: this._view });
    presenter.init();
  }

  destroy() {
    if (this._view && typeof this._view.destroy === 'function') {
      this._view.destroy();
    }
  }
}