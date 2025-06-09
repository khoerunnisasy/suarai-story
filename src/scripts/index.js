import "../styles/styles.css";
import App from "./pages/app";

document.addEventListener("DOMContentLoaded", async () => {
  const app = new App({
    content: document.querySelector("#main-content"),
    drawerButton: document.querySelector("#drawer-button"),
    navigationDrawer: document.querySelector("#navigation-drawer"),
  });

  await app.renderPage();

  window.addEventListener("hashchange", async () => {
    if (app._currentPage?.destroy instanceof Function) {
      app._currentPage.destroy(); // ✅ Matikan kamera sebelum render
    }
    await app.renderPage();
  });

  const mainContent = document.querySelector("#main-content");
  const skipLink = document.querySelector(".skip-to-content");

  if (skipLink && mainContent) {
    skipLink.addEventListener("click", function (event) {
      event.preventDefault();
      skipLink.blur();
      mainContent.setAttribute("tabindex", "-1");
      mainContent.focus();
      mainContent.scrollIntoView();
    });
  }
});