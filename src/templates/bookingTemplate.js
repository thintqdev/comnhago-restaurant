export const bookingTemplate = `
  <section id="booking" class="section booking reveal">
    <div class="container">
      <div class="section-header">
        <p class="kicker reveal"><span class="kicker-script">Đặt bàn</span></p>
        <h2 class="reveal artistic-title">
          <span class="title-main">Giữ chỗ cho <br /><span class="title-accent">bữa tối trọn vẹn</span></span>
        </h2>
      </div>

      <div class="booking-wrapper reveal">
        <div class="booking-info">
          <div class="info-block">
            <h3>Địa chỉ</h3>
            <p>278 Võ Nguyên Giáp, Đà Nẵng</p>
          </div>
          <div class="info-block">
            <h3>Liên hệ</h3>
            <p>Tel: +84 236 2228 666</p>
            <p>Email: nhacago.restaurant@gmail.com</p>
          </div>
          <div class="info-block">
            <h3>Giờ mở cửa</h3>
            <p>Sáng: 07:00 - 14:00</p>
            <p>Chiều: 17:00 - 22:00</p>
          </div>
        </div>

        <form class="booking-form-box">
          <div class="form-grid">
            <div class="input-group">
              <label>Họ & Tên</label>
              <input type="text" placeholder="Nguyễn Văn A" required />
            </div>
            <div class="input-group">
              <label>Số điện thoại</label>
              <input type="tel" placeholder="0905 xxx xxx" required />
            </div>
            <div class="input-group">
              <label>Ngày đặt bàn</label>
              <input type="date" required />
            </div>
            <div class="input-group">
              <label>Số lượng khách</label>
              <select>
                <option>1 - 2 người</option>
                <option>3 - 5 người</option>
                <option>Trên 5 người</option>
                <option>Tiệc đoàn (Liên hệ)</option>
              </select>
            </div>
          </div>
          <div class="input-group full-width">
            <label>Ghi chú đặc biệt</label>
            <textarea rows="3" placeholder="Yêu cầu về vị trí bàn, dị ứng thực phẩm..."></textarea>
          </div>
          <button type="submit" class="btn btn-booking">Xác nhận đặt bàn</button>
        </form>
      </div>
    </div>
  </section>
`;
