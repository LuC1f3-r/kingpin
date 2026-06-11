import { useRef } from "react";
import gsap from "gsap";

/**
 * Magnetic — wraps any element and pulls it toward the cursor while
 * hovered, springing back elastically on leave. Part of the Forge
 * interaction language: interactive metal is "drawn" to the hand.
 *
 * strength: 0–1, how far toward the cursor the element travels
 * (0.35 ≈ a confident pull without feeling detached).
 */
const Magnetic = ({ children, strength = 0.35, className = "" }) => {
  const ref = useRef(null);

  const reduced = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e) => {
    const el = ref.current;
    if (!el || reduced()) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.9,
      ease: "elastic.out(1, 0.45)",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </div>
  );
};

export default Magnetic;
