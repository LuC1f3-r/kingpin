import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const preloadTarget = totalVideos - 1;
  const isLoading = loadedVideos < preloadTarget;
  const nextVideoRef = useRef(null);
  const videoFrameRef = useRef(null);

  useEffect(() => {
    if (!isLoading) return;

    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyHeight = body.style.height;
    const previousHtmlOverflow = documentElement.style.overflow;
    const previousHtmlHeight = documentElement.style.height;

    body.style.overflow = "hidden";
    body.style.height = "100%";
    documentElement.style.overflow = "hidden";
    documentElement.style.height = "100%";

    return () => {
      body.style.overflow = previousBodyOverflow;
      body.style.height = previousBodyHeight;
      documentElement.style.overflow = previousHtmlOverflow;
      documentElement.style.height = previousHtmlHeight;
    };
  }, [isLoading]);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });

        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVideoRef.current.play(),
        });

        gsap.from("#current-video", {
          transformOrigin: "center center",
          duration: 0.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true },
  );

  useGSAP(
    () => {
      if (isLoading || !videoFrameRef.current) return;

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
    { dependencies: [isLoading], revertOnUpdate: true },
  );

  const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh min-h-screen w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center fixed inset-0 z-[200] overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}
      <div
        id="video-frame"
        ref={videoFrameRef}
        className="relative z-10 h-dvh w-screen  overflow-hidden bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVideoRef}
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>
          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
          <video
            src={getVideoSrc(currentIndex)}
            autoPlay
            loop
            muted
            onLoadedData={handleVideoLoad}
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        </div>
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redifi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert text-blue-100">
              Reimagining the future of gaming
              <br />
              with immersive experiences and innovative technology
            </p>
            <Button
              id="wath-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5">
        G<b>a</b>ming
      </h1>
    </div>
  );
};

export default Hero;
