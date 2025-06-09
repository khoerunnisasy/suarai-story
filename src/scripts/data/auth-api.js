import CONFIG from "../config";

export async function loginUser(email, password) {
  const response = await fetch(`${CONFIG.BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login gagal");
  }

  return await response.json();
}

export async function registerUser(name, email, password) {
  const response = await fetch(`${CONFIG.BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Register gagal");
  return result;
}
