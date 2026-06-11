import { useRef } from "react";
import Button from "./Button";
import LavaBorder from "./LavaBorder";
import Magnetic from "./Magnetic";
import EmberField from "./EmberField";
import { getLenis } from "./SmoothScroll";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Hero = () => {
  const videoFrameRef = useRef(null);

  useGSAP(
    () => {
      if (!videoFrameRef.current) return;

      gsap.fromTo(
        videoFrameRef.current,
        {
          clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)",
          borderRadius: "0 0 0 0",
        },
        {
          clipPath: "polygon(15% 0, 71% 0%, 90% 92%, 0% 100%)",
          borderRadius: "0 0 40% 10%",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: videoFrameRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { dependencies: [], revertOnUpdate: true },
  );

  return (
    <div className="relative h-dvh min-h-screen w-screen overflow-x-hidden bg-[#fff]">
      <div
        id="video-frame"
        ref={videoFrameRef}
        className="relative z-10 h-dvh w-screen overflow-hidden bg-[#070502]"
      >
        {/* ── Forge ember field: heat→cool particles over the engineered grid ── */}
        <EmberField />

        {/* ── Hero text + CTA ── */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-28 px-5 sm:mt-44 sm:px-10 md:mt-64 lg:mt-72">
            <h1 className="special-font hero-heading text-[#f5efe6]">
              <b>K</b>ingpi<b>n</b>
            </h1>
            <h1 className="special-font subhero-heading bg-gradient-to-r from-[#f5efe6] to-[#e8a33d] bg-clip-text text-transparent">
              Vision Forge
            </h1>
            <p className="mb-5 max-w-[90%] font-robert text-sm text-[#f5efe6] sm:max-w-100 sm:text-base">
              Reimagining digital infrastructure. We architect the systems of
              tomorrow — turning your business operations into one seamless,
              scalable ecosystem.
            </p>
            <Magnetic>
              <LavaBorder>
                <Button
                  id="explore-work"
                  title="Explore More"
                  rightIcon={<TiLocationArrow />}
                  onClick={() => {
                    const el = document.getElementById("work");
                    if (!el) return;
                    const lenis = getLenis();
                    if (lenis) lenis.scrollTo(el, { duration: 1.6 });
                    else el.scrollIntoView({ behavior: "smooth" });
                  }}
                  containerClass="cta-transition-btn !bg-[#e8a33d] !text-[#070502] flex-center gap-1"
                />
              </LavaBorder>
            </Magnetic>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
