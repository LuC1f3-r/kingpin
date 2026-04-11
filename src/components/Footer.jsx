import { FaLinkedin, FaInstagram, FaReddit } from "react-icons/fa";

/* ── Data ──────────────────────────────────────────────────────────────────── */
const services = [
  "Software Engineering",
  "Web Development",
  "Brand Identity",
  "UI / UX Design",
  "Mobile Apps",
];

const company = [
  { label: "About Us",  href: "#about"    },
  { label: "Our Work",  href: "#features" },
  { label: "Process",   href: "#process"  },
  { label: "FAQ",       href: "#faq"      },
  { label: "Careers",   href: "#careers"  },
  { label: "Contact",   href: "#contact"  },
];

const socialLinks = [
  { href: "https://www.linkedin.com/company/kingpinvisionforge/", Icon: FaLinkedin },
  { href: "https://www.instagram.com/kingpinvisionforge/",        Icon: FaInstagram },
  { href: "https://www.reddit.com/r/KingpiNVisionForge/",         Icon: FaReddit   },
];

/* ── Gold colour used throughout ─────────────────────────────────────────── */
const GOLD = "#c8a84c";

/* ── Sub-components ─────────────────────────────────────────────────────── */
const ColHead = ({ children }) => (
  <p
    className="mb-6 font-general text-[10px] uppercase tracking-[0.35em]"
    style={{ color: GOLD }}
  >
    {children}
  </p>
);

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="block font-general text-sm leading-relaxed text-white/40 transition-colors duration-300 hover:text-white"
  >
    {children}
  </a>
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
        <div className="flex items-center gap-3">
          <img src="/img/logo.png" alt="KingpiN Vision Forge logo" className="h-10 w-10 object-contain" />
          <div className="font-zentry font-black uppercase leading-none tracking-wide"
               style={{ fontFeatureSettings: '"ss01" on', fontSize: "1.15rem" }}>
            <span className="text-white">Kingpin </span>
            <span style={{ color: GOLD }}>Vision Forge</span>
          </div>
        </div>

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
          {socialLinks.map((link) => {
            const SocialIcon = link.Icon;

            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/25 transition-colors duration-300 hover:text-white"
              >
                {SocialIcon ? <SocialIcon size={15} /> : null}
              </a>
            );
          })}
        </div>
      </div>

      {/* ── Right — Nav columns ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">

        {/* Services */}
        <div>
          <ColHead>Services</ColHead>
          <div className="flex flex-col gap-3">
            {services.map((s) => (
              <NavLink key={s} href="#services">{s}</NavLink>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <ColHead>Company</ColHead>
          <div className="flex flex-col gap-3">
            {company.map(({ label, href }) => (
              <NavLink key={label} href={href}>{label}</NavLink>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <ColHead>Contact</ColHead>
          <div className="flex flex-col gap-3">
            <a
              href="mailto:kingpinvisionforge@gmail.com"
              className="font-general text-sm text-white/40 transition-colors duration-300 hover:text-white"
            >
              kingpinvisionforge@gmail.com
            </a>
            <a
              href="#contact"
              className="font-general text-sm text-white/40 transition-colors duration-300 hover:text-white"
            >
              Book a Call
            </a>
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
        <a href="#privacy-policy"    className="transition-colors hover:text-white/50">Privacy Policy</a>
        <a href="#terms-n-conditions" className="transition-colors hover:text-white/50">Terms & Conditions</a>
      </div>
    </div>

  </footer>
);

export default Footer;
