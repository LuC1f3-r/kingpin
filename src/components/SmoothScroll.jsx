import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothScroll — site-wide Lenis momentum scrolling, driven by GSAP's
 * ticker so Lenis and ScrollTrigger share one clock (no pin judder).
 *
 * Mount once at the app root. Disabled under prefers-reduced-motion —
 * the site falls back to native scrolling.
 *
 * Other modules (e.g. router section links) can grab the live instance
 * via getLenis() to do eased programmatic scrolls.
 */
let lenisInstance = null;
export const getLenis = () => lenisInstance;

const SmoothScroll = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisInstance = lenis;

    // single clock: GSAP ticker drives Lenis, Lenis drives ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
};

export default SmoothScroll;
