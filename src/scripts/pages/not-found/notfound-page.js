export default class NotFoundPage {
  async render() {
    return `
      <section class="container-card">
        <h2 class="auth-title">404 - Halaman Tidak Ditemukan</h2>
        <p class="auth-message">Maaf, halaman yang kamu cari tidak tersedia.</p>
        <a href="#/" class="auth-button" style="margin-top: 16px; display: inline-block;">Kembali ke Beranda</a>
      </section>
    `;
  }

  async afterRender() {
  }
}
