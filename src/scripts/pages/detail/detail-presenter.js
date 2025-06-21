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
      
      const isSubscribed = localStorage.getItem("notifySubscribed") === "true";
      this._view.setNotifyButtonState(isSubscribed);

    } catch (error) {
      console.error("Gagal muat detail:", error);
      this._view.showToast("Gagal memuat detail cerita: " + error.message, true);
    }
  }

  _handleKeepToggle() {
    const kept = JSON.parse(localStorage.getItem("keptStories") || "[]");
    const isKept = kept.includes(this._storyId);
    let updated;

    if (isKept) {
      updated = kept.filter((id) => id !== this._storyId);
      this._view.showToast("Cerita dihapus dari simpanan");
    } else {
      updated = [...kept, this._storyId];
      this._view.showToast("Cerita disimpan!");
    }

    localStorage.setItem("keptStories", JSON.stringify(updated));
    this._view.setKeepButtonState(!isKept);
  }

  async _handleNotifyToggle() {
    const isSubscribed = localStorage.getItem("notifySubscribed") === "true";

    if (isSubscribed) {
      localStorage.setItem("notifySubscribed", "false");
      this._view.setNotifyButtonState(false);
      this._view.showToast("Berhenti berlangganan notifikasi.");
    } else {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        localStorage.setItem("notifySubscribed", "true");
        this._view.setNotifyButtonState(true);
        this._view.showToast("Berhasil berlangganan notifikasi!");
      } else {
        this._view.showToast("Izinkan notifikasi untuk menerima pembaruan.");
      }
    }
  }
}