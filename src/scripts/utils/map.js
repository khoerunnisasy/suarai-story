import L from "leaflet";
import "leaflet/dist/leaflet.css";

export function createMap({ lat, lng, elementId, zoom = 13 }) {
  const map = L.map(elementId).setView([lat, lng], zoom);

  const streets = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution: "© OpenStreetMap",
    }
  ).addTo(map);

  const satellite = L.tileLayer(
    "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    {
      maxZoom: 20,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
      attribution: "© Google Satellite",
    }
  );

  const terrain = L.tileLayer(
    "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 17,
      attribution: "© OpenTopoMap",
    }
  );

  const baseMaps = { Streets: streets, Satellite: satellite, Terrain: terrain };
  L.control.layers(baseMaps).addTo(map);

  return map;
}

export function addMarker(map, { lat, lng, popupText = "" }) {
  const marker = L.marker([lat, lng]).addTo(map);
  if (popupText) {
    marker.bindPopup(popupText);
  }
  return marker;
}

export function initInteractiveMap({ onLocationPicked }) {
  const map = createMap({
    lat: -6.9175,
    lng: 107.6191,
    elementId: "map",
    zoom: 13,
  });

  let marker;
  map.on("click", function (e) {
    const { lat, lng } = e.latlng;
    if (marker) map.removeLayer(marker);
    marker = addMarker(map, { lat, lng, popupText: "Lokasi dipilih" });

    const address = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    onLocationPicked({ address, lat, lng });
  });
}