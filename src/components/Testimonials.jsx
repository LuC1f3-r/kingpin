import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ── Constants ─────────────────────────────────────────────────────────────── */
const CARD_W   = 420;   // px — 30% bigger than previous 320
const CARD_H   = 380;   // px — fixed height for uniform strip
const GAP      = 28;    // px — gap between cards
const TOTAL    = 7;
const CYCLE_MS = 5000;

/* ── Testimonials data ─────────────────────────────────────────────────────── */
const testimonials = [
  {
    quote:
      "KingpiN Vision Forge didn't just build us a website — they engineered a growth machine. Within 90 days of launch, our conversion rate doubled and organic traffic tripled.",
    name: "Marcus Reid",
    role: "CEO, Vanguard Systems",
    initial: "M",
  },
  {
    quote:
      "The attention to brand detail was unmatched. Every pixel, every interaction felt intentional. Our rebrand became our single most powerful sales tool.",
    name: "Sophia Chen",
    role: "Founder, Oracle Labs",
    initial: "S",
  },
  {
    quote:
      "They understood our technical requirements from day one and delivered a SaaS platform that scaled to 10k users without a single incident or downtime.",
    name: "Daniel Okafor",
    role: "CTO, Titan Cloud",
    initial: "D",
  },
  {
    quote:
      "KingpiN Vision Forge built our entire digital presence from zero. The speed, the quality, the professionalism — genuinely unlike any agency we've ever worked with.",
    name: "Amara Osei",
    role: "CMO, Zenith Collective",
    initial: "A",
  },
  {
    quote:
      "We came in with a rough idea and left with a product our investors couldn't stop talking about. KingpiN Vision Forge turned complete chaos into absolute clarity.",
    name: "Ryan Holloway",
    role: "Co-founder, Nexus Ventures",
    initial: "R",
  },
  {
    quote:
      "Our mobile app went live on time, on budget, and with zero bugs at launch. That never happens. KingpiN Vision Forge made it happen — twice.",
    name: "Lena Müller",
    role: "Product Lead, Orbit Mobile",
    initial: "L",
  },
  {
    quote:
      "The brand identity they crafted speaks before we even say a word in a pitch. Clients trust us more from our website alone. ROI from day one.",
    name: "James Okonkwo",
    role: "Director, Apex Digital",
    initial: "J",
  },
];

/* ── TiltCard ──────────────────────────────────────────────────────────────── */
const TiltCard = ({ quote, name, role, initial, distance }) => {
  const cardRef  = useRef(null);
  const isActive = distance === 0;

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect    = el.getBoundingClientRect();
    const x       = e.clientX - rect.left;
    const y       = e.clientY - rect.top;
    const centerX = rect.width  / 2;
    const centerY = rect.height / 2;
    const rotateX = gsap.utils.clamp(-7, 7, ((y - centerY) / centerY) * -7);
    const rotateY = gsap.utils.clamp(-7, 7, ((x - centerX) / centerX) *  7);
    gsap.to(el, {
      rotateX, rotateY,
      transformPerspective: 700,
      transformOrigin: "center center",
      duration: 0.18, ease: "power2.out", overwrite: true,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0, rotateY: 0,
      duration: 0.45, ease: "power3.out", overwrite: true,
    });
  };

  /* Derived visual props based on distance from active */
  const blurPx  = distance === 0 ? 0   : distance === 1 ? 3   : 7;
  const opacity = distance === 0 ? 1   : distance === 1 ? 0.4 : 0.18;
  const bdrClr  = isActive
    ? "rgba(79,183,221,0.50)"
    : "rgba(79,183,221,0.06)";
  const bgClr   = isActive
    ? "rgba(13,24,37,0.95)"
    : "rgba(6,13,20,0.80)";
  const shadow  = isActive
    ? "0 0 50px rgba(79,183,221,0.22), 0 0 16px rgba(79,183,221,0.12)"
    : "none";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseLeave}
      className="flex shrink-0 cursor-default flex-col justify-between rounded-2xl border p-8"
      style={{
        width:           `${CARD_W}px`,
        height:          `${CARD_H}px`,
        borderColor:     bdrClr,
        backgroundColor: bgClr,
        boxShadow:       shadow,
        filter:          `blur(${blurPx}px)`,
        opacity,
        transition:      "border-color 0.65s ease, background-color 0.65s ease, box-shadow 0.65s ease, filter 0.65s ease, opacity 0.65s ease",
        willChange:      "transform, filter, opacity",
      }}
    >
      {/* Quote mark */}
      <span
        className="block font-zentry text-6xl font-black leading-none"
        style={{
          fontFeatureSettings: '"ss01" on',
          color:   "#4fb7dd",
          opacity: isActive ? 0.9 : 0.3,
          transition: "opacity 0.65s ease",
        }}
      >
        "
      </span>

      {/* Quote text */}
      <p className="mt-4 flex-1 font-circular-web text-[15px] leading-relaxed text-[#eef2ff]/80">
        {quote}
      </p>

      {/* Divider */}
      <div
        className="my-6 h-px w-full"
        style={{
          backgroundColor: isActive ? "rgba(79,183,221,0.35)" : "rgba(255,255,255,0.07)",
          transition: "background-color 0.65s ease",
        }}
      />

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-zentry text-sm font-black text-black"
          style={{
            background:  isActive ? "#4fb7dd" : "rgba(79,183,221,0.35)",
            transition:  "background 0.65s ease",
            fontFeatureSettings: '"ss01" on',
          }}
        >
          {initial}
        </div>
        <div>
          <p className="font-general text-[12px] font-semibold uppercase tracking-wider text-[#eef2ff]/80">
            {name}
          </p>
          <p className="font-general text-[11px] tracking-wide text-[#eef2ff]/65">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ── Testimonials ──────────────────────────────────────────────────────────── */
