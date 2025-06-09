export default class NotFoundPage {
  async render() {
    return `
        <section class="container">
          <h1>404 - Halaman Tidak Ditemukan</h1>
        </section>
      `;
  }

  async afterRender() {}
}
