export const initGallery = () => {
  const polaroids = document.querySelectorAll(".polaroid");
  const modal = document.getElementById("gallery-modal");
  const modalImg = document.getElementById("modal-img");
  const modalCaption = document.getElementById("modal-caption");
  const closeBtn = document.querySelector(".gallery-modal-close");
  const overlay = document.querySelector(".gallery-modal-overlay");

  if (!modal || polaroids.length === 0) return;

  const openModal = (polaroid) => {
    const img = polaroid.querySelector("img");
    const caption = polaroid.querySelector("figcaption");
    
    if (img && modalImg) {
      modalImg.src = img.src;
      modalImg.alt = img.alt;
    }
    
    if (caption && modalCaption) {
      modalCaption.textContent = caption.textContent;
    }

    modal.classList.add("is-active");
    document.body.style.overflow = "hidden"; // Prevent scrolling
  };

  const closeModal = () => {
    modal.classList.remove("is-active");
    document.body.style.overflow = "";
  };

  polaroids.forEach(polaroid => {
    polaroid.addEventListener("click", () => openModal(polaroid));
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (overlay) overlay.addEventListener("click", closeModal);

  // Close on ESC key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
};
