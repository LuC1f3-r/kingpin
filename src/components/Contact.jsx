import Button from "./Button";

const ImageClip = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} />
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-10 min-h-96 w-screen px-4 sm:my-20 sm:px-10">
      <div className="relative rounded-lg bg-black py-16 text-blue-50 sm:py-24 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClip
            src="/img/contact-1.webp"
            clipClass="contact-clip-path-1"
          />
          <ImageClip
            src="/img/contact-2.webp"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>
        <div className="absolute -top-40 left-10 w-48 sm:left-20 sm:w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClip
            src="/img/swordman-partial.webp"
            clipClass="absolute md:scale-125"
          />
          <ImageClip
            src="/img/swordman.webp"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>
        <div className="flex flex-col items-center text-center">
          <p className="special-font mt-10 w-full font-zentry text-3xl leading-[0.9] sm:text-5xl md:text-[6rem] z-10">
            The <b>i</b>nternet is <b>c</b>rowded
            <br /> We build <b>s</b>ystems
            <br />t<b>h</b>at
            <b>w</b>in
          </p>

          <Button
            title="Get in touch"
            containerClass="cta-transition-btn mt-10 cursor-pointer hover:!bg-blue-50"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
