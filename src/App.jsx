import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import About from "./components/About";
import Claims from "./components/Claims";
import Contact from "./components/Contact";
import Description from "./components/Description";
import Products from "./components/Products";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import LoadingScreen from "./components/LoadingScreen";
import Marquee from "./components/Marquee";
import Navbar from "./components/Navbar";
import Process from "./components/Process";
import SmoothScroll, { getLenis } from "./components/SmoothScroll";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Work from "./components/Work";
import FAQ from "./components/FAQ";
import NotFound from "./components/NotFound";

/* ── Scroll-to-section helper used by router-aware nav links ── */
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el, { duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

/* ── Route handler: scrolls to the right section after navigation ── */
const SectionRoute = ({ sectionId }) => {
  const location = useLocation();
  useEffect(() => {
    // Small delay so the homepage renders first
    const t = setTimeout(() => scrollToSection(sectionId), 80);
    return () => clearTimeout(t);
  }, [location, sectionId]);
  return null; // rendering is handled by Homepage
};

/* ── Full homepage — all sections ── */
const Homepage = ({ loading, setLoading }) => (
  <main className="relative min-h-screen w-screen overflow-x-hidden">
    {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
    <Navbar />
    <Hero />
    <Description />
    <About />
    <Services />
    <Marquee />
    <Work />
    <Process />
    <Products />
    <Claims />
    <Testimonials />
    <FAQ />
    <Contact />
    <Footer />
  </main>
);

/* ── App shell with router ── */
const AppRoutes = () => {
  const [loading, setLoading] = useState(true);

  return (
    <Routes>
      {/* Main page */}
      <Route path="/" element={<Homepage loading={loading} setLoading={setLoading} />} />

      {/* Section deep-links — render homepage + scroll to section */}
      <Route
        path="/about"
        element={
          <>
            <Homepage loading={loading} setLoading={setLoading} />
            <SectionRoute sectionId="about" />
          </>
        }
      />
      <Route
        path="/services"
        element={
          <>
            <Homepage loading={loading} setLoading={setLoading} />
            <SectionRoute sectionId="services" />
          </>
        }
      />
      <Route
        path="/contact"
        element={
          <>
            <Homepage loading={loading} setLoading={setLoading} />
            <SectionRoute sectionId="contact" />
          </>
        }
      />

      <Route
        path="/work"
        element={
          <>
            <Homepage loading={loading} setLoading={setLoading} />
            <SectionRoute sectionId="work" />
          </>
        }
      />

      <Route
        path="/faq"
        element={
          <>
            <Homepage loading={loading} setLoading={setLoading} />
            <SectionRoute sectionId="faq" />
          </>
        }
      />

      {/* 404 catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <SmoothScroll />
      <AppRoutes />
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
