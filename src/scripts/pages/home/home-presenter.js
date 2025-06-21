import StoryModel from "../../data/model";

class HomePresenter {
  constructor({ view, model = StoryModel }) {
    this._view = view;
    this._model = model;
  }

  async init() {
     try {
      const stories = await this._model.fetchAll();

      if (!stories.length) {
        this._view.showError("Silakan masuk atau daftar terlebih dahulu.");
        return;
      }

      this._view.renderStories(stories);
      this._view.afterRenderMap(stories);
    } catch (error) {
      this._view.showError(`${error.message}`);
    }
  }
}

export default HomePresenter;