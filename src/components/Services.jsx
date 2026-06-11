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

/* Forge card: warm iron surface, gold accent, CSS-only hover (no per-frame JS) */
const ServiceCard = ({ Icon, title, desc, index, className = "" }) => (
  <div
    className={`forge-card relative flex h-full flex-col gap-7 overflow-hidden rounded-2xl p-[2.2rem] ${className}`}
  >
    <div className="absolute inset-y-0 left-0 w-[3px] bg-[#e8a33d]/50" />
    <div className="flex items-start justify-between">
      <Icon size={30} className="text-[#e8a33d]" />
      <span className="font-general text-[10px] tracking-[0.22em] text-[#f5efe6]/25">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
    <div>
      <h3
        className="mb-3 font-zentry text-xl font-black uppercase text-[#f5efe6]"
        style={{ fontFeatureSettings: '"ss01" on' }}
      >
        {title}
      </h3>
      <p className="font-robert text-sm leading-relaxed text-[#f5efe6]/65">
        {desc}
      </p>
    </div>
  </div>
);

const Services = () => {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const topRowRef  = useRef(null);
  const botRowRef  = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );

      [topRowRef, botRowRef].forEach((rowRef, i) => {
        gsap.fromTo(
          rowRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.12 + i * 0.03,
            scrollTrigger: {
              trigger: rowRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="flex min-h-screen w-screen flex-col overflow-hidden bg-[#0d0a05] px-5 py-16 sm:px-10 md:px-16 md:py-24 lg:px-20"
    >
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div ref={headerRef} className="mb-8 shrink-0 md:mb-10">
        <p className="mb-4 font-general text-[10px] uppercase tracking-[0.28em] text-[#f5efe6]/30">
          Core Capabilities
        </p>
        <h2
          className="max-w-full break-words font-zentry text-4xl font-black uppercase leading-none text-[#f5efe6] sm:text-5xl lg:text-6xl"
          style={{ fontFeatureSettings: '"ss01" on' }}
        >
          Forging The{" "}
          <span className="text-[#e8a33d]">Infrastructure.</span>
        </h2>
      </div>

      <div className="flex flex-1 flex-col gap-4">
        {/* Top row — 3 equal cards */}
        <div ref={topRowRef} className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
          {services.slice(0, 3).map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </div>

        {/* Bottom row — 1 col + 2-col wide */}
        <div ref={botRowRef} className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
          <ServiceCard {...services[3]} index={3} />
          <ServiceCard {...services[4]} index={4} className="md:col-span-2" />
        </div>
      </div>
    </section>
  );
};

export default Services;
