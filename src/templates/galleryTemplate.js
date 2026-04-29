export const galleryTemplate = `
  <section class="section gallery-section">
    <div class="container">
      <div class="section-header">
        <p class="kicker reveal"><span class="kicker-script">Ký ức</span></p>
        <h2 class="reveal artistic-title">
          <span class="title-main">Ghi dấu những <br /><span class="title-accent">khoảnh khắc trọn vẹn</span></span>
        </h2>
      </div>

      <div class="gallery-pinboard reveal">
        <div class="pinboard-surface">
          <!-- Polaroid 1 -->
          <figure class="polaroid" data-index="0">
            <div class="pin"></div>
            <div class="photo-frame">
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" alt="Không gian" />
            </div>
            <figcaption>Không gian xưa</figcaption>
          </figure>

          <!-- Polaroid 2 -->
          <figure class="polaroid" data-index="1">
            <div class="pin"></div>
            <div class="photo-frame">
              <img src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=800&q=80" alt="Mâm cơm" />
            </div>
            <figcaption>Hương vị Việt</figcaption>
          </figure>

          <!-- Polaroid 3 -->
          <figure class="polaroid" data-index="2">
            <div class="pin"></div>
            <div class="photo-frame">
              <img src="https://images.unsplash.com/photo-1514517220017-8ce97a34a7b6?auto=format&fit=crop&w=800&q=80" alt="Bàn tiệc" />
            </div>
            <figcaption>Sum vầy</figcaption>
          </figure>

          <!-- Polaroid 4 -->
          <figure class="polaroid" data-index="3">
            <div class="pin"></div>
            <div class="photo-frame">
              <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80" alt="Món ăn" />
            </div>
            <figcaption>Món ngon đãi khách</figcaption>
          </figure>

          <!-- Polaroid 5 -->
          <figure class="polaroid" data-index="4">
            <div class="pin"></div>
            <div class="photo-frame">
              <img src="https://images.unsplash.com/photo-1550966841-3ee7adac166e?auto=format&fit=crop&w=800&q=80" alt="Bình yên" />
            </div>
            <figcaption>Góc bình yên</figcaption>
          </figure>

          <!-- Polaroid 6 -->
          <figure class="polaroid" data-index="5">
            <div class="pin"></div>
            <div class="photo-frame">
              <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80" alt="Decor" />
            </div>
            <figcaption>Nét mộc</figcaption>
          </figure>

          <!-- Polaroid 7 -->
          <figure class="polaroid" data-index="6">
            <div class="pin"></div>
            <div class="photo-frame">
              <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80" alt="Kitchen" />
            </div>
            <figcaption>Bếp lửa hồng</figcaption>
          </figure>

          <!-- Polaroid 8 -->
          <figure class="polaroid" data-index="7">
            <div class="pin"></div>
            <div class="photo-frame">
              <img src="https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=800&q=80" alt="Ingredient" />
            </div>
            <figcaption>Nguyên liệu tươi</figcaption>
          </figure>

          <!-- Polaroid 9 -->
          <figure class="polaroid" data-index="8">
            <div class="pin"></div>
            <div class="photo-frame">
              <img src="https://images.unsplash.com/photo-1547928576-a4a33237eb67?auto=format&fit=crop&w=800&q=80" alt="Family" />
            </div>
            <figcaption>Bữa tối ấm cúng</figcaption>
          </figure>
        </div>
      </div>
    </div>

    <!-- Gallery Lightbox Modal -->
    <div id="gallery-modal" class="gallery-modal">
      <div class="gallery-modal-overlay"></div>
      <div class="gallery-modal-content">
        <button class="gallery-modal-close">&times;</button>
        <img src="" id="modal-img" alt="Large view" />
        <p id="modal-caption"></p>
      </div>
    </div>
  </section>
`;
