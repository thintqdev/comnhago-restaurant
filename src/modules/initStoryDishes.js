export function initStoryDishes() {
  const modal = document.getElementById("dish-modal");
  if (!modal) return;

  const overlay = modal.querySelector(".dish-modal-overlay");
  const closeBtn = modal.querySelector(".dish-modal-close");
  const modalTitle = document.getElementById("dish-modal-title");
  const modalDesc = document.getElementById("dish-modal-desc");
  const dishWrappers = document.querySelectorAll(".story-dish-wrapper");

  function openModal(name, desc) {
    modalTitle.textContent = name;
    modalDesc.textContent = desc;
    modal.classList.add("is-active");
  }

  function closeModal() {
    modal.classList.remove("is-active");
  }

  dishWrappers.forEach((wrapper) => {
    wrapper.addEventListener("click", () => {
      const name = wrapper.getAttribute("data-name");
      const desc = wrapper.getAttribute("data-desc");
      openModal(name, desc);
    });
  });

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  // Allow closing on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-active")) {
      closeModal();
    }
  });
}
