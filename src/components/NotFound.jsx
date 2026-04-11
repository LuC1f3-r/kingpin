import { Link } from "react-router-dom";
import { TbArrowUpRight } from "react-icons/tb";

const NotFound = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020609] px-4 py-20 text-[#eef2ff] sm:px-8">
      <div className="absolute left-[-10%] top-10 h-72 w-72 rounded-full bg-[#4fb7dd]/10 blur-3xl" />
      <div className="absolute bottom-[-6%] right-[-8%] h-80 w-80 rounded-full bg-cyan-400/8 blur-3xl" />

      <div className="relative w-full max-w-2xl rounded-[32px] border border-[#4fb7dd]/14 bg-[rgba(7,14,22,0.9)] p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.38)] backdrop-blur-sm sm:p-12">
        <p className="font-general text-[10px] uppercase tracking-[0.34em] text-[#4fb7dd]/80">
          Error 404
        </p>
        <h1
          className="mt-5 font-zentry text-5xl font-black uppercase leading-none sm:text-6xl"
          style={{ fontFeatureSettings: '"ss01" on' }}
        >
          Signal lost.
        </h1>
        <p className="mx-auto mt-5 max-w-xl font-robert text-sm leading-relaxed text-[#eef2ff]/68 sm:text-[15px]">
          The page you requested does not exist. Head back to the main site or
          jump straight into the contact section.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="cta-transition-btn inline-flex items-center gap-2 rounded-full bg-[#4fb7dd] px-5 py-3 font-general text-xs font-semibold uppercase tracking-[0.24em] text-[#020609]"
          >
            Return Home
            <TbArrowUpRight size={16} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 font-general text-xs uppercase tracking-[0.24em] text-[#eef2ff]/72 transition-colors duration-300 hover:border-[#4fb7dd]/26 hover:text-[#eef2ff]"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
