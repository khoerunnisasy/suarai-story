export default class AboutPresenter {
  constructor({ view }) {
    this._view = view;
  }

  async init() {
    console.info("AboutPresenter initialized");
  }
}
