import CONFIG from "../config";
import { fetchWithErrorHandling } from "../utils/fetch-wrapper";
import AuthModel from "./auth-model";

export async function getAllStories() {
  return await fetchWithErrorHandling(`${CONFIG.BASE_URL}/stories`, {
    headers: {
      Authorization: `Bearer ${AuthModel.getToken()}`,
    },
  });
}

export async function getStoryById(id) {
  return await fetchWithErrorHandling(`${CONFIG.BASE_URL}/stories/${id}`, {
    headers: {
      Authorization: `Bearer ${AuthModel.getToken()}`,
    },
  });
}

export async function postStory({ description, photo, lat, lon }) {
  const formData = new FormData();
  formData.append("description", description);
  formData.append("photo", photo);
  formData.append("lat", lat);
  formData.append("lon", lon);

  return await fetchWithErrorHandling(`${CONFIG.BASE_URL}/stories`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AuthModel.getToken()}`,
    },
    body: formData,
  });
}