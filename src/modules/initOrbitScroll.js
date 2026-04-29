/**
 * initOrbitScroll
 * Khi scroll xuống, vòng .food-orbit xoay theo chiều kim đồng hồ.
 * Các ảnh .food-orb-img counter-rotate để luôn đứng thẳng.
 * Dùng rAF + lerp để animation mượt.
 */
export function initOrbitScroll() {
  const orbit = document.getElementById("food-orbit");
  if (!orbit) return;

  const imgs = orbit.querySelectorAll(".food-orb-img");

  let targetAngle = 0; // góc đích (tính từ scroll)
  let currentAngle = 0; // góc đang render (lerp)
  let rafId = null;

  // Hệ số: cuộn 1px → bao nhiêu độ
  const SCROLL_FACTOR = 0.04;
  // Lerp speed (0 < x < 1 — càng lớn càng nhanh bắt kịp)
  const LERP = 0.08;

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function tick() {
    // Lerp đến targetAngle
    currentAngle = lerp(currentAngle, targetAngle, LERP);

    // Chỉ render khi delta đủ lớn (tránh vẽ thừa)
    if (Math.abs(targetAngle - currentAngle) > 0.01) {
      orbit.style.transform = `rotate(${currentAngle}deg)`;

      // Counter-rotate từng ảnh để không bị xoay theo
      imgs.forEach((img) => {
        img.style.transform = `scale(1.09) rotate(${-currentAngle}deg)`;
      });

      rafId = requestAnimationFrame(tick);
    } else {
      // Snap đến đích và dừng
      currentAngle = targetAngle;
      orbit.style.transform = `rotate(${currentAngle}deg)`;
      imgs.forEach((img) => {
        img.style.transform = `scale(1.09) rotate(${-currentAngle}deg)`;
      });
      rafId = null;
    }
  }

  function onScroll() {
    targetAngle = window.scrollY * SCROLL_FACTOR;

    // Khởi động rAF nếu chưa chạy
    if (!rafId) {
      rafId = requestAnimationFrame(tick);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
}
