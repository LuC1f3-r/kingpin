import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * LoadingScreen — "The Forge" preloader.
 *
 * Narrative: raw vision is forged into infrastructure. A counter climbs
 * 0 → 100 while the metal it represents COOLS from white-hot → amber →
 * steel-cyan. A molten progress bar throws sparks from its leading edge.
 * When the forge reaches 100 (fully cooled, finished steel) the overlay
 * lifts to reveal the hero.
 *
 * Respects prefers-reduced-motion: skips the spark canvas + long cool and
 * does a short, static fade instead.
 */

/* ── Heat → cool colour ramp (white-hot → amber → steel-cyan) ─────────────── */
const HOT  = [255, 241, 214]; // --kvf-ember-white
const WARM = [255, 107, 53];  // --kvf-ember
const COOL = [79, 183, 221];  // --kvf-accent

/** Interpolate the heat ramp. t=0 → white-hot, t=1 → cooled steel-cyan. */
const heatColor = (t) => {
  const lerp = (a, b, k) => Math.round(a + (b - a) * k);
  let from, to, k;
  if (t < 0.5) {
    from = HOT;  to = WARM; k = t / 0.5;
  } else {
    from = WARM; to = COOL; k = (t - 0.5) / 0.5;
  }
  return [
    lerp(from[0], to[0], k),
    lerp(from[1], to[1], k),
    lerp(from[2], to[2], k),
  ];
};
const rgb = ([r, g, b], a = 1) =>
  a === 1 ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${a})`;

const LoadingScreen = ({ onComplete }) => {
  const screenRef = useRef(null);
  const numberRef = useRef(null);
  const trackRef  = useRef(null);
  const fillRef   = useRef(null);
  const canvasRef = useRef(null);
  const logoRef   = useRef(null);
  const labelRef  = useRef(null);

  useEffect(() => {
    const screen = screenRef.current;
    const number = numberRef.current;
    const fill   = fillRef.current;
    if (!screen || !number || !fill) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    /* ── Reduced-motion path: short, static reveal ────────────────────────── */
    if (reduced) {
      number.textContent = "100";
      const c = rgb(COOL);
      number.style.color = c;
      fill.style.width = "100%";
      fill.style.background = c;
      const tl = gsap.timeline({ onComplete: () => onComplete?.() });
      tl.to({}, { duration: 0.4 });
      tl.to(screen, { opacity: 0, duration: 0.5, ease: "power2.inOut" });
      return () => tl.kill();
    }

    /* ── Spark system (canvas, capped, emits from the bar's leading edge) ─── */
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let sparks = [];
    let raf = 0;
    const progressRef = { v: 0 }; // 0 → 1, shared with the GSAP tween

    const sizeCanvas = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    sizeCanvas();
    window.addEventListener("resize", sizeCanvas);

    const spawnSparks = () => {
      if (!canvas || !fill) return;
      const heat = 1 - progressRef.v;          // hotter early → more sparks
      const rate = Math.round(heat * 3 + 0.5); // 0–3 per frame
      const canvasBox = canvas.getBoundingClientRect();
      const fillBox = fill.getBoundingClientRect();
      // leading edge of the molten fill, in canvas-local coords
      const ex = fillBox.right - canvasBox.left;
      const ey = fillBox.top + fillBox.height / 2 - canvasBox.top;
      for (let i = 0; i < rate; i++) {
        sparks.push({
          x: ex,
          y: ey,
          vx: (Math.random() - 0.35) * 2.4,
          vy: -(Math.random() * 3 + 1.2),
          life: 1,
          decay: Math.random() * 0.03 + 0.02,
          size: Math.random() * 1.8 + 0.6,
        });
      }
      if (sparks.length > 260) sparks = sparks.slice(-260);
    };

    const renderSparks = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      spawnSparks();
      for (const s of sparks) {
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.08; // gravity
        s.vx *= 0.99;
        s.life -= s.decay;
        if (s.life <= 0) continue;
        // sparks glow amber→white at the tip, fading as they fall
        const a = Math.max(0, s.life);
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,${Math.round(140 + 90 * a)},${Math.round(
          60 * a,
        )},${a})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(255,140,50,0.9)";
        ctx.arc(s.x, s.y, s.size * a, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      sparks = sparks.filter((s) => s.life > 0);
      raf = requestAnimationFrame(renderSparks);
    };
    raf = requestAnimationFrame(renderSparks);

    /* ── Master timeline: counter climbs while the metal cools ────────────── */
    const tl = gsap.timeline({
      onComplete: () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", sizeCanvas);
        onComplete?.();
      },
    });

    // entrance: logo + bar settle in
    gsap.set([logoRef.current, labelRef.current], { opacity: 0, y: 12 });
    tl.to([logoRef.current, labelRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.12,
    });

    // forge: progress 0 → 1, drives number, bar width, and heat colour
    tl.to(
      progressRef,
      {
        v: 1,
        duration: 2.4,
        ease: "power1.inOut",
        onUpdate: () => {
          const p = progressRef.v;
          const col = heatColor(p);
          number.textContent = String(Math.round(p * 100)).padStart(2, "0");
          number.style.color = rgb(col);
          number.style.textShadow = `0 0 ${28 * (1 - p) + 6}px ${rgb(
            col,
            0.55,
          )}`;
          fill.style.width = `${p * 100}%`;
          fill.style.background = `linear-gradient(90deg, ${rgb(
            heatColor(Math.max(0, p - 0.25)),
            0.65,
          )}, ${rgb(col)})`;
          fill.style.boxShadow = `0 0 ${22 * (1 - p) + 8}px ${rgb(col, 0.8)}`;
        },
      },
      "-=0.2",
    );

    // hold the finished, cooled mark briefly
    tl.to({}, { duration: 0.35 });

    // fade the label, then lift the whole overlay to reveal the hero
    tl.to(labelRef.current, { opacity: 0, duration: 0.3 }, "<");
    tl.to(screen, {
      opacity: 0,
      duration: 0.7,
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", sizeCanvas);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={screenRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020609]"
    >
      {/* ambient forge glow rising from below */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "radial-gradient(80% 100% at 50% 100%, rgba(255,107,53,0.10), transparent 70%)",
        }}
      />

      {/* logo mark */}
      <img
        ref={logoRef}
        src="/img/logo.png"
        alt="KingpiN Vision Forge"
        className="mb-10 h-14 w-14 object-contain"
      />

      {/* the cooling counter */}
      <div
        ref={numberRef}
        className="font-zentry text-7xl font-black tabular-nums sm:text-8xl"
        style={{ fontFeatureSettings: '"ss01" on', color: rgb(HOT) }}
      >
        00
      </div>

      {/* molten progress bar + spark canvas */}
      <div className="relative mt-8 w-[min(420px,72vw)]">
        <div
          ref={trackRef}
          className="h-[3px] w-full overflow-hidden rounded-full"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <div ref={fillRef} className="h-full w-0 rounded-full" />
        </div>
        {/* sparks render above the bar's leading edge */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute left-0 h-24 w-full"
          style={{ bottom: "-2px" }}
        />
      </div>

      {/* tagline */}
      <p
        ref={labelRef}
        className="mt-7 font-general text-[10px] uppercase tracking-[0.32em] text-white/35"
      >
        Forging vision into infrastructure
      </p>
    </div>
  );
};

export default LoadingScreen;
