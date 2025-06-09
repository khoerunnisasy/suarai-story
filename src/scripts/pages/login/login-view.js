// scripts/pages/login/login-view.js
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
    this.messageBox = document.getElementById("loginMessage");

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = this.form.querySelector("#email").value;
      const password = this.form.querySelector("#password").value;

      this.presenter.handleLogin({ email, password });
    });
  }

  showMessage(message, isError = false) {
    this.messageBox.textContent = message;
    this.messageBox.style.color = isError ? "red" : "green";
  }

  navigateToHome() {
    window.location.hash = "/";
  }
}