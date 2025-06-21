export default class LoginView {
  constructor() {
    this.form = null;
  }

  setPresenter(presenter) {
    this.presenter = presenter;
  }

  render() {
    return `
      <section class="container-card">
        <h2 class="auth-title">Login</h2>
        <form id="loginForm" class="auth-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" required />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" required />
          </div>

          <button class="auth-button" type="submit">Login</button>
        </form>
        <p id="loginMessage" class="auth-message"></p>
        <p class="auth-link">Belum punya akun? <a href="#/register">Daftar di sini</a></p>
      </section>
    `;
  }

  bindEvents() {
    this.form = document.getElementById("loginForm");
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = this.form.querySelector("#email").value;
      const password = this.form.querySelector("#password").value;
      this.presenter.handleLogin({ email, password });
    });
  }

  showToast(message, isError = false) {
    const toast = document.createElement("div");
    toast.className = `toast toast--top ${isError ? "toast--error" : "toast--success"}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("visible"), 10);

    setTimeout(() => {
      toast.classList.remove("visible");
      toast.addEventListener("transitionend", () => toast.remove());
    }, 3000);
  }

  navigateToHome() {
    window.location.hash = "/";
  }
}