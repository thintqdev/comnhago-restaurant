export const reviewsTemplate = `
  <section id="reviews" class="section reviews-section">
    <div class="container">
      <div class="section-header">
        <p class="kicker reveal"><span class="kicker-script">Đánh giá</span></p>
        <h2 class="reveal artistic-title">
          <span class="title-main">Thực khách nói gì <br /><span class="title-accent">về chúng tôi</span></span>
        </h2>
      </div>

      <div class="swiper reviews-swiper reveal">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="review-card">
              <div class="review-stars">★★★★★</div>
              <blockquote class="review-quote">"Không gian sang trọng, món ăn đậm đà và phong cách phục vụ vô cùng tinh tế. Một địa điểm tuyệt vời cho gia đình."</blockquote>
              <div class="review-user">
                <img src="https://i.pravatar.cc/150?u=nam" alt="User" />
                <div class="user-info">
                  <span class="user-name">Anh Hoàng Nam</span>
                  <span class="user-desc">Thực khách thân thiết</span>
                </div>
              </div>
            </div>
          </div>

          <div class="swiper-slide">
            <div class="review-card">
              <div class="review-stars">★★★★★</div>
              <blockquote class="review-quote">"Bữa cơm nhà đúng nghĩa trong một không gian nghệ thuật. Từng chi tiết nhỏ đều được chăm chút tỉ mỉ."</blockquote>
              <div class="review-user">
                <img src="https://i.pravatar.cc/150?u=thủy" alt="User" />
                <div class="user-info">
                  <span class="user-name">Chị Thu Thủy</span>
                  <span class="user-desc">Doanh nhân</span>
                </div>
              </div>
            </div>
          </div>

          <div class="swiper-slide">
            <div class="review-card">
              <div class="review-stars">★★★★★</div>
              <blockquote class="review-quote">"Authentic Vietnamese flavors and exceptional hospitality. A true architectural and culinary gem."</blockquote>
              <div class="review-user">
                <img src="https://i.pravatar.cc/150?u=sarah" alt="User" />
                <div class="user-info">
                  <span class="user-name">Sarah Jenkins</span>
                  <span class="user-desc">Travel Blogger</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </section>
`;
