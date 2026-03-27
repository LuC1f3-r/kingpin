import { useRef } from "react";
import Button from "./Button";
import ElectricBorder from "./ElectricBorder";
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
    <div className="relative h-dvh min-h-screen w-screen overflow-x-hidden">
      <div
        id="video-frame"
        ref={videoFrameRef}
        className="relative z-10 h-dvh w-screen overflow-hidden bg-blue-75"
      >
        <video
          src="/videos/hero-1.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute left-0 top-0 size-full object-cover object-center"
        />

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-70 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              <b>K</b>ingpi<b>n</b>
            </h1>
            <h1 className="special-font subhero-heading text-blue-100">
              Vision Forge
            </h1>
            <p className="mb-5 max-w-100 font-robert text-blue-100">
              Reimagining digital infrastructure. The architecture of tomorrow begins your business operations,
              <br />
              transformed into a seamless ecosystem.
            </p>
            <ElectricBorder color="#4fb7dd" speed={0.2} chaos={0.04} borderRadius={9999}>
              <Button
                id="watch-trailer"
                title="Explore More"
                rightIcon={<TiLocationArrow />}
                containerClass="!bg-blue-500 flex-center gap-1"
              />
            </ElectricBorder>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
