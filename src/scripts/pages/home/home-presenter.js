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
        this._view.showError("Belum ada cerita tersedia.");
        return;
      }

      this._view.renderStories(stories);
      this._view.afterRenderMap(stories);
    } catch (error) {
      this._view.showError(`Gagal memuat cerita: ${error.message}`);
    }
  }
}

export default HomePresenter;