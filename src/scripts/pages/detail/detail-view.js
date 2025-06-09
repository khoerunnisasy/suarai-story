import { createMap, addMarker } from "../../utils/map";

export default class DetailView {
  getTemplate() {
    return `
      <article class="card">
        <section>
          <h2 id="detail-name" class="story-title"></h2>
          <p id="detail-date" class="detail-date"></p>
        </section>

        <figure>
          <img id="detail-photo" class="detail-photo" alt="Gambar cerita" />
        </figure>

        <section class="detail-story">
          <h3 class="detail-title">Detail Cerita</h3>
          <p id="detail-desc" class="detail-desc"></p>
        </section>

        <section aria-labelledby="map-heading" class="detail-story">
          <h3 id="map-heading" class="detail-title">Peta Lokasi</h3>
          <div id="map" class="detail-map" style="height: 300px;"></div>
        </section>

        <div class="detail-story action-buttons">
          <button id="keepButton" class="action-btn" aria-label="Simpan cerita">
            <span id="keepText">Simpan cerita</span>
            <img id="keepIcon" src="/icons/keep-icon.svg" alt="Simpan Cerita" />
          </button>

          <button id="notifyButton" class="action-btn" aria-label="Aktifkan notifikasi">
            <span id="notifyText">Nyalakan Notifikasi</span>
            <img id="notifyIcon" src="/icons/bell-icon.svg" alt="Notifikasi" />
          </button>
        </div>
      </article>
    `;
  }

  renderStoryDetail(story) {
    document.getElementById("detail-photo").src = story.photoUrl;
    document.getElementById("detail-name").textContent = story.name;
    document.getElementById("detail-desc").textContent = story.description;
    document.getElementById("detail-date").textContent = `Waktu : ${new Date(story.createdAt).toLocaleDateString()}`;

    if (story.lat && story.lon) {
      const map = createMap({
        lat: story.lat,
        lng: story.lon,
        elementId: "map",
        zoom: 13,
      });

      addMarker(map, {
        lat: story.lat,
        lng: story.lon,
        popupText: story.description,
      });
    }

    const isKept = JSON.parse(localStorage.getItem("keptStories") || "[]").includes(story.id);
    this.setKeepButtonState(isKept);
  }

  setKeepButtonState(isSaved) {
    const icon = document.getElementById("keepIcon");
    const text = document.getElementById("keepText");

    icon.src = isSaved ? "/icons/keep-filled.svg" : "/icons/keep-icon.svg";
    icon.alt = isSaved ? "Hapus dari simpanan" : "Simpan cerita";
    text.textContent = isSaved ? "Disimpan" : "Simpan cerita";
  }

  bindKeepButtonClick(handler) {
    document.getElementById("keepButton").addEventListener("click", handler);
  }
  
  setNotifyButtonState(isSubscribed) {
    const icon = document.getElementById("notifyIcon");
    const text = document.getElementById("notifyText");

    icon.src = isSubscribed ? "/icons/bell-filled.svg" : "/icons/bell-icon.svg";
    icon.alt = isSubscribed ? "Berhenti Berlangganan" : "Aktifkan Notifikasi";
    text.textContent = isSubscribed ? "Subscribed" : "Try Notify Me";
  }

  bindNotifyButtonClick(handler) {
  document.getElementById("notifyButton").addEventListener("click", handler);
  }
}