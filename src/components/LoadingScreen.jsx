import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * LoadingScreen
 *
 * Sequence:
 *  1. Logo rendered at extreme zoom (white fills viewport)
 *  2. Smooth zoom-out → logo settles centred at natural size
 *  3. Brief hold so the mark registers
 *  4. Full-screen overlay fades to transparent → hero is revealed
 *  5. onComplete() fires → App unmounts this component
 */
const LoadingScreen = ({ onComplete }) => {
  const screenRef = useRef(null);
  const logoRef   = useRef(null);

  useEffect(() => {
    if (!screenRef.current || !logoRef.current) return;

    // ── Set starting state (before first paint via useLayoutEffect-like timing)
    gsap.set(logoRef.current, {
      scale: 100,
      transformOrigin: "center center",
      opacity: 1,
    });

    const tl = gsap.timeline({
      onComplete: () => onComplete?.(),
    });

    // Phase 1 — zoom out (1.6 s, expo easing for cinematic deceleration)
    tl.to(logoRef.current, {
      scale: 1,
      duration: 1.6,
      ease: "expo.inOut",
    });

    // Phase 2 — hold the mark on screen (0.45 s)
    tl.to({}, { duration: 0.45 });

    // Phase 3 — full overlay fades to nothing (0.75 s)
    tl.to(screenRef.current, {
      opacity: 0,
      duration: 0.75,
      ease: "power2.inOut",
    });

    return () => tl.kill();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={screenRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020609]"
      /* pointer-events:none not needed — component unmounts after fade */
    >
      <img
        ref={logoRef}
        src="/img/logo.png"
        alt="KingpiN logo"
        /* Base size: 160 × 160 px.
           At scale 18 → ~2880 px → fills any viewport with the white mark.
           filter turns every opaque pixel pure white for the reveal. */
        className="h-40 w-40 object-contain"
        // style={{ filter: "brightness(0) invert(1)" }}
      />
    </div>
  );
};

export default LoadingScreen;
