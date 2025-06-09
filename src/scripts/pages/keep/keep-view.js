import { createMap, addMarker } from "../../utils/map";

const KeepView = {
  render() {
    return `
      <section class="card">
        <h2 class="story-title">Cerita yang Telah Disimpan</h2>
        <div id="map" class="home__map" style="height: 300px; width: 100%; margin-top: 24px;"></div>
        <div id="story-list" class="story-list" tabindex="0"></div>
      </section>
    `;
  },

  renderStories(stories) {
    const container = document.getElementById("story-list");

    if (!stories.length) {
      container.innerHTML = `<p class="error">Belum ada cerita yang disimpan.</p>`;
      return;
    }

    const storyItems = stories.map((story, index) => {
      const maxWords = 20;
      const words = story.description.split(" ");
      const isLong = words.length > maxWords;
      const shortDesc = isLong ? words.slice(0, maxWords).join(" ") + "..." : story.description;

      return `
        <article class="story-card" style="animation-delay: ${index * 0.1}s;" tabindex="0" onclick="window.location.hash='#/detail/${story.id}'">
          <header>
            <img src="${story.photoUrl}" alt="Gambar oleh ${story.name}" class="story-card__image" />
          </header>

          <section class="story-card__content">
            <h3 class="story-card__title">Penulis : ${story.name || "Tanpa Judul"}</h3>
            <p class="story-card__desc">Detail Cerita : ${shortDesc || "-"}</p>
            ${isLong ? `<a href="#/detail/${story.id}" class="read-more-button">Selengkapnya</a>` : ""}
            <span class="story-card__date">Waktu : ${new Date(story.createdAt).toLocaleDateString()}</span>
          </section>
        </article>
      `;
    }).join("");

    container.innerHTML = storyItems;
  },

  showError(message) {
    const container = document.getElementById("story-list");
    container.innerHTML = `<p class="error">Gagal memuat cerita: ${message}</p>`;
  },

  afterRenderMap(stories) {
    const mapElement = document.getElementById("map");
    if (!mapElement) return;

    const map = createMap({
      lat: -6.2,
      lng: 106.816666,
      elementId: "map",
      zoom: 12,
    });

    addMarker(map, {
      lat: -6.2,
      lng: 106.816666,
      popupText: "Lokasi default: Jakarta",
    });

    stories.forEach((story) => {
      if (story.lat && story.lon) {
        addMarker(map, {
          lat: story.lat,
          lng: story.lon,
          popupText: story.description || "Tidak ada deskripsi",
        });
      }
    });
  },
};

export default KeepView;