import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiLocationArrow } from "react-icons/ti";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ── Real shipped work ────────────────────────────────────────────────────── */
const projects = [
  {
    id: "savi-waters",
    title: "Savi Waters",
    tag: "Client · Corporate Web",
    desc: "North Karnataka's leading packaged-water brand. A dark, premium product site with bulk ordering and certification trust signals.",
    image: "/img/work/savi-waters.jpg",
    url: "https://saviwaters.com",
    stack: ["React", "Branding", "E-Commerce"],
  },
  {
    id: "rahamatullah",
    title: "Rahamatullah Restaurant",
    tag: "Client · Hospitality",
    desc: "Fine-dining experience site for the Rahamatullah Group — story, menus, and table booking wrapped in Mughal-inspired luxury.",
    image: "/img/work/rahamatullah.jpg",
    url: "https://rahamatullahrestaurant.com",
    stack: ["React", "UI/UX", "Booking"],
  },
  {
    id: "school-os",
    title: "School Management System",
    tag: "Product · EdTech",
    desc: "End-to-end school operations — admissions, attendance, fees, exams, and parent communication on one platform.",
    image: null,
    monogram: "S",
    stack: ["SaaS", "Dashboard", "Mobile"],
  },
  {
    id: "vye",
    title: "Vye",
    tag: "Product · HealthTech",
    desc: "A women's health companion — period tracking, cycle insights, and private-by-design health data.",
    image: null,
    monogram: "V",
    stack: ["Mobile App", "Health", "Privacy"],
  },
];

/* gradient visual for products that don't have a public screenshot yet */
const monogramBg =
  "radial-gradient(110% 90% at 75% 10%, rgba(79,183,221,0.28), transparent 55%), radial-gradient(90% 80% at 15% 95%, rgba(255,107,53,0.10), transparent 50%), linear-gradient(150deg, #0b1a26 0%, #060d14 55%, #020609 100%)";

const WorkCard = ({ p, cardRef }) => {
  const Tag = p.url ? "a" : "div";
  return (
    <Tag
      ref={cardRef}
      {...(p.url
        ? { href: p.url, target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="work-card group block w-[80vw] shrink-0 snap-center overflow-hidden rounded-xl bg-[#060d14] sm:w-[62vw] md:w-[min(48vw,560px)]"
    >
      {/* visual */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {p.image ? (
          <img
            src={p.image}
            alt={`${p.title} website`}
            loading="lazy"
            className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className="relative size-full"
            style={{ backgroundImage: monogramBg }}
          >
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-zentry text-[7rem] font-black uppercase text-[#4fb7dd]/70 md:text-[9rem]"
              style={{ fontFeatureSettings: '"ss01" on' }}
            >
              {p.monogram}
            </span>
            <span className="absolute bottom-4 right-5 rounded-full border border-white/15 px-3 py-1 font-general text-[9px] uppercase tracking-widest text-white/50">
              In development
            </span>
          </div>
        )}
        {/* bottom fade into caption bar */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#060d14] to-transparent" />
      </div>

      {/* caption */}
      <div className="flex items-start justify-between gap-4 p-5">
        <div>
          <p className="mb-1 font-general text-[9px] uppercase tracking-[0.22em] text-[#4fb7dd]/80">
            {p.tag}
          </p>
          <h3
            className="font-zentry text-xl font-black uppercase leading-tight text-[#eef2ff] md:text-2xl"
            style={{ fontFeatureSettings: '"ss01" on' }}
          >
            {p.title}
          </h3>
          <p className="mt-2 max-w-[40ch] font-robert text-xs leading-relaxed text-[#eef2ff]/55">
            {p.desc}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-[#4fb7dd]/15 px-2.5 py-0.5 font-general text-[9px] uppercase tracking-widest text-[#eef2ff]/45"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        {p.url && (
          <TiLocationArrow className="mt-1 shrink-0 text-[#4fb7dd] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={20} />
        )}
      </div>
    </Tag>
  );
};

/* ── Work section: scroll-driven 3D coverflow on desktop ─────────────────── */
const Work = () => {
  const sectionRef = useRef(null);
  const stageRef   = useRef(null);
  const trackRef   = useRef(null);
  const counterRef = useRef(null);
  const cardRefs   = useRef([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = cardRefs.current.filter(Boolean);
          const n = cards.length;
          trackRef.current.classList.add("coverflow-active");

          const spread = () =>
            Math.min(window.innerWidth * 0.36, 470);

          const place = (p) => {
            cards.forEach((el, i) => {
              const d = i - p;
              const ad = Math.abs(d);
              gsap.set(el, {
                xPercent: -50,
                yPercent: -50,
                x: d * spread(),
                z: -ad * 240,
                rotationY: gsap.utils.clamp(-40, 40, d * -26),
                scale: 1 - Math.min(ad * 0.07, 0.24),
                autoAlpha: ad > 2.3 ? 0 : 1 - Math.max(0, ad - 1) * 0.4,
                zIndex: Math.round(100 - ad * 10),
              });
              el.style.setProperty("--active", String(Math.max(0, 1 - ad)));
            });
            if (counterRef.current) {
              counterRef.current.textContent = String(
                gsap.utils.clamp(1, n, Math.round(p) + 1),
              ).padStart(2, "0");
            }
          };

          place(0);

          const proxy = { p: 0 };
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stageRef.current,
              start: "top top",
              end: "+=" + ((n - 1) * 420 + 200),
              pin: true,
              scrub: 0.7,
              snap: {
                snapTo: 1 / (n - 1),
                duration: { min: 0.15, max: 0.45 },
                ease: "power2.out",
              },
              invalidateOnRefresh: true,
            },
          });
          tl.to(proxy, {
            p: n - 1,
            ease: "none",
            onUpdate: () => place(proxy.p),
          });

          return () => {
            trackRef.current?.classList.remove("coverflow-active");
            cards.forEach((el) => {
              gsap.set(el, { clearProps: "all" });
              el.style.removeProperty("--active");
            });
          };
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-screen overflow-hidden bg-[#020609]"
    >
      <div ref={stageRef} className="flex min-h-dvh flex-col justify-center py-16 md:py-0">
        {/* ── Header ── */}
        <div className="mb-10 flex items-end justify-between px-5 md:px-16 lg:px-20">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-[#4fb7dd]" />
              <span className="font-general text-[10px] uppercase tracking-[0.22em] text-[#4fb7dd]">
                Selected Work
              </span>
            </div>
            <h2
              className="font-zentry text-4xl font-black uppercase leading-none text-[#eef2ff] sm:text-5xl lg:text-6xl"
              style={{ fontFeatureSettings: '"ss01" on' }}
            >
              Forged &amp; <span className="text-[#4fb7dd]">Shipped.</span>
            </h2>
          </div>
          <p className="hidden font-general text-sm tracking-[0.3em] text-[#eef2ff]/40 md:block">
            <span ref={counterRef} className="text-[#4fb7dd]">01</span>
            {" / "}
            {String(projects.length).padStart(2, "0")}
          </p>
        </div>

        {/* ── Stage / track: snap row on mobile, 3D coverflow on desktop ── */}
        <div
          ref={trackRef}
          className="work-track flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:px-0"
        >
          {projects.map((p, i) => (
            <WorkCard
              key={p.id}
              p={p}
              cardRef={(el) => (cardRefs.current[i] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
