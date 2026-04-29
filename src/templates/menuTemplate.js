export const menuTemplate = `
  <section id="menu" class="section menu-section">
    <div class="container">
      <div class="section-header">
        <p class="kicker reveal"><span class="kicker-script">Thực đơn</span></p>
        <h2 class="reveal artistic-title">
          <span class="title-main">Tinh hoa ẩm thực <br /><span class="title-accent">Hương vị 3 Miền</span></span>
        </h2>
      </div>
      <div class="menu-book-wrap reveal">
        <div class="menu-book-shell">
          <div class="menu-book" id="menu-book">
            <article class="menu-page-lib menu-cover front-cover" data-region="cover">
              <h3>CA GO MENU</h3>
              <p>Thưởng vị thuần túy bữa cơm 3 miền</p>
              <span>Bữa cơm gia đình Việt</span>
            </article>
            <article class="menu-page-lib" data-region="bac">
              <img src="https://www.shutterstock.com/image-vector/vietnamese-spring-rolls-illustration-vector-600nw-2280072263.jpg" alt="Miền Bắc khai vị" />
              <h3>Miền Bắc - Thanh đạm, tao nhã</h3>
              <p class="menu-desc">Món Bắc giữ vị cân bằng, nhẹ nhàng và tinh tế. Cách nêm gia vị tiết chế để làm nổi bật hương thơm từ nguyên liệu theo mùa.</p>
              <ul class="menu-price-list">
                <li><span>Gỏi cuốn tôm thịt</span><strong>89.000</strong></li>
                <li><span>Chả giò hải sản</span><strong>109.000</strong></li>
                <li><span>Nộm đu đủ bò khô</span><strong>95.000</strong></li>
              </ul>
            </article>
            <article class="menu-page-lib" data-region="bac">
              <img src="https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=1000&q=80" alt="Miền Bắc món chính" />
              <h3>Món chính Miền Bắc</h3>
              <p class="menu-desc">Hương vị truyền thống được trình bày trong không gian hiện đại, vẫn giữ tinh thần bữa cơm nhà bên ánh đèn ấm.</p>
              <ul class="menu-price-list">
                <li><span>Chả cá Lã Vọng</span><strong>229.000</strong></li>
                <li><span>Chả mực Hạ Long</span><strong>159.000</strong></li>
                <li><span>Canh cua đồng</span><strong>145.000</strong></li>
              </ul>
            </article>
            <article class="menu-page-lib" data-region="trung">
              <img src="https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?auto=format&fit=crop&w=1000&q=80" alt="Miền Trung đậm đà" />
              <h3>Miền Trung - Đậm đà khó quên</h3>
              <p class="menu-desc">Miền Trung nổi bật bởi vị mắm, vị cay ấm và hương thơm mạnh. Món ăn được cân đối để vẫn dễ ăn với nhiều đối tượng.</p>
              <ul class="menu-price-list">
                <li><span>Bánh xèo tôm thịt</span><strong>145.000</strong></li>
                <li><span>Bún bò Huế đặc biệt</span><strong>139.000</strong></li>
                <li><span>Hến xào sả ớt</span><strong>129.000</strong></li>
              </ul>
            </article>
            <article class="menu-page-lib" data-region="trung">
              <img src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1000&q=80" alt="Miền Trung món đặc trưng" />
              <h3>Món kéo vị Miền Trung</h3>
              <p class="menu-desc">Từ món nước đến món nướng, từng đĩa ăn đều hướng đến trải nghiệm trọn vị và để chia sẻ trong bữa ăn gia đình.</p>
              <ul class="menu-price-list">
                <li><span>Mì Quảng tôm thịt</span><strong>119.000</strong></li>
                <li><span>Nem lụi nướng</span><strong>139.000</strong></li>
                <li><span>Cá nướng nghệ</span><strong>189.000</strong></li>
              </ul>
            </article>
            <article class="menu-page-lib" data-region="nam">
              <img src="https://images.unsplash.com/photo-1514517220017-8ce97a34a7b6?auto=format&fit=crop&w=1000&q=80" alt="Miền Nam cơm nhà" />
              <h3>Miền Nam - Ngọt dịu, phong phú</h3>
              <p class="menu-desc">Món Nam mang độ đậm vừa phải, hương ngọt nhẹ, phù hợp cho bữa ăn dài với nhiều lựa chọn kết hợp.</p>
              <ul class="menu-price-list">
                <li><span>Cá lóc mắm me</span><strong>199.000</strong></li>
                <li><span>Cơm tấm sườn bì chả</span><strong>129.000</strong></li>
                <li><span>Canh chua cá</span><strong>135.000</strong></li>
              </ul>
            </article>
            <article class="menu-page-lib" data-region="nam">
              <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80" alt="Tráng miệng và đồ uống" />
              <h3>Tráng miệng và đồ uống</h3>
              <p class="menu-desc">Kết bữa ăn bằng món ngọt truyền thống và thức uống thanh nhẹ, giữ lại dư vị dễ nhớ của ẩm thực Việt.</p>
              <ul class="menu-price-list">
                <li><span>Chè truyền thống</span><strong>65.000</strong></li>
                <li><span>Bánh flan sữa dừa</span><strong>59.000</strong></li>
                <li><span>Trà thảo mộc</span><strong>49.000</strong></li>
              </ul>
            </article>
            <article class="menu-page-lib menu-cover back-cover" data-region="cover">
              <h3>Cảm ơn quý khách</h3>
              <p>Hẹn gặp bạn tại Cá Gỗ Restaurant.</p>
              <span>96 Trường Chinh, Hà Tĩnh</span>
            </article>
          </div>
        </div>
        <div class="menu-book-controls">
          <button type="button" class="menu-control" id="menu-prev">Trước</button>
          <span id="menu-page-indicator">Trang 1 / 3</span>
          <button type="button" class="menu-control" id="menu-next">Sau</button>
        </div>
      </div>
    </div>
  </section>
`;
