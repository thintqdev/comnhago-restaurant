import "./menu.css";

document.querySelector("#menu-app").innerHTML = `
  <main class="menu-page">
    <header class="menu-header">
      <a class="back-link" href="/">← Quay lai trang chu</a>
      <h1>Thuc don Ca Go</h1>
      <p>Huong vi Bac - Trung - Nam, trinh bay theo nhom mon de de chon.</p>
    </header>

    <section class="menu-category">
      <h2>Khai vi</h2>
      <div class="menu-list">
        <article><span>Goi cuon tom thit</span><strong>89.000</strong></article>
        <article><span>Cha gio hai san</span><strong>109.000</strong></article>
        <article><span>Nom du du bo kho</span><strong>95.000</strong></article>
      </div>
    </section>

    <section class="menu-category">
      <h2>Mon chinh</h2>
      <div class="menu-list">
        <article><span>Cha ca La Vong</span><strong>229.000</strong></article>
        <article><span>Banh xeo tom thit</span><strong>145.000</strong></article>
        <article><span>Ca loc mam me</span><strong>199.000</strong></article>
        <article><span>Bun bo Hue dac biet</span><strong>139.000</strong></article>
      </div>
    </section>

    <section class="menu-category">
      <h2>Com nha</h2>
      <div class="menu-list">
        <article><span>Com tam suon bi cha</span><strong>129.000</strong></article>
        <article><span>Canh chua ca</span><strong>135.000</strong></article>
        <article><span>Rau xao thap cam</span><strong>85.000</strong></article>
      </div>
    </section>

    <section class="menu-category">
      <h2>Trang mieng</h2>
      <div class="menu-list">
        <article><span>Che truyen thong</span><strong>65.000</strong></article>
        <article><span>Banh flan sua dua</span><strong>59.000</strong></article>
      </div>
    </section>
  </main>
`;
