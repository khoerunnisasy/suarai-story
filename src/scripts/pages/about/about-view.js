export default class AboutView {
  getTemplate() {
    return `
      <section class="card">
        <h2 class="story-title">Tentang Suarai</h2>
        <div class="about-card">
          <p class="about-intro">
            <strong>Suarai</strong> adalah ruang digital untuk berbagi cerita, pengalaman, dan suara hati. Dibangun untuk siapa saja yang ingin didengar, Suarai membantu menghubungkan cerita-cerita kecil yang bermakna menjadi sesuatu yang besar.
          </p>

          <div class="about-section">
            <h3>🌍 Suara dari Mana Saja</h3>
            <p>
              Suarai menyatukan cerita dari berbagai tempat, latar belakang, dan sudut pandang. Cukup dengan satu unggahan, kisahmu bisa menjangkau orang-orang yang membutuhkan perspektif atau sekadar teman untuk mendengar.
            </p>
          </div>

          <div class="about-section">
            <h3>✨ Fitur Utama</h3>
            <ul class="about-list">
              <li>Bagikan cerita dengan teks, lokasi, dan gambar</li>
              <li>Lihat cerita dari pengguna lain melalui peta interaktif</li>
              <li>Simpan cerita favoritmu untuk dibaca nanti</li>
              <li>Navigasi cepat dengan tampilan ringan dan responsif</li>
              <li>Tetap terhubung lewat fitur notifikasi</li>
            </ul>
          </div>

          <div class="about-section">
            <h3>🧪 Teknologi di Balik Layar</h3>
            <ul class="about-list">
              <li>HTML5, CSS3, dan JavaScript modern (ES6+)</li>
              <li>Arsitektur modular dengan pendekatan MVP</li>
              <li>Routing berbasis single-page application (SPA)</li>
              <li>Integrasi peta digital dan Progressive Web App (PWA)</li>
            </ul>
          </div>

          <div class="about-section">
            <h3>👥 Siapa Saya?</h3>
            <p>
              <strong>Suarai</strong> dibangun oleh seorang yang percaya bahwa setiap cerita layak untuk didengar. Saya ingin menciptakan ruang aman dan nyaman bagi siapa pun yang ingin membagikan suara mereka ke dunia.
            </p>
          </div>
        </div>
      </section>
    `;
  }
}