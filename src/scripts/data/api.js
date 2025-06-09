import CONFIG from "../config";

const ENDPOINTS = {
  GET_STORIES: `${CONFIG.BASE_URL}/stories`,
  POST_STORY: `${CONFIG.BASE_URL}/stories`,
};

export async function getAllStories() {
  const token = localStorage.getItem("token");
  if (!token) return [];

  try {
    const response = await fetch(ENDPOINTS.GET_STORIES, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result.listStory;
  } catch (error) {
    console.error("Gagal mengambil data:", error.message);
    return [];
  }
}

export async function postStory({ description, photo, lat, lon }) {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("description", description);
  formData.append("photo", photo);
  formData.append("lat", lat);
  formData.append("lon", lon);

  const response = await fetch(ENDPOINTS.POST_STORY, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message);
  return result;
}

export async function getStoryById(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${CONFIG.BASE_URL}/stories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) throw new Error(result.message || "Gagal ambil detail");
  return result.story;
}
