import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Description = () => {
  const sectionRef = useRef(null);
  const subRef = useRef(null);

  useGSAP(
    () => {
      if (!subRef.current) return;

      gsap.fromTo(
        subRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subRef.current,
            start: "top 85%",
            end: "top 40%",
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
      className="w-screen bg-[#f0f5ff] py-16 md:py-24"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">

        {/* Eyebrow label */}
        <p className="mb-4 font-general text-[10px] uppercase tracking-widest text-black/50">
          Our Philosophy
        </p>

        {/* Two-line animated heading */}
        <AnimatedTitle
          title="We don't just build<br />we <b>d</b>ominate."
          containerClass="!text-black text-center !text-4xl md:!text-5xl lg:!text-6xl"
        />

        {/* Subheading fade-up */}
        <p
          ref={subRef}
          className="mt-8 max-w-xl font-robert text-sm leading-relaxed text-black/60 md:text-base"
        >
          From scalable software to razor-sharp brand identities, KingpiN Vision Forge
          engineers every layer of your digital presence that's built to lead,
          never to follow.
        </p>
      </div>
    </section>
  );
};

export default Description;
