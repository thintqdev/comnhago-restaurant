import Swiper from "swiper";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function initReviews() {
  new Swiper(".reviews-swiper", {
    modules: [Navigation, Pagination, Autoplay, EffectFade],
    slidesPerView: 1,
    effect: "fade",
    autoplay: { delay: 3500, disableOnInteraction: false },
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  });
}
