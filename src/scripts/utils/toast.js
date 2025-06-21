export function showToast(message, duration = 3000, isError = false) {
  let container = document.getElementById("toast-container");

  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.style.position = "fixed";
    container.style.top = "20px";
    container.style.left = "50%";
    container.style.transform = "translateX(-50%)";
    container.style.zIndex = "9999";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast--top ${isError ? "toast--error" : "toast--success"}`;
  toast.textContent = message;

  container.appendChild(toast);

  // Fade-in
  setTimeout(() => {
    toast.classList.add("visible");
  }, 10);

  // Fade-out after duration
  setTimeout(() => {
    toast.classList.remove("visible");
    setTimeout(() => toast.remove(), 300); // remove after animation ends
  }, duration);
}