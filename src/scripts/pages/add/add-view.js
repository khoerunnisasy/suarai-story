export default class AddView {
  getTemplate() {
    return `
      <section class="container-card">
        <h2 class="auth-title">Tambah Cerita</h2>
        <form id="storyForm" class="auth-form">
          <div class="form-group">
            <label for="description">Deskripsi</label>
            <textarea id="description" name="description" required></textarea>
          </div>

          <div class="form-group">
            <label for="location">Lokasi (klik pada peta)</label>
            <input type="text" id="location" name="location" readonly required />
          </div>

          <div id="map" class="form-group" style="height: 300px; margin-top: 16px;"></div>

          <div class="form-group">
            <label for="photoInput">Ambil atau Unggah Foto</label>
            <div class="photo-box">
              <video id="camera" autoplay muted playsinline class="camera-video"></video>
              <img id="previewImage" alt="Preview Foto" class="preview-image" />
            </div>

            <div class="camera-controls">
              <button type="button" id="captureBtn" class="auth-button">📸 Ambil Gambar</button>
              <button type="button" id="retakeBtn" class="auth-button" style="display:none;">🔁 Ambil Ulang</button>
            </div>

            <input type="file" id="photoInput" accept="image/*" />
          </div>

          <button type="submit" class="auth-button">Kirim Cerita</button>
        </form>
      </section>
    `;
  }

  async initCamera() {
    this._video = document.querySelector("#camera");
    this._stream = await navigator.mediaDevices.getUserMedia({ video: true });
    this._video.srcObject = this._stream;
    this._photoBlob = null;
    document.querySelector("#previewImage").style.display = "none";
  }

  stopCamera() {
    if (this._stream) {
      this._stream.getTracks().forEach((track) => track.stop());
    }
  }

  destroy() {
    this.stopCamera();
  }

  async capturePhoto() {
    const canvas = document.createElement("canvas");
    canvas.width = this._video.videoWidth;
    canvas.height = this._video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(this._video, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg")
    );
    return blob;
  }

  bindCapturePhoto(handler) {
    document.querySelector("#captureBtn").addEventListener("click", handler);
    document.querySelector("#retakeBtn").addEventListener("click", async () => {
      await this.initCamera();
      document.querySelector("#camera").style.display = "block";
      document.querySelector("#retakeBtn").style.display = "none";
      document.querySelector("#previewImage").style.display = "none";
    });

    document.querySelector("#photoInput").addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        this.setPhoto(file);
        this.stopCamera();
        document.querySelector("#camera").style.display = "none";
        document.querySelector("#retakeBtn").style.display = "inline-block";
      }
    });
  }

  setPhoto(blob) {
    this._photoBlob = blob;
    const url = URL.createObjectURL(blob);
    const img = document.querySelector("#previewImage");
    img.src = url;
    img.style.display = "block";
  }

  bindFormSubmit(handler) {
    document.querySelector("#storyForm").addEventListener("submit", handler);
  }

  setLocationInput(address) {
    document.querySelector("#location").value = address;
  }

  getFormData() {
    return {
      description: document.querySelector("#description").value.trim(),
      location: document.querySelector("#location").value.trim(),
      photoBlob: this._photoBlob,
    };
  }

  showToast(message, isError = false) {
    const toast = document.createElement("div");
    toast.className = `toast toast--top ${isError ? "toast--error" : "toast--success"}`;
    toast.textContent = message;

    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("visible"));

    setTimeout(() => {
      toast.classList.remove("visible");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  redirectToHome() {
    window.location.hash = "/";
  }
}