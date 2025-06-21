import StoryModel from "../../data/model";

export default class KeepPresenter {
  constructor({ view, model = StoryModel }) {
    this._view = view;
    this._model = model;
  }

  async init() {
    try {
      const allStories = await this._model.fetchAll();

      const keptIds = JSON.parse(localStorage.getItem("keptStories") || "[]");

      const keptStories = allStories.filter((story) => keptIds.includes(story.id));

      this._view.renderStories(keptStories);
      this._view.afterRenderMap(keptStories);
    } catch (error) {
      this._view.showError(error.message);
    }
  }
}