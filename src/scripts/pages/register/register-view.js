export default class RegisterView {
  setPresenter(presenter) {
    this.presenter = presenter;
  }

  render() {
    return `
      <section class="container-card">
        <h2 class="auth-title">Daftar Akun</h2>
        <form id="registerForm" class="auth-form">
          <div class="form-group">
            <label for="name">Nama</label>
            <input type="text" id="name" required />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" required />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" required />
          </div>

          <button class="auth-button" type="submit">Daftar</button>
        </form>
        <p class="auth-link">Sudah punya akun? <a href="#/login">Login di sini</a></p>
      </section>
    `;
  }

  bindEvents() {
    const form = document.getElementById("registerForm");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      this.presenter.handleRegister({ name, email, password });
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

  redirectToLogin() {
    window.location.hash = "/login";
  }
}