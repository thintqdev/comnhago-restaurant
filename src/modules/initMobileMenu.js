export const initMobileMenu = () => {
  const toggleBtn = document.getElementById("mobile-menu-btn");
  const navMenu = document.getElementById("nav-menu");

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener("click", () => {
    navMenu.classList.toggle("is-active");
    toggleBtn.classList.toggle("is-active");
  });

  // Close menu when clicking a link
  const links = navMenu.querySelectorAll(".nav-link");
  links.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-active");
      toggleBtn.classList.remove("is-active");
    });
  });
};
