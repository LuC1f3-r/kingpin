import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import ElectricBorder from "./ElectricBorder";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const navItems = ["About", "Services", "Products"];

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Refs for audio and navigation container
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (!navContainerRef.current) return;

    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (!audioElementRef.current) return;
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  return (
    <>
      <div
        ref={navContainerRef}
        className="nav-shell fixed inset-x-0 top-4 z-50 h-14 border-none transition-all duration-700 sm:top-6 sm:inset-x-6"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between px-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src="/img/logo.png" alt="logo" className="w-8 sm:w-10" />
              <span className="font-zentry text-[10px] uppercase text-white tracking-wider sm:text-xs">
                Kingpin Vision Forge
              </span>
            </div>

            {/* Desktop nav */}
            <div className="flex h-full items-center">
              <div className="hidden md:block">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="nav-hover-btn"
                  >
                    {item}
                  </a>
                ))}
              </div>

              <div className="ml-8 hidden md:block">
                <ElectricBorder color="#4fb7dd" speed={0.2} chaos={0.04} variant="disconnected" borderRadius={9999}>
                  <Button
                    id="product-button"
                    title="Contact Us"
                    rightIcon={<TiLocationArrow />}
                    containerClass="cta-transition-btn !bg-[#4fb7dd] !text-[#020609] hover:!bg-[#78c9e5] flex items-center justify-center gap-1"
                  />
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
                  style={{
                    transform: isMobileMenuOpen ? "rotate(45deg) translateY(7px)" : "none",
                  }}
                />
                <span
                  className="block h-[2px] w-6 bg-white transition-all duration-300"
                  style={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                />
                <span
                  className="block h-[2px] w-6 bg-white transition-all duration-300"
                  style={{
                    transform: isMobileMenuOpen ? "rotate(-45deg) translateY(-7px)" : "none",
                  }}
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
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="border-b border-white/5 py-4 font-general text-sm uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-[#4fb7dd]"
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-6 w-full rounded-full bg-[#4fb7dd] py-3 text-center font-general text-xs uppercase tracking-widest text-[#020609] font-bold"
          >
            Contact Us
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
