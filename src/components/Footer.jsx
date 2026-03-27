import { FaDiscord, FaTwitter, FaYoutube, FaMedium, FaLinkedin, FaInstagram, FaReddit } from "react-icons/fa";

const socialLinks = [
  { href: "https://www.linkedin.com/company/kingpinvisionforge/", icon: <FaLinkedin /> },
  { href: "https://www.instagram.com/kingpinvisionforge/", icon: <FaInstagram /> },
  { href: "https://www.reddit.com/r/KingpiNVisionForge/", icon: <FaReddit /> },
  // { href: "https://medium.com", icon: <FaMedium /> },
];
const Footer = () => {
  return (
    <footer className="w-screen bg-violet-300 py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm md:text-left">
          &copy; KingpiN Vision Forge 2026. All rights reserved.
        </p>

        <div className="flex justify-center gap-4 md:justify-start">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>
        <div
          className="text-center text-sm font-light hover:underline md:text-right"
        >
          <a
            href="#privacy-policy"
            className="mr-10"
          >
            Privacy Policy
          </a>
          <a
            href="#terms-n-conditions"
          >
            Terms and Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
