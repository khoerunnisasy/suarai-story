import { showToast } from "./toast";

export async function fetchWithErrorHandling(url, options = {}) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      const message = errorData?.message || "Terjadi kesalahan saat memuat data.";
      showToast(message, 4000);
      throw new Error(message);
    }

    return await response.json();
  } catch (error) {
    showToast(error.message || "Koneksi gagal.", 4000);
    throw error;
  }
}