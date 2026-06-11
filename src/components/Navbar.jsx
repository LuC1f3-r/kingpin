import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import ElectricBorder from "./ElectricBorder";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";

/* Each nav item maps to a real route (React Router handles scroll-to-section) */
const navItems = [
  { label: "About",    to: "/about"    },
  { label: "Services", to: "/services" },
  { label: "Work",     to: "/work"     },
  { label: "FAQ",      to: "/faq"      },
];

const Navbar = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navContainerRef = useRef(null);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const container = navContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        container.classList.remove("floating-nav");
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollYRef.current) {
        container.classList.add("floating-nav");
        setIsNavVisible((prev) => (prev ? false : prev));
      } else {
        container.classList.add("floating-nav");
        setIsNavVisible((prev) => (prev ? prev : true));
      }

      lastScrollYRef.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <>
      <div
        ref={navContainerRef}
        className="nav-shell fixed inset-x-0 top-4 z-50 h-14 border-none transition-all duration-700 sm:top-6 sm:inset-x-6"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between px-4">
            {/* Logo — always goes home */}
            <Link to="/" className="flex items-center gap-3">
              <img src="/img/logo.png" alt="KingpiN Vision Forge logo" className="w-8 sm:w-10" />
              <span className="font-zentry text-[10px] uppercase text-white tracking-wider sm:text-xs">
                Kingpin Vision Forge
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="flex h-full items-center">
              <div className="hidden md:block">
                {navItems.map(({ label, to }) => (
                  <Link
                    key={label}
                    to={to}
                    className="nav-hover-btn"
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <div className="ml-8 hidden md:block">
                <ElectricBorder color="#4fb7dd" speed={0.2} chaos={0.04} variant="disconnected" borderRadius={9999}>
                  <Link to="/contact">
                    <Button
                      id="product-button"
                      title="Contact Us"
                      rightIcon={<TiLocationArrow />}
                      containerClass="cta-transition-btn !bg-[#4fb7dd] !text-[#020609] hover:!bg-[#78c9e5] flex items-center justify-center gap-1"
                    />
                  </Link>
                </ElectricBorder>
              </div>

              {/* Mobile hamburger */}
              <button
                className="ml-4 flex md:hidden flex-col gap-[5px] p-2"
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                <span
                  className="block h-[2px] w-6 bg-white transition-all duration-300"
                  style={{ transform: isMobileMenuOpen ? "rotate(45deg) translateY(7px)" : "none" }}
                />
                <span
                  className="block h-[2px] w-6 bg-white transition-all duration-300"
                  style={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                />
                <span
                  className="block h-[2px] w-6 bg-white transition-all duration-300"
                  style={{ transform: isMobileMenuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }}
                />
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* Mobile slide-down menu */}
      <div
        className="fixed inset-x-0 top-0 z-40 flex flex-col bg-[rgba(2,6,9,0.97)] backdrop-blur-xl transition-all duration-500 md:hidden"
        style={{
          maxHeight: isMobileMenuOpen ? "100dvh" : "0",
          overflow: "hidden",
          borderBottom: isMobileMenuOpen ? "1px solid rgba(79,183,221,0.1)" : "none",
        }}
      >
        <div className="flex flex-col gap-1 px-6 pb-8 pt-24">
          {navItems.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              onClick={() => setIsMobileMenuOpen(false)}
              className="border-b border-white/5 py-4 font-general text-sm uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-[#4fb7dd]"
            >
              {label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-6 w-full rounded-full bg-[#4fb7dd] py-3 text-center font-general text-xs uppercase tracking-widest text-[#020609] font-bold"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
