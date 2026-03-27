import Button from "./Button";

const ImageClip = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} />
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
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
        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80 ">
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
          <p className="special-font mt-10 w-full font-zentry text-5xl leading-[0.9] md:text-[6rem] z-10">
            The <b>i</b>nternet is <b>c</b>rowded<br /> We build <b>s</b>ystems<br />t<b>h</b>at
            <b>w</b>in
          </p>

          <Button title="Get in touch" containerClass="mt-10 cursor-pointer"/>
        </div>
      </div>
    </div>
  );
};

export default Contact;
