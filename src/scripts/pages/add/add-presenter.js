import { initInteractiveMap } from "../../utils/map";
import StoryModel from "../../data/model";

export default class AddPresenter {
  constructor({ view, model = StoryModel }) {
    this._view = view;
    this._model = model;
  }

  async init() {
    this._pickedCoords = null;

    initInteractiveMap({
      onLocationPicked: ({ address, lat, lng }) => {
        this._pickedCoords = { lat: Number(lat), lon: Number(lng) };
        this._view.setLocationInput(address);
      },
    });

    await this._view.initCamera();
    this._view.bindCapturePhoto(this._handleCapturePhoto.bind(this));
    this._view.bindFormSubmit(this._handleFormSubmit.bind(this));
  }

  async _handleCapturePhoto() {
    const blob = await this._view.capturePhoto();
    this._view.setPhoto(blob);
    this._view.stopCamera();
  }

  async _handleFormSubmit(event) {
    event.preventDefault();
    const { description, location, photoBlob } = this._view.getFormData();

    if (!photoBlob) {
      this._view.showToast("Silakan ambil atau unggah foto terlebih dahulu.");
      return;
    }

    if (photoBlob.size > 1024 * 1024) {
      this._view.showToast("Ukuran foto maksimal 1MB.");
      return;
    }

    if (!this._pickedCoords) {
      this._view.showToast("Silakan pilih lokasi terlebih dahulu.");
      return;
    }

    try {
      await this._model.submitStory({
        description,
        photo: photoBlob,
        lat: this._pickedCoords.lat,
        lon: this._pickedCoords.lon,
      });

      this._view.showToast("Cerita berhasil ditambahkan!");
      this._view.redirectToHome();
    } catch (error) {
      this._view.showToast(`Gagal menambahkan cerita: ${error.message}`);
    }
  }
}