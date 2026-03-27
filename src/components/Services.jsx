import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbTerminal2,
  TbStack2,
  TbCloud,
  TbShieldCheck,
  TbDeviceMobileCode,
} from "react-icons/tb";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = [
  {
    Icon: TbTerminal2,
    title: "Web Dev",
    desc: "High-performance, bespoke web environments built on bleeding-edge tech stacks for maximum authority.",
  },
  {
    Icon: TbStack2,
    title: "SaaS Engineering",
    desc: "Architecting multi-tenant platforms designed for aggressive scale and seamless vertical integration.",
  },
  {
    Icon: TbCloud,
    title: "Cloud Architecture",
    desc: "Distributed global systems utilizing serverless paradigms and elastic load balancing for 99.99% uptime.",
  },
  {
    Icon: TbShieldCheck,
    title: "Brand Systems",
    desc: "Developing visual identities that project power, establishing dominance in crowded market sectors.",
  },
  {
    Icon: TbDeviceMobileCode,
    title: "App Ecosystems",
    desc: "Native and cross-platform mobile experiences engineered for the modern sovereign user. Zero friction, total control.",
  },
];

const Services = () => {
  const sectionRef  = useRef(null);
  const headerRef   = useRef(null);
  const gridRef     = useRef(null);
  const widgetRef   = useRef(null);

  useGSAP(
    () => {
      // Initial states
      gsap.set(headerRef.current.children, { opacity: 0, y: 30 });
      gsap.set(gridRef.current.children,   { opacity: 0, y: 50 });
      gsap.set(widgetRef.current,          { opacity: 0, y: 30 });

      // Header scrubs in
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 0.8,
          },
        },
      );

      // Service cards stagger up
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            end: "top 10%",
            scrub: 0.8,
          },
        },
      );

      // Widget fades in
      gsap.fromTo(
        widgetRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: widgetRef.current,
            start: "top 85%",
            end: "top 50%",
            scrub: 0.8,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="w-screen bg-[#0c0c0f] px-10 pb-28 pt-24 md:px-16 lg:px-20"
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div ref={headerRef} className="mb-16">
        <p className="mb-4 font-general text-[10px] uppercase tracking-[0.28em] text-white/30">
          Core Capabilities
        </p>
        <h2
          className="font-zentry text-5xl font-black uppercase leading-none text-white lg:text-6xl xl:text-7xl"
          style={{ fontFeatureSettings: '"ss01" on' }}
        >
          Forging The{" "}
          <span className="text-[#4fb7dd]">Infrastructure.</span>
        </h2>
      </div>

      {/* ── Service cards grid ─────────────────────────────────────────────── */}
      {/* Top row: 3 cards */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 border-t border-white/[0.06] md:grid-cols-3"
      >
        {services.slice(0, 3).map(({ Icon, title, desc }) => (
          <div
            key={title}
            className="group flex flex-col gap-6 border-b border-r border-white/[0.06] p-8 transition-colors duration-300 hover:bg-white/[0.02] last:border-r-0"
          >
            <Icon size={28} className="text-[#4fb7dd]" />
            <div>
              <h3
                className="mb-3 font-zentry text-xl font-black uppercase text-white"
                style={{ fontFeatureSettings: '"ss01" on' }}
              >
                {title}
              </h3>
              <p className="font-robert text-sm leading-relaxed text-white/40">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom row: 2 cards + widget */}
      <div className="grid grid-cols-1 border-b border-white/[0.06] md:grid-cols-3">
        {services.slice(3).map(({ Icon, title, desc }) => (
          <div
            key={title}
            className="group flex flex-col gap-6 border-b border-r border-white/[0.06] p-8 transition-colors duration-300 hover:bg-white/[0.02] md:border-b-0"
          >
            <Icon size={28} className="text-[#4fb7dd]" />
            <div>
              <h3
                className="mb-3 font-zentry text-xl font-black uppercase text-white"
                style={{ fontFeatureSettings: '"ss01" on' }}
              >
                {title}
              </h3>
              <p className="font-robert text-sm leading-relaxed text-white/40">
                {desc}
              </p>
            </div>
          </div>
        ))}

        {/* Live status widget */}
        <div
          ref={widgetRef}
          className="flex flex-col justify-between border-r-0 p-8"
        >
          <div className="flex items-center justify-between">
            <span className="font-general text-[9px] uppercase tracking-[0.22em] text-white/25">
              Active_Connections
            </span>
            <span className="font-general text-[9px] uppercase tracking-[0.12em] text-[#4fb7dd]">
              Secure
            </span>
          </div>

          <div className="space-y-3">
            {[82, 61, 74].map((pct, i) => (
              <div key={i} className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-[#4fb7dd]/50"
                  style={{ width: `${pct}%` }}
                />
              </div>
            ))}
          </div>

          <p className="font-robert text-[11px] leading-relaxed text-white/20">
            All systems operational. Distributed infrastructure standing by.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
