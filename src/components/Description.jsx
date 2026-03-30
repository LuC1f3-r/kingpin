import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Description = () => {
  const sectionRef  = useRef(null);
  const eyebrowRef  = useRef(null);
  const subRef      = useRef(null);

  useGSAP(
    () => {
      if (!eyebrowRef.current || !subRef.current) return;

      /* Eyebrow — slides up as the section first enters the viewport */
      gsap.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );

      /* Subheading — waits until the heading words have scrubbed through
         (AnimatedTitle ends at "top 15%" on its own trigger, so waiting
         until the section's top hits ~40% ensures the title is already done) */
      gsap.fromTo(
        subRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 38%",
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
      className="w-screen bg-[#f0f5ff] py-16 md:py-24"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">

        {/* Eyebrow label */}
        <p
          ref={eyebrowRef}
          className="mb-4 font-general text-[10px] uppercase tracking-widest text-black/50"
        >
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