const Testimonials = () => {
  const sectionRef   = useRef(null);
  const containerRef = useRef(null);
  const trackRef     = useRef(null);
  const initialized  = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);

  /* Helper: compute x so card[index] sits in the viewport center */
  const getX = (index) => {
    const cw = containerRef.current?.offsetWidth ?? window.innerWidth;
    return cw / 2 - index * (CARD_W + GAP) - CARD_W / 2;
  };

  /* Position track — set instantly on mount, animate on every index change */
  useEffect(() => {
    if (!trackRef.current) return;
    const x = getX(activeIndex);
    if (!initialized.current) {
      gsap.set(trackRef.current, { x });
      initialized.current = true;
    } else {
      gsap.to(trackRef.current, { x, duration: 0.85, ease: "power2.inOut" });
    }
  }, [activeIndex]);   // eslint-disable-line react-hooks/exhaustive-deps

  /* Re-center on resize */
  useEffect(() => {
    const onResize = () => {
      if (!initialized.current) return;
      gsap.set(trackRef.current, { x: getX(activeIndex) });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeIndex]);   // eslint-disable-line react-hooks/exhaustive-deps

  /* Auto-advance every 5 s */
  useEffect(() => {
    const id = setInterval(
      () => setActiveIndex((i) => (i + 1) % TOTAL),
      CYCLE_MS,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="flex h-dvh flex-col justify-between overflow-hidden bg-[#060d14] pb-14 pt-20"
    >
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="px-10 md:px-16 lg:px-20">
        <p className="mb-3 font-general text-[10px] uppercase tracking-[0.28em] text-[#eef2ff]/30">
          Client Voices
        </p>
        <AnimatedTitle
          title="What our cl<b>i</b>ents <br /> are say<b>i</b>ng"
          sectionId="#testimonials"
          containerClass="text-[#eef2ff]"
        />
      </div>

      {/* ── Spotlight card strip ─────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative w-full"
        style={{
          /* Radial vignette — centre is fully visible, edges fade out */
          maskImage:
            "radial-gradient(ellipse 62% 100% at 50% 50%, black 0%, black 32%, rgba(0,0,0,0.45) 55%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 62% 100% at 50% 50%, black 0%, black 32%, rgba(0,0,0,0.45) 55%, transparent 80%)",
        }}
      >
        {/* Ambient glow behind the active-card position */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width:    `${CARD_W * 1.4}px`,
            height:   `${CARD_H * 1.4}px`,
            background:
              "radial-gradient(ellipse at center, rgba(79,183,221,0.10) 0%, transparent 70%)",
            filter: "blur(18px)",
          }}
        />

        <div
          ref={trackRef}
          className="flex"
          style={{ gap: `${GAP}px` }}
        >
          {testimonials.map((t, i) => (
            <TiltCard
              key={t.name}
              {...t}
              distance={Math.abs(i - activeIndex)}
            />
          ))}
        </div>
      </div>

      {/* ── Progress dots ────────────────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`Testimonial ${i + 1}`}
            className="rounded-full transition-all duration-500"
            style={{
              height:          "6px",
              width:           i === activeIndex ? "2rem" : "6px",
              backgroundColor: i === activeIndex
                ? "#4fb7dd"
                : "rgba(255,255,255,0.18)",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
