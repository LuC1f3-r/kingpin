import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * LoadingScreen — ApeChain-style kinetic preloader on the brand field.
 *
 * A full molten-gold screen. "KINGPIN" springs up letter-by-letter from a
 * squashed state (elastic ease), a counter runs 0→100 in the corner, then
 * the entire screen wipes upward to reveal the hero.
 *
 * prefers-reduced-motion: letters shown static, short fade instead.
 * Failsafe: if GSAP's rAF ticker is paused (hidden/background tab) the
 * overlay force-clears after 8s so nobody is trapped behind it.
 */

const LETTERS = "KINGPIN".split("");

const LoadingScreen = ({ onComplete }) => {
  const screenRef  = useRef(null);
  const lettersRef = useRef([]);
  const counterRef = useRef(null);
  const labelRef   = useRef(null);

  useEffect(() => {
    const screen = screenRef.current;
    const letters = lettersRef.current.filter(Boolean);
    const counter = counterRef.current;
    if (!screen || letters.length === 0) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    /* ── Reduced motion: static wordmark, quick fade ─────────────────────── */
    if (reduced) {
      if (counter) counter.textContent = "100";
      const tl = gsap.timeline({ onComplete: () => onComplete?.() });
      tl.to({}, { duration: 0.5 });
      tl.to(screen, { opacity: 0, duration: 0.45, ease: "power2.inOut" });
      return () => tl.kill();
    }

    /* ── Failsafe for hidden tabs (rAF paused → timeline frozen) ─────────── */
    let done = false;
    const failsafe = setTimeout(() => {
      if (done) return;
      done = true;
      tl.kill();
      screen.style.transform = "translateY(-100%)";
      onComplete?.();
    }, 8000);

    const tl = gsap.timeline({
      onComplete: () => {
        if (done) return;
        done = true;
        clearTimeout(failsafe);
        onComplete?.();
      },
    });

    /* letters start squashed flat at the baseline */
    gsap.set(letters, {
      scaleY: 0.04,
      scaleX: 1.25,
      yPercent: 46,
      opacity: 0,
      transformOrigin: "50% 100%",
    });
    gsap.set(labelRef.current, { opacity: 0, y: 10 });

    /* counter 0 → 100 runs under the letter springs */
    const progress = { v: 0 };
    tl.to(progress, {
      v: 100,
      duration: 2.2,
      ease: "power1.inOut",
      onUpdate: () => {
        if (counter)
          counter.textContent = String(Math.round(progress.v)).padStart(2, "0");
      },
    });

    /* each letter springs from squashed to full height, elastic */
    tl.to(
      letters,
      {
        scaleY: 1,
        scaleX: 1,
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        ease: "elastic.out(1, 0.42)",
        stagger: 0.085,
      },
      0.25,
    );

    /* eyebrow settles in once the name has landed */
    tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.45 }, "-=0.7");

    /* brief hold on the finished mark */
    tl.to({}, { duration: 0.4 });

    /* the wipe: whole screen slides up like a curtain */
    tl.to(screen, {
      yPercent: -100,
      duration: 0.85,
      ease: "power4.inOut",
    });

    return () => {
      clearTimeout(failsafe);
      tl.kill();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={screenRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#e8a33d] will-change-transform"
    >
      {/* faint hot-spot behind the wordmark */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 52%, rgba(255,210,138,0.55), transparent 70%)",
        }}
      />

      {/* KINGPIN — kinetic letters */}
      <div
        className="relative flex items-end"
        style={{ fontFeatureSettings: '"ss01" on' }}
        aria-label="Kingpin"
        role="img"
      >
        {LETTERS.map((ch, i) => (
          <span
            key={i}
            ref={(el) => (lettersRef.current[i] = el)}
            className="inline-block font-zentry font-black uppercase leading-[0.85] text-[#140d04]"
            style={{ fontSize: "clamp(3.2rem, 15vw, 11rem)" }}
            aria-hidden="true"
          >
            {ch}
          </span>
        ))}
      </div>

      {/* eyebrow */}
      <p
        ref={labelRef}
        className="mt-6 font-general text-[10px] uppercase tracking-[0.38em] text-[#140d04]/70"
      >
        Vision Forge — commands crafted for conquerors
      </p>

      {/* counter, bottom-right like a forge gauge */}
      <div
        ref={counterRef}
        className="absolute bottom-8 right-8 font-zentry text-3xl font-black tabular-nums text-[#140d04]/80 sm:bottom-10 sm:right-12 sm:text-4xl"
        style={{ fontFeatureSettings: '"ss01" on' }}
      >
        00
      </div>
    </div>
  );
};

export default LoadingScreen;
