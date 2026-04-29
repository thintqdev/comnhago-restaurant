import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initTableScene() {
  const tableTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".table-scene",
      start: "top 75%",
    },
  });

  tableTl
    .from(".table-center", { scale: 0.4, opacity: 0, duration: 0.6, ease: "back.out(1.6)" })
    .from(".bowl", { x: -140, y: -120, rotation: -40, opacity: 0, duration: 0.5 }, "-=0.2")
    .from(".plate", { x: 160, y: -130, rotation: 30, opacity: 0, duration: 0.5 }, "-=0.35")
    .from(".chopstick.left", { x: -180, y: 40, rotation: -25, opacity: 0, duration: 0.45 }, "-=0.35")
    .from(".chopstick.right", { x: 180, y: 40, rotation: 25, opacity: 0, duration: 0.45 }, "-=0.38")
    .from(".cup", { y: 120, opacity: 0, duration: 0.45 }, "-=0.3");
}
