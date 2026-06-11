import Button from "./Button";
import { FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  return (
    <div id="contact" className="my-10 min-h-96 w-screen px-4 sm:my-20 sm:px-10">
      <div className="relative overflow-hidden rounded-lg bg-black py-16 text-blue-50 sm:py-24">
        {/* Ambient brand glows */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#4fb7dd]/20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#4fb7dd]/15 blur-[120px]" />

        <div className="relative flex flex-col items-center text-center">
          <p className="special-font mt-10 w-full font-zentry text-3xl leading-[0.9] sm:text-5xl md:text-[6rem] z-10">
            The <b>i</b>nternet is <b>c</b>rowded.
            <br /> We build <b>s</b>ystems
            <br />t<b>h</b>at <b>w</b>in
          </p>

          <Button
            title="Get in touch"
            containerClass="cta-transition-btn mt-10 cursor-pointer hover:!bg-blue-50"
          />

          {/* ── Contact details ── */}
          <div className="relative z-10 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
            <a
              href="tel:+918884801005"
              className="flex items-center gap-2 font-general text-sm text-blue-50/60 transition-colors hover:text-white"
              aria-label="Call us at +91-888-480-1005"
            >
              <FaPhone size={13} />
              +91-888-480-1005
            </a>
            <a
              href="tel:+919738878894"
              className="flex items-center gap-2 font-general text-sm text-blue-50/60 transition-colors hover:text-white"
              aria-label="Call us at +91-973-887-8894"
            >
              <FaWhatsapp size={14} />
              +91-973-887-8894
            </a>
            <a
              href="mailto:contact@kingpinvisionforge.com"
              className="flex items-center gap-2 font-general text-sm text-blue-50/60 transition-colors hover:text-white"
              aria-label="Email us"
            >
              <FaEnvelope size={13} />
              contact@kingpinvisionforge.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
