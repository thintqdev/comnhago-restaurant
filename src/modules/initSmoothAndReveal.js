import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

export function initSmoothAndReveal() {
  const lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  gsap.from(".hero-title", {
    y: 60,
    opacity: 0,
    duration: 1.1,
    ease: "power3.out",
  });

  gsap.from(".hero-sub, .btn", {
    y: 24,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    delay: 0.3,
    ease: "power2.out",
  });

  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.from(el, {
      y: 50,
      opacity: 0,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  gsap.to(".hero-bg", {
    yPercent: 18,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}
