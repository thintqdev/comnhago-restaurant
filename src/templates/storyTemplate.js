export const storyTemplate = `
  <section id="story" class="section story-section reveal" style="border-top: 1px solid rgba(216, 159, 92, 0.2); border-bottom: 1px solid rgba(216, 159, 92, 0.2);">
    <div class="container">
      <div class="section-header">
        <p class="kicker reveal"><span class="kicker-script">Story</span></p>
        <h2 class="reveal artistic-title">
          <span class="title-main">Mua ký ức về <br /><span class="title-accent">bên mâm cơm Việt</span></span>
        </h2>
      </div>

      <div class="story-3col">
        <!-- LEFT: story copy -->
        <div class="story-copy">
          <p>
            Từ ánh đèn dầu, gốm Bát Tràng đến cách bày mâm cơm tròn vẹn, mọi chi tiết đều hướng tới trải nghiệm
            "ăn ngon như ở nhà" nhưng vẫn sang trọng cho bữa tối đặc biệt.
          </p>
        <div class="story-mini-cards">
          <article class="premium-feature-card reveal">
            <div class="feature-index">01</div>
            <div class="feature-content">
              <h3>Đèn dầu</h3>
              <p>Gợi nhớ không gian bữa cơm truyền thống, ấm cúng và gần gũi như thuở nào.</p>
            </div>
          </article>
          <article class="premium-feature-card reveal">
            <div class="feature-index">02</div>
            <div class="feature-content">
              <h3>Gốm Bát Tràng</h3>
              <p>Tôn vinh nét đẹp thủ công tinh xảo, chế tác riêng cho trải nghiệm ẩm thực.</p>
            </div>
          </article>
          <article class="premium-feature-card reveal">
            <div class="feature-index">03</div>
            <div class="feature-content">
              <h3>Mâm cơm nhà</h3>
              <p>Hương vị của sự sẻ chia, kết nối những tâm hồn đồng điệu bên bàn ăn.</p>
            </div>
          </article>
        </div>
      </div>

      <!-- MIDDLE: Map -->
      <div class="story-map reveal">
        <div class="map-wrapper">
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Flag_map_of_Vietnam.svg" alt="Ban do Viet Nam" />
          <div class="map-pin ha-tinh-pin">
            <div class="pin-dot"></div>
            <div class="pin-label">Hà Tĩnh</div>
          </div>
        </div>
      </div>

      <!-- RIGHT: Foods (Dishes) -->
      <div class="story-dishes reveal">
        
        <div class="story-dish-wrapper" data-name="Phở Bò Hương Vị Bắc" data-desc="Nước dùng thanh ngọt hầm từ xương bò suốt 12 tiếng, bánh phở mềm dai chuẩn vị truyền thống Hà Nội.">
          <div class="dish-orbit"></div>
          <figure class="story-dish">
            <img src="https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80" alt="Phở bò" />
          </figure>
          <div class="dish-badge">Bắc</div>
          <div class="dish-glow"></div>
        </div>
        
        <div class="story-dish-wrapper" data-name="Bánh Xèo Giòn Rụm" data-desc="Đặc sản miền Trung với vỏ bánh giòn tan, nhân tôm thịt đậm đà, ăn kèm rau sống tươi mát và nước chấm cay nồng.">
          <div class="dish-orbit"></div>
          <figure class="story-dish">
            <img src="https://www.shutterstock.com/image-vector/vietnamese-shrimp-crepe-illustration-vector-600nw-2280072263.jpg" alt="Bánh xèo" />
          </figure>
          <div class="dish-badge">Trung</div>
          <div class="dish-glow"></div>
        </div>

        <div class="story-dish-wrapper" data-name="Cơm Tấm Sườn Đũa" data-desc="Hạt tấm mềm tơi, sườn nướng than hoa thơm lừng quyện cùng mỡ hành béo ngậy, một tinh hoa ẩm thực Sài Gòn.">
          <div class="dish-orbit"></div>
          <figure class="story-dish">
            <img src="https://mir-s3-cdn-cf.behance.net/projects/404/422d5d186468747.Y3JvcCw5MDMsNzA2LDAsMTM.png" alt="Cơm tấm" />
          </figure>
          <div class="dish-badge">Nam</div>
          <div class="dish-glow"></div>
        </div>

        <div class="story-dish-wrapper" data-name="Bún Chả Hà Nội" data-desc="Thịt nướng than thơm nức, chả viên đậm đà ăn kèm nước chấm chua ngọt và đu đủ xanh giòn sần sật.">
          <div class="dish-orbit"></div>
          <figure class="story-dish">
            <img src="https://www.lorca.vn/wp-content/uploads/2023/06/bun-cha6.jpg" alt="Bún chả" />
          </figure>
          <div class="dish-badge">Bắc</div>
          <div class="dish-glow"></div>
        </div>

        <div class="story-dish-wrapper" data-name="Gỏi Cuốn Tươi Mát" data-desc="Tôm thịt tươi ngon cuộn trong bánh tráng mỏng, ăn kèm rau sống và nước tương đậu phộng béo ngậy.">
          <div class="dish-orbit"></div>
          <figure class="story-dish">
            <img src="https://thumbs.dreamstime.com/b/goi-cuon-wan-background-design-cartoon-style-goi-cuon-wan-background-design-cartoon-style-vector-design-illustration-262842964.jpg" alt="Gỏi cuốn" />
          </figure>
          <div class="dish-badge">Nam</div>
          <div class="dish-glow"></div>
        </div>

        <div class="story-dish-wrapper" data-name="Bánh Mì Sài Gòn" data-desc="Ổ bánh mì giòn tan với nhân pate béo ngậy, thịt nguội, chả lụa và đồ chua thanh mát, biểu tượng đường phố.">
          <div class="dish-orbit"></div>
          <figure class="story-dish">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrWV58K7ybr0EIn60G09JgWgj4XL9RRTuHRA&s" alt="Bánh mì" />
          </figure>
          <div class="dish-badge">Nam</div>
          <div class="dish-glow"></div>
        </div>

      </div>

    </div>

    <!-- Dish Modal -->
    <div id="dish-modal" class="dish-modal">
      <div class="dish-modal-overlay"></div>
      <div class="dish-modal-content">
        <button class="dish-modal-close" aria-label="Close">&times;</button>
        <h3 id="dish-modal-title" class="artistic-title"></h3>
        <p id="dish-modal-desc"></p>
      </div>
    </div>
  </section>
`;

