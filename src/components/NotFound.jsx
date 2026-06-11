import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="relative flex min-h-screen w-screen flex-col items-center justify-center overflow-hidden bg-[#070502] px-6 text-center">

    {/* Glowing background orb */}
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-[120px]"
      style={{ background: "radial-gradient(circle, #e8a33d 0%, transparent 70%)" }}
    />

    {/* 404 number */}
    <p
      className="font-zentry text-[120px] font-black leading-none tracking-tight text-white/10 sm:text-[200px]"
      aria-hidden="true"
    >
      404
    </p>

    {/* Message */}
    <h1 className="font-zentry -mt-8 text-2xl font-black uppercase tracking-wide text-white sm:text-4xl">
      Page Not Found
    </h1>
    <p className="mt-4 max-w-sm font-general text-sm leading-relaxed text-white/40">
      This page doesn&apos;t exist — but your next digital empire does.
      <br />Let&apos;s build it together.
    </p>

    {/* Actions */}
    <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
      <Link
        to="/"
        className="rounded-full bg-[#e8a33d] px-8 py-3 font-general text-xs font-bold uppercase tracking-widest text-[#070502] transition-colors hover:bg-[#f5c66d]"
      >
        ← Back to Home
      </Link>
      <Link
        to="/contact"
        className="rounded-full border border-white/10 px-8 py-3 font-general text-xs uppercase tracking-widest text-white/50 transition-colors hover:border-white/30 hover:text-white"
      >
        Contact Us
      </Link>
    </div>

    {/* NAP micro-data for crawlers */}
    <address className="mt-16 not-italic font-general text-[10px] leading-relaxed text-white/15">
      KingpiN Vision Forge · Bijapur, Karnataka 586101, India
      <br />
      <a href="tel:+918884801005" className="hover:text-white/30">+91-888-480-1005</a>
      {" · "}
      <a href="mailto:contact@kingpinvisionforge.com" className="hover:text-white/30">contact@kingpinvisionforge.com</a>
    </address>

  </main>
);

export default NotFound;
