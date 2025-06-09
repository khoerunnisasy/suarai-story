import routes from "../routes/routes";
import { getActiveRoute } from "../routes/url-parser";

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;
    this._currentPage = null;
    this.#setupDrawer();
  }

  #setupDrawer() {
    this.#drawerButton.addEventListener("click", () => {
      const isOpen = this.#navigationDrawer.classList.toggle("open");
      this.#drawerButton.setAttribute("aria-expanded", isOpen);

      if (isOpen) {
        const firstLink = this.#navigationDrawer.querySelector("a");
        if (firstLink) firstLink.focus();
      }
    });

    document.body.addEventListener("click", (event) => {
      if (
        !this.#navigationDrawer.contains(event.target) &&
        !this.#drawerButton.contains(event.target)
      ) {
        this.#navigationDrawer.classList.remove("open");
        this.#drawerButton.setAttribute("aria-expanded", false);
      }

      this.#navigationDrawer.querySelectorAll("a").forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove("open");
          this.#drawerButton.setAttribute("aria-expanded", false);
        }
      });
    });
  }

  async renderPage() {
    const url = getActiveRoute();
    const page = routes[url] || routes["/404"];

    if (this._currentPage && typeof this._currentPage.destroy === "function") {
      this._currentPage.destroy();
    }

    this._currentPage = page;

    const renderContent = async () => {
      this.#content.innerHTML = await page.render();
      await page.afterRender();
      this.#updateNavigation();
    };

    if (document.startViewTransition) {
      await document.startViewTransition(renderContent);
    } else {
      await renderContent();
    }
  }

  #updateNavigation() {
    const token = localStorage.getItem("token");
    const loginLink = document.getElementById("nav-login");
    const registerLink = document.getElementById("nav-register");
    const logoutLink = document.getElementById("nav-logout");

    if (token) {
      loginLink?.classList.add("hidden");
      registerLink?.classList.add("hidden");
      logoutLink?.classList.remove("hidden");
    } else {
      loginLink?.classList.remove("hidden");
      registerLink?.classList.remove("hidden");
      logoutLink?.classList.add("hidden");
    }

    document.getElementById("nav-logout")?.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      window.location.hash = "/login";
    });
  }
}

export default App;