import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(useGSAP, ScrollTrigger);
const About = () => {
  const sectionRef = useRef(null);
  const clipRef = useRef(null);

  useGSAP(
    () => {
      if (!clipRef.current) return;

      gsap.timeline({
        scrollTrigger: {
          trigger: clipRef.current,
          start: "top center",
          end: "+=800 center",
          scrub: true,
          pin: true,
          pinSpacing: true,
        },
      }).to(".about-image", {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
      });
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef} id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm uppercase md:text-[10px]">
          Welcome to KingpiN Vision Forge
        </h2>

        <AnimatedTitle title="Disc<b>o</b>ver the world's<br />l<b>a</b>rgest shared adventure" containerClass={"mt-5 !text-black text-center"}/>
        <div className="about-subtext">
          <p>The Game of Games begins—your life, now an epic MMORPG</p>
          <p className="text-gray-500">
            Zentry unites every player from countless games and platforms, both
            digital and physical, into a unified Play Economy
          </p>
        </div>
      </div>

      <div ref={clipRef} className="relative h-dvh w-screen overflow-hidden" id="clip">
        <div className="mask-clip-path about-image">
            <img src="/img/about.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"/>
        </div>
      </div>
    </div>
  );
};

export default About;
