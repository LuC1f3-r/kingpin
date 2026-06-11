import { useEffect, useRef } from "react";

/**
 * EmberField — the hero's living background. Replaces the template
 * Three.js depth-map blob (and with it the entire three/fiber/drei
 * dependency) with a dependency-free 2D canvas.
 *
 * Narrative: the forge bed glows along the base of the hero. Embers
 * rise from it WHITE-HOT, cool through amber, and finish steel-cyan
 * before fading — the same heat→cool story as the preloader, running
 * ambiently. Emission is biased toward the right to balance the
 * left-aligned headline. The cursor gently disturbs nearby embers.
 *
 * prefers-reduced-motion: no particle loop — just the static glow
 * gradients and dot grid.
 */

const HOT  = [255, 241, 214]; // --kvf-ember-white
const WARM = [255, 107, 53];  // --kvf-ember
const COOL = [79, 183, 221];  // --kvf-accent

/** t=0 → white-hot, t=1 → cooled steel-cyan */
const heatColor = (t) => {
  const lerp = (a, b, k) => a + (b - a) * k;
  const [from, to, k] =
    t < 0.45 ? [HOT, WARM, t / 0.45] : [WARM, COOL, (t - 0.45) / 0.55];
  return [
    lerp(from[0], to[0], k) | 0,
    lerp(from[1], to[1], k) | 0,
    lerp(from[2], to[2], k) | 0,
  ];
};

const MAX_EMBERS = 140;

const EmberField = ({ className = "absolute inset-0 h-full w-full" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return; // static layers below are enough

    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let embers = [];
    let raf = 0;
    const pointer = { x: -1e4, y: -1e4 };

    const size = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    window.addEventListener("resize", size);

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    // listen on window so embers react even though text sits above the canvas
    window.addEventListener("mousemove", onMove);

    const spawn = () => {
      // bias emission to the right 60% of the frame (balances left headline)
      const bias = Math.random();
      const x = bias < 0.35 ? Math.random() * w : w * (0.4 + Math.random() * 0.6);
      embers.push({
        x,
        y: h + 4,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(0.35 + Math.random() * 0.9),
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.004 + Math.random() * 0.01,
        size: 0.8 + Math.random() * 1.7,
        born: performance.now(),
        climb: h * (0.45 + Math.random() * 0.45), // how high before it dies
      });
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);

      // keep the population topped up
      const deficit = MAX_EMBERS - embers.length;
      for (let i = 0; i < Math.min(3, deficit); i++) spawn();

      for (const p of embers) {
        p.sway += p.swaySpeed * 16;
        p.x += p.vx + Math.sin(p.sway) * 0.25;
        p.y += p.vy;

        // cursor disturbance: gentle push away within 110px
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 110 * 110 && d2 > 1) {
          const d = Math.sqrt(d2);
          const f = ((110 - d) / 110) * 0.6;
          p.x += (dx / d) * f;
          p.y += (dy / d) * f;
        }

        const rise = h + 4 - p.y; // distance climbed
        const t = Math.min(1, rise / p.climb); // 0 hot → 1 cooled
        if (t >= 1) {
          p.dead = true;
          continue;
        }

        const col = heatColor(t);
        const alpha = t < 0.1 ? t / 0.1 : 1 - Math.max(0, (t - 0.7) / 0.3);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${alpha * 0.9})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(${col[0]},${col[1]},${col[2]},0.8)`;
        ctx.arc(p.x, p.y, p.size * (1 - t * 0.4), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      embers = embers.filter((p) => !p.dead);

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className={className} aria-hidden="true">
      {/* faint cyan dot grid — the cooled, engineered lattice */}
      <div className="dot-grid-bg absolute inset-0 opacity-70" />

      {/* cool ambient wash, upper left (finished-steel zone) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 18% 12%, rgba(79,183,221,0.10), transparent 60%)",
        }}
      />

      {/* the forge bed: ember glow along the base, weighted right */}
      <div
        className="absolute inset-x-0 bottom-0 h-[45%]"
        style={{
          background:
            "radial-gradient(85% 100% at 72% 100%, rgba(255,107,53,0.16), transparent 65%), radial-gradient(60% 70% at 30% 100%, rgba(255,107,53,0.07), transparent 60%)",
        }}
      />

      {/* rising embers */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
};

export default EmberField;
