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
            <p id="registerMessage" class="auth-message"></p>
            <p class="auth-link">Sudah punya akun? <a href="#/login">Login di sini</a></p>
        </section>
      `;
  }

  bindEvents() {
    const form = document.getElementById("registerForm");
    const messageBox = document.getElementById("registerMessage");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      this.presenter.handleRegister({ name, email, password });
    });

    this.showMessage = (message, isError = false) => {
      messageBox.textContent = message;
      messageBox.style.color = isError ? "red" : "green";
    };
  }

  redirectToLogin() {
    window.location.hash = "/login";
  }
}