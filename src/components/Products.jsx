import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiLocationArrow } from "react-icons/ti";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ── Tilt wrapper ─────────────────────────────────────────────────────────── */
const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef();

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;
    const { left, top, width } = itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / width;
    const tiltX = (relativeY - 0.5) * 10;
    const tiltY = (relativeX - 0.5) * -10;
    setTransformStyle(
      `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.94, 0.92)`,
    );
  };

  const handleMouseLeave = () => setTransformStyle("");

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

/* ── Bento card ───────────────────────────────────────────────────────────── */
const BentoCard = ({ src, title, description, tag, isComingSoon }) => (
  <div className="relative size-full">
    <video
      src={src}
      loop
      muted
      autoPlay
      playsInline
      className="absolute left-0 top-0 size-full object-cover object-center"
    />
    {/* dark gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#020609]/80 via-[#020609]/20 to-transparent" />

    <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
      <div>
        {tag && (
          <span className="mb-3 inline-block font-general text-[10px] uppercase tracking-[0.22em] text-[#4fb7dd]/80">
            {tag}
          </span>
        )}
        <h1 className="bento-title special-font">{title}</h1>
        {description && (
          <p className="mt-3 max-w-64 font-robert text-xs leading-relaxed text-white/75 md:text-sm">
            {description}
          </p>
        )}
      </div>

      {isComingSoon && (
        <span className="w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 font-general text-[10px] uppercase tracking-widest text-white/70 backdrop-blur-sm">
          Coming Soon
        </span>
      )}
    </div>
  </div>
);

/* ── Products section ─────────────────────────────────────────────────────── */
const Products = () => {
  const sectionRef  = useRef(null);
  const headerRef   = useRef(null);
  const heroCardRef = useRef(null);
  const gridRef     = useRef(null);

  useGSAP(
    () => {
      /* Header */
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.18,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      /* Hero card */
      gsap.fromTo(
        heroCardRef.current,
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroCardRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );

      /* Grid cards stagger */
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.13,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="products" className="bg-[#020609] pb-52">
      <div className="container mx-auto px-3 md:px-10">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div ref={headerRef} className="px-5 py-20 sm:px-5 sm:py-32">
          <p className="font-general text-[10px] uppercase tracking-[0.28em] text-[#4fb7dd]/85">
            Our Products
          </p>
          <p className="mt-4 font-zentry text-3xl font-black uppercase leading-none text-blue-50 sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ fontFeatureSettings: '"ss01" on' }}
          >
            Built to <span className="text-[#4fb7dd]">Dominate.</span>
          </p>
          <p className="mt-5 max-w-md font-robert text-sm leading-relaxed text-blue-50/50">
            Every product we ship is a precision instrument — engineered for
            performance, designed for authority, and built to outlast the
            competition.
          </p>
        </div>

        {/* ── Hero card ──────────────────────────────────────────────────── */}
        <div ref={heroCardRef}>
          <BentoTilt className="border-hsla relative mb-7 h-64 w-full overflow-hidden rounded-md sm:h-96 md:h-[65vh]">
            <BentoCard
              src="/videos/feature-1.mp4"
              tag="Flagship"
              title={<>KingpiN Vision Forge <b>F</b>orge</>}
              description="Our all-in-one delivery platform — from architecture to launch, every project runs through a single unified pipeline built for zero compromise."
            />
          </BentoTilt>
        </div>

        {/* ── Bento grid ─────────────────────────────────────────────────── */}
        <div
          ref={gridRef}
          className="grid w-full grid-cols-2 gap-4 sm:gap-7"
          style={{ gridAutoRows: 'minmax(200px, auto)' }}
        >
          {/* KingpiN Vision Forge Nexus — tall left card */}
          <BentoTilt className="bento-tilt_1 col-span-2 md:col-span-1 md:row-span-2">
            <BentoCard
              src="/videos/feature-2.mp4"
              tag="SaaS"
              title={<>KingpiN Vision Forge <b>N</b>exus</>}
              description="A modular SaaS infrastructure kit — multi-tenant, auto-scaling, and wired for enterprise from day one."
              isComingSoon
            />
          </BentoTilt>

          {/* KingpiN Vision Forge Pulse */}
          <BentoTilt className="bento-tilt_1 col-span-2 md:col-span-1">
            <BentoCard
              src="/videos/feature-3.mp4"
              tag="Analytics"
              title={<>KingpiN Vision Forge <b>P</b>ulse</>}
              description="Real-time performance intelligence — monitor, alert, and optimise across your entire digital stack."
              isComingSoon
            />
          </BentoTilt>

          {/* KingpiN Vision Forge Vault */}
          <BentoTilt className="bento-tilt_1 col-span-2 md:col-span-1">
            <BentoCard
              src="/videos/feature-4.mp4"
              tag="Collaboration"
              title={<>KingpiN Vision Forge <b>V</b>ault</>}
              description="A secure client portal for seamless handoffs, live previews, and encrypted asset delivery."
              isComingSoon
            />
          </BentoTilt>

          {/* Ambient video tile */}
          <BentoTilt className="bento-tilt_2 col-span-1">
            <video
              src="/videos/feature-5.mp4"
              loop
              muted
              autoPlay
              playsInline
              className="size-full object-cover object-center"
            />
          </BentoTilt>

          {/* More coming soon */}
          <BentoTilt className="bento-tilt_2 col-span-1">
            <div className="flex size-full flex-col justify-between bg-[#4fb7dd] p-5">
              <h1
                className="bento-title special-font max-w-64 text-black"
                style={{ fontFeatureSettings: '"ss01" on' }}
              >
                M<b>o</b>re on the w<b>a</b>y
              </h1>
              <TiLocationArrow className="m-5 scale-[5] self-end text-black" />
            </div>
          </BentoTilt>
        </div>

      </div>
    </section>
  );
};

export default Products;
