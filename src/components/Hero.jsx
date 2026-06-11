import { useRef } from "react";
import Button from "./Button";
import ElectricBorder from "./ElectricBorder";
import Magnetic from "./Magnetic";
import EmberField from "./EmberField";
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
        className="relative z-10 h-dvh w-screen overflow-hidden bg-[#020609]"
      >
        {/* ── Forge ember field: heat→cool particles over the engineered grid ── */}
        <EmberField />

        {/* ── Hero text + CTA ── */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-28 px-5 sm:mt-44 sm:px-10 md:mt-64 lg:mt-72">
            <h1 className="special-font hero-heading text-blue-100">
              <b>K</b>ingpi<b>n</b>
            </h1>
            <h1 className="special-font subhero-heading bg-gradient-to-r from-[#eef2ff] to-[#4fb7dd] bg-clip-text text-transparent">
              Vision Forge
            </h1>
            <p className="mb-5 max-w-[90%] font-robert text-sm text-blue-100 sm:max-w-100 sm:text-base">
              Reimagining digital infrastructure. We architect the systems of
              tomorrow — turning your business operations into one seamless,
              scalable ecosystem.
            </p>
            <Magnetic>
              <ElectricBorder
                color="#4fb7dd"
                speed={0.2}
                chaos={0.09}
                variant="disconnected"
                borderRadius={9999}
              >
                <Button
                  id="watch-trailer"
                  title="Explore More"
                  rightIcon={<TiLocationArrow />}
                  containerClass="cta-transition-btn !bg-[#4fb7dd] !text-[#020609] flex-center gap-1"
                />
              </ElectricBorder>
            </Magnetic>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
