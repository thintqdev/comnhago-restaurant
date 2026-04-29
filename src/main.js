import "./style.css";
import { homeTemplate } from "./templates";
import { initMenuBook } from "./modules/initMenuBook";
import { initReviews } from "./modules/initReviews";
import { initSmoothAndReveal } from "./modules/initSmoothAndReveal";
import { initTableScene } from "./modules/initTableScene";
import { initOrbitScroll } from "./modules/initOrbitScroll";
import { initStoryDishes } from "./modules/initStoryDishes";
import { initGallery } from "./modules/initGallery";
import { initMobileMenu } from "./modules/initMobileMenu";

document.querySelector("#app").innerHTML = homeTemplate;

initSmoothAndReveal();
initTableScene();
initReviews();
initMenuBook();
initOrbitScroll();
initStoryDishes();
initGallery();
initMobileMenu();
