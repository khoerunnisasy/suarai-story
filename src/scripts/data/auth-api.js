import CONFIG from "../config";
import { fetchWithErrorHandling } from "../utils/fetch-wrapper";

export async function loginUser(email, password) {
  return await fetchWithErrorHandling(`${CONFIG.BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

export async function registerUser(name, email, password) {
  return await fetchWithErrorHandling(`${CONFIG.BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
}