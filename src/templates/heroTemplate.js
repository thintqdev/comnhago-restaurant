export const heroTemplate = `
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="container hero-inner">

      <!-- LEFT: copy -->
      <div class="hero-copy">
        <p class="hero-kicker"><span class="kicker-script">Tinh hoa ẩm thực Việt</span></p>
        <h1 class="hero-title">
          <span class="title-main">Mâm cơm <br /><span class="title-accent">3 Miền</span></span>
        </h1>
        <p class="hero-sub">
          Hành trình ẩm thực dọc theo bản đồ chữ S, tái hiện mâm cơm
          gia đình Việt trong không gian ấm cúng, tinh tế.
        </p>
        <div class="hero-actions">
          <a class="btn" href="#booking">Đặt bàn ngay</a>
          <a class="btn btn-ghost" href="#menu">Xem thực đơn</a>
        </div>
      </div>

      <!-- RIGHT: food scene -->
      <div class="hero-food-scene" aria-hidden="true">

        <!-- Glow halo -->
        <div class="food-glow"></div>

        <!-- Orbiting ring of dishes (JS xoay container này khi scroll) -->
        <div class="food-orbit" id="food-orbit">

          <!-- top -->
          <div class="food-orb food-orb--top">
            <img src="https://www.chinadaily.com.cn/kindle/attachement/jpg/site241/20170113/f04da2db112219e25e2059.jpg" alt="Món ăn" class="food-orb-img" />
          </div>

          <!-- right -->
          <div class="food-orb food-orb--right">
            <img src="https://static.dezeen.com/uploads/2009/09/food-probe-by-philips-design-23.jpg" alt="Món ăn" class="food-orb-img" />
          </div>

          <!-- bottom -->
          <div class="food-orb food-orb--bottom">
            <img src="https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?auto=format&fit=crop&w=300&q=80" alt="Món ăn" class="food-orb-img" />
          </div>

          <!-- left -->
          <div class="food-orb food-orb--left">
            <img src="https://d3awvtnmmsvyot.cloudfront.net/api/file/tiG9DGOKSSmDyz0MN6HQ" alt="Món ăn" class="food-orb-img" />
          </div>

        </div><!-- /.food-orbit -->

        <!-- Central mâm cơm -->
        <div class="food-tray">
          <img
            src="https://kenh14cdn.com/203336854389633024/2025/7/27/edit-1-8-17534681936721927776768-1753469057915-17534690579961302335830-1753584725611-17535847258381318918696.jpeg"
            alt="Mâm cơm Việt"
            class="food-tray-img"
          />
          <div class="food-tray-ring"></div>
        </div>

        <!-- Decorative dots -->
        <svg class="food-dots" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="2.5" fill="rgba(216,159,92,0.5)"/>
          <circle cx="30" cy="10" r="1.5" fill="rgba(216,159,92,0.3)"/>
          <circle cx="10" cy="30" r="1.5" fill="rgba(216,159,92,0.3)"/>
          <circle cx="110" cy="110" r="2.5" fill="rgba(216,159,92,0.5)"/>
          <circle cx="90" cy="110" r="1.5" fill="rgba(216,159,92,0.3)"/>
          <circle cx="110" cy="90" r="1.5" fill="rgba(216,159,92,0.3)"/>
        </svg>

      </div><!-- /.hero-food-scene -->
    </div>
  </section>
`;
