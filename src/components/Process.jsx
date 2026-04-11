import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const steps = [
  {
    num: "01",
    label: "Discovery",
    title: "Understand & Align",
    desc: "Deep-dive into your business, goals, competitors, and users. We don't start building until we know exactly what winning looks like for you.",
  },
  {
    num: "02",
    label: "Strategy",
    title: "Plan & Architect",
    desc: "Technology stack selection, information architecture, design direction, and milestone roadmapping. The blueprint before the build.",
  },
  {
    num: "03",
    label: "Execution",
    title: "Design & Build",
    desc: "We move fast and iterate faster. Transparent progress, weekly check-ins, and zero surprise changes to scope or timeline.",
  },
  {
    num: "04",
    label: "Launch & Grow",
    title: "Ship & Sustain",
    desc: "Rigorous QA, smooth deployment, and ongoing support. We don't disappear after launch — we partner for the long game.",
  },
];

const Process = () => {
  const sectionRef  = useRef(null);
  const headerRef   = useRef(null);
  const stepsRef    = useRef(null);

  useGSAP(
    () => {
      // Header label + title scrub in
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          stagger: 0.18,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 0.8,
          },
        },
      );

      // Each step scrubs in left→right with stagger
      gsap.fromTo(
        stepsRef.current.children,
        { opacity: 0, y: 50, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "power2.out",
          stagger: 0.18,
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 75%",
            end: "top 5%",
            scrub: 0.9,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="process"
      className="w-screen bg-[#f0f5ff] px-5 pb-16 pt-16 sm:px-10 md:px-16 md:pb-28 md:pt-24 lg:px-20"
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div ref={headerRef} className="mb-12 md:mb-20">
        <p className="mb-4 font-general text-[10px] uppercase tracking-[0.28em] text-black/35">
          How We Work
        </p>
        <h2
          className="font-zentry text-4xl font-black uppercase leading-[1.02] text-black sm:text-5xl lg:text-6xl xl:text-7xl"
          style={{ fontFeatureSettings: '"ss01" on' }}
        >
          The Forge
          <br />
          <span className="text-[#4fb7dd]">Process.</span>
        </h2>
      </div>

      {/* ── Steps ──────────────────────────────────────────────────────────── */}
      <div
        ref={stepsRef}
        className="grid grid-cols-1 gap-0 divide-y divide-black/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:divide-y-0"
      >
        {steps.map((step) => (
          <div
            key={step.num}
            className="group flex flex-col justify-between px-0 py-10 md:px-8 md:first:pl-0 lg:py-0"
          >
            {/* Number */}
            <span
              className="mb-8 block font-zentry text-[5rem] font-black leading-none text-black/10 transition-colors duration-500 group-hover:text-[#4fb7dd]/30 lg:text-[6rem]"
              style={{ fontFeatureSettings: '"ss01" on' }}
            >
              {step.num}
            </span>

            <div>
              {/* Label */}
              <p className="mb-2 font-general text-[9px] uppercase tracking-[0.25em] text-black/35">
                {step.label}
              </p>

              {/* Title */}
              <h3
                className="mb-4 font-zentry text-xl font-black uppercase leading-tight text-black lg:text-2xl"
                style={{ fontFeatureSettings: '"ss01" on' }}
              >
                {step.title}
              </h3>

              {/* Divider */}
              <div className="mb-4 h-px w-8 bg-[#4fb7dd]" />

              {/* Description */}
              <p className="font-robert text-sm leading-relaxed text-black/50">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;
