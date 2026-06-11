import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbCpu,
  TbArrowsExchange2,
  TbTerminal2,
  TbAdjustmentsHorizontal,
  TbShieldCheck,
} from "react-icons/tb";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const bottomCards = [
  {
    index: "001",
    category: "Systems",
    title: "Market Domination",
    desc: "Building the tools that define industry leaders. We don't follow trends; we create the architectures that obsolete them.",
  },
  {
    index: "002",
    category: "Core",
    title: "Elite Engineering",
    desc: "Clean, rigorous codebases built for high-performance enterprise environments. Built for speed, secured for peace of mind.",
  },
  {
    index: "003",
    category: "Scale",
    title: "Sovereign Growth",
    desc: "Infrastructure that grows with your ambition. Global load balancing, cloud-native roots, and unbreakable logic.",
  },
];

const About = () => {
  const sectionRef      = useRef(null);
  const topBlockRef     = useRef(null);  // the h-dvh block that gets pinned
  const imageWrapperRef = useRef(null);
  const imageRef        = useRef(null);
  const textRef         = useRef(null);
  const cardsRowRef     = useRef(null);  // container holding all 4 feature cards
  const protocolRef     = useRef(null);

  useGSAP(
    () => {
      // Only run the complex pinned animation on md+ screens
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        // On mobile just show everything immediately
        gsap.set(imageWrapperRef.current, { clipPath: "inset(0% 0% 0% 0% round 10px)" });
        gsap.set(imageRef.current, { scale: 1 });
        gsap.set(textRef.current, { opacity: 1, x: 0 });
        gsap.set(cardsRowRef.current.children, { opacity: 1, y: 0, filter: "blur(0px)" });

        gsap.fromTo(
          ".protocol-card",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
              trigger: protocolRef.current,
              start: "top 80%",
              end: "top 30%",
              scrub: 0.6,
            },
          },
        );
        return;
      }

      // ── Set initial states immediately (useGSAP runs via useLayoutEffect,
      //    so these fire before first paint — no FOUC) ───────────────────────
      gsap.set(imageWrapperRef.current, {
        clipPath: "inset(4% 8% 4% 8% round 10px)",
      });
      gsap.set(imageRef.current,  { scale: 1.22 });
      gsap.set(textRef.current,              { opacity: 0, x: -50 });
      gsap.set(cardsRowRef.current.children, { opacity: 0, y: 22, filter: "blur(12px)" });

      // ── Main pinned + scrubbed timeline for the top block ─────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: topBlockRef.current,
          start: "top top",
          end: "+=820",
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Step 1 — image sweeps right + zooms out (both run together via "<")
      tl.fromTo(
        imageWrapperRef.current,
        { clipPath: "inset(4% 8% 4% 8% round 10px)" },
        { clipPath: "inset(0% 0% 0% 52% round 20px)", ease: "power3.inOut", duration: 1.4 },
      );
      tl.fromTo(
        imageRef.current,
        { scale: 1.22 },
        { scale: 1, ease: "power3.inOut", duration: 1.4 },
        "<",
      );

      // Step 2 — left text block slides in
      tl.fromTo(
        textRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, ease: "power2.out", duration: 0.9 },
        "-=0.65",
      );

      // Step 3 — all four cards blur in left→right with stagger
      tl.fromTo(
        cardsRowRef.current.children,
        { opacity: 0, y: 22, filter: "blur(12px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out", duration: 0.75, stagger: 0.15 },
        "-=0.45",
      );

      // ── Protocol cards get their own scrubbed trigger (outside the pin) ───
      gsap.fromTo(
        ".protocol-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: protocolRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 0.6,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-screen overflow-hidden bg-[#060d14]"
    >
      {/* ── TOP BLOCK — pinned full-viewport height on desktop, auto on mobile ── */}
      <div
        ref={topBlockRef}
        className="relative min-h-[90dvh] px-5 pb-14 pt-24 md:h-dvh md:px-16 lg:px-20"
      >
        {/* Full-bleed brand field: GSAP clips centre → right 48% on desktop, full on mobile */}
        <div ref={imageWrapperRef} className="absolute inset-0 z-10 overflow-hidden">
          <div
            ref={imageRef}
            className="size-full"
            style={{
              backgroundImage:
                "radial-gradient(90% 70% at 70% 25%, rgba(79,183,221,0.35), transparent 55%), radial-gradient(80% 80% at 25% 90%, rgba(79,183,221,0.14), transparent 50%), linear-gradient(150deg, #0b1c2a 0%, #07121c 50%, #020609 100%)",
            }}
          >
            {/* Faint grid texture */}
            <div
              className="size-full opacity-50"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 52px), repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 52px)",
              }}
            />
          </div>
        </div>

        {/* Overlay gradient for mobile readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#060d14]/60 via-[#060d14]/30 to-[#060d14]/80 md:hidden" />

        {/* LEFT column — text */}
        <div
          ref={textRef}
          className="relative z-20 max-w-full md:max-w-[46%]"
        >
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-8 bg-[#4fb7dd]" />
            <span className="font-general text-[10px] uppercase tracking-[0.22em] text-[#4fb7dd]">
              Foundation Protocol
            </span>
          </div>

          <h2
            className="mb-6 font-zentry text-4xl font-black uppercase leading-[1.05] text-[#eef2ff] sm:text-5xl lg:text-6xl xl:text-[4.5rem]"
            style={{ fontFeatureSettings: '"ss01" on' }}
          >
            The Forge: Where
            <br />
            Vision Becomes
            <br />
            <span className="text-[#4fb7dd]">Infrastructure.</span>
          </h2>

          <p className="max-w-[90%] font-robert text-sm leading-relaxed text-[#eef2ff]/70 md:max-w-[400px]">
            Every brand and idea begins as raw material. In the Forge, we
            subject these concepts to intense analytical pressure and
            technical refinement. We don't just build websites; we construct
            scalable, unstoppable digital infrastructure.
          </p>
        </div>

        {/* ALL 4 CARDS — grid on mobile, absolute row at bottom on desktop */}
        <div
          ref={cardsRowRef}
          className="relative z-20 mt-8 grid grid-cols-2 gap-3 md:absolute md:bottom-14 md:left-10 md:right-10 md:mt-0 md:flex md:gap-4 lg:bottom-16 lg:left-20 lg:right-20"
        >
          {/* Refinement */}
          <div
            className="feature-card rounded-2xl p-4 backdrop-blur-md md:flex-1 md:p-5"
            style={{ border: '1px solid rgba(79,183,221,0.08)', backgroundColor: 'rgba(79,183,221,0.03)' }}
          >
            <TbAdjustmentsHorizontal className="mb-2.5 text-[#4fb7dd]" size={20} />
            <p className="mb-1 font-general text-[11px] uppercase tracking-widest text-[#eef2ff]/70">
              Refinement
            </p>
            <p className="font-robert text-xs leading-relaxed text-[#eef2ff]/65 sm:text-sm">
              Stripping away the non-essential to reveal the core competitive
              engine.
            </p>
          </div>

          {/* Hardening */}
          <div
            className="feature-card rounded-2xl p-4 backdrop-blur-md md:flex-1 md:p-5"
            style={{ border: '1px solid rgba(79,183,221,0.08)', backgroundColor: 'rgba(79,183,221,0.03)' }}
          >
            <TbShieldCheck className="mb-2.5 text-[#4fb7dd]" size={20} />
            <p className="mb-1 font-general text-[11px] uppercase tracking-widest text-[#eef2ff]/70">
              Hardening
            </p>
            <p className="font-robert text-xs leading-relaxed text-[#eef2ff]/65 sm:text-sm">
              Stress-testing architectures for global scale and high-traffic
              resilience.
            </p>
          </div>

          {/* Precise Assembly */}
          <div
            className="feature-card rounded-2xl p-4 backdrop-blur-md md:flex-1 md:p-5"
            style={{ border: '1px solid rgba(79,183,221,0.08)', backgroundColor: 'rgba(79,183,221,0.03)' }}
          >
            <div className="mb-3 flex items-center gap-2">
              <TbTerminal2 className="text-[#4fb7dd]" size={13} />
              <span className="font-general text-[10px] uppercase tracking-widest text-[#eef2ff]/60">
                System Core Active.exe
              </span>
            </div>
            <TbCpu className="mb-2.5 text-[#4fb7dd]" size={20} />
            <p className="mb-1 font-general text-[11px] uppercase tracking-widest text-[#eef2ff]/70">
              Precise Assembly
            </p>
            <p className="font-robert text-xs leading-relaxed text-[#eef2ff]/65 sm:text-sm">
              Component-driven engineering designed for rapid market iteration.
            </p>
          </div>

          {/* Data Flow */}
          <div
            className="feature-card rounded-2xl p-4 backdrop-blur-md md:flex-1 md:p-5"
            style={{ border: '1px solid rgba(79,183,221,0.08)', backgroundColor: 'rgba(79,183,221,0.03)' }}
          >
            <TbArrowsExchange2 className="mb-2.5 text-[#4fb7dd]" size={20} />
            <p className="mb-1 font-general text-[11px] uppercase tracking-widest text-[#eef2ff]/70">
              Data Flow
            </p>
            <p className="font-robert text-xs leading-relaxed text-[#eef2ff]/65 sm:text-sm">
              Optimizing conversion pathways through algorithmic precision.
            </p>
          </div>
        </div>
      </div>

      {/* ── BOTTOM: 3 Protocol Cards ──────────────────────────────────────── */}
      <div
        ref={protocolRef}
        className="border-t px-10 pb-24 pt-14 md:px-16 lg:px-20"
        style={{ borderColor: 'rgba(79,183,221,0.08)' }}
      >
        <div className="grid grid-cols-1 divide-y divide-[#4fb7dd]/[0.06] md:grid-cols-3 md:divide-x md:divide-y-0">
          {bottomCards.map((card) => (
            <div
              key={card.index}
              className="protocol-card flex flex-col justify-between px-8 py-10 opacity-0 first:pl-0 last:pr-0"
            >
              <div>
                <p className="mb-5 font-general text-[10px] uppercase tracking-[0.22em] text-[#eef2ff]/55">
                  {card.index} / {card.category}
                </p>
                <h3
                  className="mb-4 font-zentry text-2xl font-black uppercase leading-tight text-[#eef2ff] lg:text-[1.6rem]"
                  style={{ fontFeatureSettings: '"ss01" on' }}
                >
                  {card.title}
                </h3>
                <p className="max-w-xs font-robert text-sm leading-relaxed text-[#eef2ff]/65">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
