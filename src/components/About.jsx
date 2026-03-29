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
      // ── Set initial states immediately (useGSAP runs via useLayoutEffect,
      //    so these fire before first paint — no FOUC) ───────────────────────
      gsap.set(imageWrapperRef.current, {
        clipPath: "inset(4% 8% 4% 8% round 10px)",
      });
      gsap.set(imageRef.current,  { scale: 1.22 });
      gsap.set(textRef.current,              { opacity: 0, x: -50 });
      gsap.set(cardsRowRef.current.children, { opacity: 0, y: 22, filter: "blur(12px)" });

      // ── Main pinned + scrubbed timeline for the top block ─────────────────
      // pin: true keeps topBlock fixed while the user scrolls 820px.
      // scrub: 0.8 links progress to scroll position with a 0.8s lag —
      //   scroll DOWN = animate forward, scroll UP = animate backward.
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
      // Using .children on the ref is explicit and immune to scope/selector issues
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
      {/* ── TOP BLOCK — pinned full-viewport height ───────────────────────── */}
      <div
        ref={topBlockRef}
        className="relative h-dvh px-10 pb-14 pt-20 md:px-16 lg:px-20"
      >
        {/* Full-bleed image: GSAP clips centre → right 48% while zooming out */}
        <div ref={imageWrapperRef} className="absolute inset-0 z-10">
          <img
            ref={imageRef}
            src="/img/about.jpg"
            alt="KingpiN Vision Forge Forge"
            className="size-full object-cover"
          />
        </div>

        {/* LEFT column — text only, no cards */}
        <div
          ref={textRef}
          className="relative z-20 max-w-[46%]"
        >
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-8 bg-[#4fb7dd]" />
            <span className="font-general text-[10px] uppercase tracking-[0.22em] text-[#4fb7dd]">
              Foundation Protocol
            </span>
          </div>

          <h2
            className="mb-6 font-zentry text-5xl font-black uppercase leading-[1.05] text-[#eef2ff] lg:text-6xl xl:text-[4.5rem]"
            style={{ fontFeatureSettings: '"ss01" on' }}
          >
            The Forge: Where
            <br />
            Vision Becomes
            <br />
            <span className="text-[#4fb7dd]">Infrastructure.</span>
          </h2>

          <p className="max-w-[400px] font-robert text-sm leading-relaxed text-[#eef2ff]/70">
            Every brand and idea begins as raw material. In the Forge, we
            subject these concepts to intense analytical pressure and
            technical refinement. We don't just build websites; we construct
            scalable, unstoppable digital infrastructure.
          </p>
        </div>

        {/* ALL 4 CARDS — single absolute row at the bottom, full content width.
            flex-1 on each card guarantees all four are identical width. */}
        <div ref={cardsRowRef} className="absolute bottom-14 left-10 right-10 z-20 flex gap-4 lg:bottom-16 lg:left-20 lg:right-20">
          {/* Refinement */}
          <div
            className="feature-card flex-1 rounded-2xl p-5 backdrop-blur-md"
            style={{ border: '1px solid rgba(79,183,221,0.08)', backgroundColor: 'rgba(79,183,221,0.03)' }}
          >
            <TbAdjustmentsHorizontal className="mb-2.5 text-[#4fb7dd]" size={20} />
            <p className="mb-1 font-general text-[11px] uppercase tracking-widest text-[#eef2ff]/70">
              Refinement
            </p>
            <p className="font-robert text-sm leading-relaxed text-[#eef2ff]/65">
              Stripping away the non-essential to reveal the core competitive
              engine.
            </p>
          </div>

          {/* Hardening */}
          <div
            className="feature-card flex-1 rounded-2xl p-5 backdrop-blur-md"
            style={{ border: '1px solid rgba(79,183,221,0.08)', backgroundColor: 'rgba(79,183,221,0.03)' }}
          >
            <TbShieldCheck className="mb-2.5 text-[#4fb7dd]" size={20} />
            <p className="mb-1 font-general text-[11px] uppercase tracking-widest text-[#eef2ff]/70">
              Hardening
            </p>
            <p className="font-robert text-sm leading-relaxed text-[#eef2ff]/65">
              Stress-testing architectures for global scale and high-traffic
              resilience.
            </p>
          </div>

          {/* Precise Assembly */}
          <div
            className="feature-card flex-1 rounded-2xl p-5 backdrop-blur-md"
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
            <p className="font-robert text-sm leading-relaxed text-[#eef2ff]/65">
              Component-driven engineering designed for rapid market iteration.
            </p>
          </div>

          {/* Data Flow */}
          <div
            className="feature-card flex-1 rounded-2xl p-5 backdrop-blur-md"
            style={{ border: '1px solid rgba(79,183,221,0.08)', backgroundColor: 'rgba(79,183,221,0.03)' }}
          >
            <TbArrowsExchange2 className="mb-2.5 text-[#4fb7dd]" size={20} />
            <p className="mb-1 font-general text-[11px] uppercase tracking-widest text-[#eef2ff]/70">
              Data Flow
            </p>
            <p className="font-robert text-sm leading-relaxed text-[#eef2ff]/65">
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
