import { FaLinkedin, FaInstagram, FaReddit } from "react-icons/fa";
import { Link } from "react-router-dom";

/* ── Data ──────────────────────────────────────────────────────────────────── */
const services = [
  "Software Engineering",
  "Web Development",
  "Brand Identity",
  "UI / UX Design",
  "Mobile Apps",
];

const company = [
  { label: "About Us",  to: "/about"     },
  { label: "Our Work",  to: "/#products" },
  { label: "Process",   to: "/#process"  },
  { label: "FAQ",       to: "/faq"       },
  { label: "Contact",   to: "/contact"   },
];

const socialLinks = [
  { href: "https://www.linkedin.com/company/kingpinvisionforge/", Icon: FaLinkedin, label: "LinkedIn" },
  { href: "https://www.instagram.com/kingpinvisionforge/",        Icon: FaInstagram, label: "Instagram" },
  { href: "https://www.reddit.com/r/KingpiNVisionForge/",         Icon: FaReddit,    label: "Reddit"    },
];

/* ── Brand accent used throughout ────────────────────────────────────────── */
const ACCENT = "#4fb7dd";

/* ── Sub-components ─────────────────────────────────────────────────────── */
const ColHead = ({ children }) => (
  <p
    className="mb-6 font-general text-[10px] uppercase tracking-[0.35em]"
    style={{ color: ACCENT }}
  >
    {children}
  </p>
);

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="block font-general text-sm leading-relaxed text-white/40 transition-colors duration-300 hover:text-white"
  >
    {children}
  </Link>
);

/* ── Footer ─────────────────────────────────────────────────────────────── */
const Footer = () => (
  <footer className="w-screen bg-[#020609]">

    {/* Top hairline */}
    <div className="h-px w-full bg-white/[0.07]" />

    {/* Main content */}
    <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-16 px-8 py-20 md:grid-cols-[1fr_2fr] lg:px-16">

      {/* ── Left — Brand ───────────────────────────────────────────────── */}
      <div className="flex flex-col gap-6">

        {/* Logo + wordmark */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/img/logo.png" alt="KingpiN Vision Forge logo" className="h-10 w-10 object-contain" />
          <div className="font-zentry font-black uppercase leading-none tracking-wide"
               style={{ fontFeatureSettings: '"ss01" on', fontSize: "1.15rem" }}>
            <span className="text-white">Kingpin </span>
            <span style={{ color: ACCENT }}>Vision Forge</span>
          </div>
        </Link>

        {/* Tagline */}
        <p className="font-general text-[11px] leading-relaxed text-white/30 tracking-wide">
          Software · Web Development · Branding.
        </p>

        {/* Description */}
        <p className="font-general text-[11px] leading-relaxed text-white/25 max-w-[220px]">
          We forge digital empires, one pixel and one line of code at a time.
        </p>

        {/* Social icons */}
        <div className="mt-2 flex items-center gap-4">
          {socialLinks.map(({ href, Icon, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-white/25 transition-colors duration-300 hover:text-white"
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>

      {/* ── Right — Nav columns ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">

        {/* Services */}
        <div>
          <ColHead>Services</ColHead>
          <div className="flex flex-col gap-3">
            {services.map((s) => (
              <NavLink key={s} to="/services">{s}</NavLink>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <ColHead>Company</ColHead>
          <div className="flex flex-col gap-3">
            {company.map(({ label, to }) => (
              <NavLink key={label} to={to}>{label}</NavLink>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <ColHead>Contact</ColHead>
          <div className="flex flex-col gap-3">
            <a
              href="mailto:contact@kingpinvisionforge.com"
              className="font-general text-sm text-white/40 transition-colors duration-300 hover:text-white"
            >
              contact@kingpinvisionforge.com
            </a>
            <a
              href="tel:+918884801005"
              className="font-general text-sm text-white/40 transition-colors duration-300 hover:text-white"
            >
              +91-888-480-1005
            </a>
            <a
              href="tel:+919738878894"
              className="font-general text-sm text-white/40 transition-colors duration-300 hover:text-white"
            >
              +91-973-887-8894
            </a>
            <Link
              to="/contact"
              className="font-general text-sm text-white/40 transition-colors duration-300 hover:text-white"
            >
              Book a Call
            </Link>
          </div>
        </div>

      </div>
    </div>

    {/* Bottom bar */}
    <div className="h-px w-full bg-white/[0.05]" />
    <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-4 px-8 py-5 sm:flex-row lg:px-16">
      <p className="font-general text-[10px] tracking-widest text-white/20">
        © KingpiN Vision Forge 2026. All rights reserved.
      </p>
      <div className="flex gap-6 font-general text-[10px] tracking-widest text-white/20">
        <a href="/#privacy-policy"     className="transition-colors hover:text-white/50">Privacy Policy</a>
        <a href="/#terms-n-conditions" className="transition-colors hover:text-white/50">Terms &amp; Conditions</a>
      </div>
    </div>

  </footer>
);

export default Footer;
