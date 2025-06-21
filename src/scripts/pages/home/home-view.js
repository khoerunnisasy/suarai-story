import { createMap, addMarker } from "../../utils/map";

const HomeView = {
  render() {
    return `
      <section class="card">
        <h2 class="story-title">Temukan dan bagikan cerita seru kamu di sini</h2>
        <div id="map" class="home__map" style="height: 300px; width: 100%; margin-top: 24px;"></div>
        <div id="story-list" class="story-list" tabindex="0"></div>
      </section>
    `;
  },

  renderStories(stories) {
    const container = document.getElementById("story-list");

    const storyItems = stories.map((story, index) => {
      const maxWords = 10;
      const words = story.description.split(" ");
      const isLong = words.length > maxWords;
      const shortDesc = isLong ? words.slice(0, maxWords).join(" ") + "..." : story.description;
      const locationText = (story.lat && story.lon)
      ? `Lokasi : ${story.lat.toFixed(3)}, ${story.lon.toFixed(3)}`
      : "";

      return `
        <article class="story-card clickable" style="animation-delay: ${index * 0.1}s;" data-id="${story.id}">
          <header>
            <img src="${story.photoUrl}" alt="Gambar oleh ${story.name}" class="story-card__image" />
          </header>

          <section class="story-card__content">
            <h3 class="story-card__title">${story.name || "Tanpa Judul"}</h3>
            <p class="story-card__desc">${shortDesc || "-"}</p>
            <div class="story-card__meta">
              <span class="story-card__date">Diposting : ${new Date(story.createdAt).toLocaleDateString()}</span><br/>
              ${locationText ? `<span class="story-card__location">${locationText}</span>` : ""}
            </div>
            ${isLong ? `<a href="#/detail/${story.id}" class="read-more-button" onclick="event.stopPropagation()">Selengkapnya</a>` : ""}
          </section>
        </article>
      `;
    }).join("");

    container.innerHTML = storyItems;

    container.querySelectorAll(".story-card").forEach((card) => {
      card.addEventListener("click", () => {
        const id = card.getAttribute("data-id");
        if (id) window.location.hash = `#/detail/${id}`;
      });
    });
  },

  showError(message) {
    const container = document.getElementById("story-list");
    container.innerHTML = `<p class="error">${message}</p>`;
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

export default HomeView;