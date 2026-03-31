import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const stats = [
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 8,   suffix: "",  label: "Years Engineering Excellence" },
  { value: 98,  suffix: "%", label: "Client Retention Rate" },
];

const clients = ["Vanguard", "Oracle", "Titan", "Zenith"];

const Claims = () => {
  const sectionRef  = useRef(null);
  const proofRef    = useRef(null);
  const headingRef  = useRef(null);
  const statsRef    = useRef(null);
  const clientRef   = useRef(null);
  const countRefs   = useRef([]);

  useGSAP(
    () => {
      /* ── "PROOF" label ──────────────────────────────────── */
      gsap.fromTo(
        proofRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: proofRef.current,
            start: "top 85%",
            end: "top 55%",
            scrub: 0.7,
          },
        },
      );

      /* ── Heading lines ──────────────────────────────────── */
      gsap.fromTo(
        headingRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          stagger: 0.18,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "top 35%",
            scrub: 0.8,
          },
        },
      );

      /* ── Stat columns slide up ──────────────────────────── */
      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          stagger: 0.16,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 0.9,
          },
        },
      );

      /* ── Count-up numbers ───────────────────────────────── */
      countRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: stats[i].value,
            duration: 1.8,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 72%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      /* ── Client names stagger in ────────────────────────── */
      gsap.fromTo(
        clientRef.current.children,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: clientRef.current,
            start: "top 88%",
            end: "top 55%",
            scrub: 0.7,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef} id="claims">

      {/* ════════════════════════════════════════════════════════
          SECTION 1 — Stats
      ════════════════════════════════════════════════════════ */}
      <section
        className="relative w-screen overflow-hidden px-5 pb-20 pt-20 sm:px-10 md:px-16 md:pb-32 md:pt-28 lg:px-24"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 68% 50%, rgba(79,183,221,0.05) 0%, #060d14 65%)",
        }}
      >
        {/* PROOF label */}
        <div
          ref={proofRef}
          className="mb-10 flex items-center justify-center gap-5"
        >
          <div className="h-px w-14 bg-[#4fb7dd]/60" />
          <span className="font-general text-[10px] uppercase tracking-[0.45em] text-[#4fb7dd]">
            Proof
          </span>
          <div className="h-px w-14 bg-[#4fb7dd]/60" />
        </div>

        {/* Heading */}
        <div
          ref={headingRef}
          className="mb-24 flex flex-col items-center text-center"
        >
          <span
            className="block font-zentry font-black uppercase leading-[0.9] text-[#eef2ff]"
            style={{
              fontFeatureSettings: '"ss01" on',
              fontSize: "clamp(3.8rem, 9.5vw, 8.5rem)",
            }}
          >
            The Numbers
          </span>
          <span
            className="block font-zentry font-black uppercase leading-[0.9] text-[#4fb7dd]"
            style={{
              fontFeatureSettings: '"ss01" on',
              fontSize: "clamp(3.8rem, 9.5vw, 8.5rem)",
            }}
          >
            Don't Lie
          </span>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 divide-y divide-[#4fb7dd]/[0.08] md:grid-cols-3 md:divide-x md:divide-y-0"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col gap-5 px-0 py-12 md:px-12 md:py-4 md:first:pl-0 md:last:pr-0"
            >
              {/* Giant number */}
              <div
                className="flex items-start font-zentry font-black leading-none text-[#eef2ff]"
                style={{
                  fontFeatureSettings: '"ss01" on',
                  fontSize: "clamp(4.5rem, 11vw, 9.5rem)",
                }}
              >
                <span ref={(el) => (countRefs.current[i] = el)}>0</span>
                {stat.suffix && (
                  <span
                    className="text-[#4fb7dd]"
                    style={{ fontSize: "0.45em", marginTop: "0.18em" }}
                  >
                    {stat.suffix}
                  </span>
                )}
              </div>

              {/* Label */}
              <p className="font-general text-[12px] uppercase tracking-[0.3em] text-[#eef2ff]/65">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 2 — Client strip
      ════════════════════════════════════════════════════════ */}
      <section className="relative w-screen bg-[#060d14]" style={{ borderTop: '1px solid rgba(79,183,221,0.06)' }}>
        {/* Left accent bar */}
        <div className="absolute left-0 top-0 h-full bg-[#4fb7dd]/35" />

        <div
          ref={clientRef}
          className="flex flex-wrap items-center justify-between gap-y-6 px-10 py-14 md:flex-nowrap md:gap-y-0"
        >
          {clients.map((name) => (
            <span
              key={name}
              className="font-zentry text-[24px] uppercase tracking-[0.55em] text-[#eef2ff]/20 transition-colors duration-500 hover:text-[#eef2ff]/55"
            >
              {name}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Claims;
