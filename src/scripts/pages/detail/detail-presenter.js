import StoryModel from "../../data/model";
import { parseActivePathname } from "../../routes/url-parser";

export default class DetailPresenter {
  constructor({ view, model = StoryModel }) {
    this._view = view;
    this._model = model;
    this._storyId = null;
  }

  async init() {
    const { id } = parseActivePathname();
    this._storyId = id;

    try {
      const story = await this._model.fetchStoryById(id);
      this._story = story;

      this._view.renderStoryDetail(story);
      this._view.bindKeepButtonClick(this._handleKeepToggle.bind(this));
      this._view.bindNotifyButtonClick(this._handleNotifyToggle.bind(this));

      // Set initial notification state
      const isSubscribed = localStorage.getItem("notifySubscribed") === "true";
      this._view.setNotifyButtonState(isSubscribed);

    } catch (error) {
      this._view.showMessage("Gagal memuat detail cerita: " + error.message);
    }
  }

  _handleKeepToggle() {
    const kept = JSON.parse(localStorage.getItem("keptStories") || "[]");
    const isKept = kept.includes(this._storyId);
    let updated;

    if (isKept) {
      updated = kept.filter(id => id !== this._storyId);
      this._view.showMessage("Cerita dihapus dari simpanan");
    } else {
      updated = [...kept, this._storyId];
      this._view.showMessage("Cerita disimpan!");
    }

    localStorage.setItem("keptStories", JSON.stringify(updated));
    this._view.setKeepButtonState(!isKept); // update icon dan teks
  }

  async _handleNotifyToggle() {
    const isSubscribed = localStorage.getItem("notifySubscribed") === "true";

    if (isSubscribed) {
      localStorage.setItem("notifySubscribed", "false");
      this._view.setNotifyButtonState(false);
      this._view.showMessage("Berhenti berlangganan notifikasi.");
    } else {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        localStorage.setItem("notifySubscribed", "true");
        this._view.setNotifyButtonState(true);
        this._view.showMessage("Berhasil berlangganan notifikasi!");
      } else {
        this._view.showMessage("Izinkan notifikasi untuk menerima pembaruan.");
      }
    }
  }
}