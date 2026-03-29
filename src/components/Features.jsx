import { useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef();

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / width;

    const tiltX = (relativeY - 0.5) * 10;
    const tiltY = (relativeX - 0.5) * -10;

    const newTransform = `perspective(700) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.94, 0.92)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

const BentoCard = ({ src, title, description, isComingSoon }) => {
  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        playsInline
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>
        {isComingSoon && (
          <p className="font-general text-xs uppercase opacity-80">
            Coming soon
          </p>
        )}
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">
            Built For Digital Growth
          </p>
          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Kingpin Vision Forge builds custom websites, SaaS platforms,
            mobile apps, and brand systems for ambitious businesses across
            Bijapur, Bangalore, and India.
          </p>
        </div>
        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="/videos/feature-1.mp4"
            title={
              <>
                web <b>d</b>ev
              </>
            }
            description="Custom websites and digital experiences built for speed, clarity, and long-term brand authority."
          />
        </BentoTilt>
        <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="bento-tilt_1 col-span-2 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="/videos/feature-2.mp4"
              title={
                <>
                  saa<b>s</b> eng
                </>
              }
              description="Multi-tenant platforms, dashboards, and internal systems engineered for scale, automation, and clean operations."
              isComingSoon
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 col-span-2 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              src="/videos/feature-3.mp4"
              title={
                <>
                  clo<b>u</b>d ops
                </>
              }
              description="Deployment pipelines, hosting architecture, and resilient infrastructure tuned for uptime, security, and growth."
              isComingSoon
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 col-span-2 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="/videos/feature-4.mp4"
              title={
                <>
                  bran<b>d</b> sys
                </>
              }
              description="Identity systems, UI direction, and visual assets that keep every launch consistent, credible, and unmistakably yours."
              isComingSoon
            />
          </BentoTilt>
          <BentoTilt className="bento-tilt_2">
            <video
              src="/videos/feature-5.mp4"
              loop
              muted
              autoPlay
              playsInline
              className="size-full object-cover object-center"
            />
          </BentoTilt>
          <BentoTilt className="bento-tilt_2">
            <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
              <h1 className="bento-title special-font max-w-64 text-black">
                mobile <b>a</b>pps
              </h1>
              <TiLocationArrow className="m-5 scale-[5] self-end" />
            </div>
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
