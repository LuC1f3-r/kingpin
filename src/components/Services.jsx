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
import BorderGlow from "./BorderGlow";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = [
  {
    Icon: TbTerminal2,
    title: "Web Dev",
    desc: "High-performance, bespoke web environments built on bleeding-edge tech stacks for maximum authority.",
    colors:    ['#4fb7dd', '#22d3ee', '#3b82f6'],
    glowColor: '196 72 65',
    accent:    '#4fb7dd',
  },
  {
    Icon: TbStack2,
    title: "SaaS Engineering",
    desc: "Architecting multi-tenant platforms designed for aggressive scale and seamless vertical integration.",
    colors:    ['#a855f7', '#7c3aed', '#c084fc'],
    glowColor: '272 72 65',
    accent:    '#a855f7',
  },
  {
    Icon: TbCloud,
    title: "Cloud Architecture",
    desc: "Distributed global systems utilizing serverless paradigms and elastic load balancing for 99.99% uptime.",
    colors:    ['#10b981', '#06b6d4', '#34d399'],
    glowColor: '160 72 55',
    accent:    '#10b981',
  },
  {
    Icon: TbShieldCheck,
    title: "Brand Systems",
    desc: "Developing visual identities that project power, establishing dominance in crowded market sectors.",
    colors:    ['#f472b6', '#e879f9', '#fb7185'],
    glowColor: '326 85 72',
    accent:    '#f472b6',
  },
  {
    Icon: TbDeviceMobileCode,
    title: "App Ecosystems",
    desc: "Native and cross-platform mobile experiences engineered for the modern sovereign user. Zero friction, total control.",
    colors:    ['#fbbf24', '#f97316', '#fb923c'],
    glowColor: '38 90 65',
    accent:    '#fbbf24',
  },
];

const glowBase = {
  backgroundColor: '#0d1825',
  borderRadius:    4,
  glowRadius:      45,
  glowIntensity:   1.1,
  coneSpread:      28,
  edgeSensitivity: 25,
  fillOpacity:     0.45,
};

const CardBody = ({ Icon, title, desc, accent }) => (
  <div className="relative flex h-full flex-col gap-7 p-[2.2rem]">
    <div
      className="absolute inset-y-0 left-0 w-[3px] rounded-l-sm opacity-50"
      style={{ backgroundColor: accent }}
    />
    <Icon size={30} style={{ color: accent }} />
    <div>
      <h3
        className="mb-3 font-zentry text-xl font-black uppercase text-[#eef2ff]"
        style={{ fontFeatureSettings: '"ss01" on' }}
      >
        {title}
      </h3>
      <p className="font-robert text-sm leading-relaxed text-[#eef2ff]/40">
        {desc}
      </p>
    </div>
  </div>
);

const Services = () => {
  const sectionRef  = useRef(null);
  const headerRef   = useRef(null);
  const topRowRef   = useRef(null);
  const botRowRef   = useRef(null);

  useGSAP(
    () => {
      /* ── Header ── */
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

      /* ── Top row cards (children of the grid div) ── */
      gsap.fromTo(
        topRowRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: topRowRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );

      /* ── Bottom row cards ── */
      gsap.fromTo(
        botRowRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: botRowRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
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
      className="flex min-h-screen w-screen flex-col bg-[#060d14] px-10 py-24 md:px-16 lg:px-20"
    >
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div ref={headerRef} className="mb-10 shrink-0">
        <p className="mb-4 font-general text-[10px] uppercase tracking-[0.28em] text-[#eef2ff]/30">
          Core Capabilities
        </p>
        <h2
          className="font-zentry text-5xl font-black uppercase leading-none text-[#eef2ff] lg:text-6xl xl:text-7xl"
          style={{ fontFeatureSettings: '"ss01" on' }}
        >
          Forging The{" "}
          <span className="text-[#4fb7dd]">Infrastructure.</span>
        </h2>
      </div>

      <div className="flex flex-1 flex-col gap-4">

        {/* Top row — 3 equal cards */}
        <div
          ref={topRowRef}
          className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3"
        >
          {services.slice(0, 3).map(({ Icon, title, desc, colors, glowColor, accent }) => (
            <BorderGlow
              key={title}
              colors={colors}
              glowColor={glowColor}
              {...glowBase}
            >
              <CardBody Icon={Icon} title={title} desc={desc} accent={accent} />
            </BorderGlow>
          ))}
        </div>

        {/* Bottom row — 1 col + 2-col wide */}
        <div
          ref={botRowRef}
          className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3"
        >
          <BorderGlow
            colors={services[3].colors}
            glowColor={services[3].glowColor}
            {...glowBase}
          >
            <CardBody {...services[3]} />
          </BorderGlow>

          <BorderGlow
            colors={services[4].colors}
            glowColor={services[4].glowColor}
            {...glowBase}
            className="md:col-span-2"
          >
            <CardBody {...services[4]} />
          </BorderGlow>
        </div>

      </div>
    </section>
  );
};

export default Services;
