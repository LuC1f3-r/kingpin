import { useState } from "react";

const GOLD = "#c8a84c";

const faqs = [
  {
    q: "What services does KingpiN Vision Forge offer?",
    a: "We offer end-to-end digital services including Web Development, Software Engineering, SaaS Platform Engineering, Cloud Architecture, Mobile App Development, Brand Identity Design, UI/UX Design, and Strategy & Consulting.",
  },
  {
    q: "Where is KingpiN Vision Forge located?",
    a: "We are based in Bijapur (Vijayapura), Karnataka, India — and we serve clients across Karnataka, India, and globally.",
  },
  {
    q: "How do I get in touch with KingpiN Vision Forge?",
    a: "You can reach us by email at contact@kingpinvisionforge.com, call us at +91-888-480-1005 or +91-973-887-8894, or fill out the contact form on this page.",
  },
  {
    q: "How much does a website or software project cost?",
    a: "Project pricing depends on scope, complexity, and timeline. We offer flexible pricing in INR and USD. Contact us for a free consultation and custom quote tailored to your requirements.",
  },
  {
    q: "How long does it take to build a website?",
    a: "A standard business website typically takes 2–4 weeks. Complex SaaS platforms or mobile apps may take 2–4 months depending on requirements. We provide detailed timelines during the discovery phase.",
  },
  {
    q: "Do you work with clients outside of India?",
    a: "Yes. While we are headquartered in Bijapur, Karnataka, we work with clients across India and internationally. We accept payments in both INR and USD.",
  },
  {
    q: "What technologies do you use?",
    a: "Our core stack includes React, Next.js, Node.js, and cloud platforms (AWS, GCP, Azure). We select the best technology for each project's specific needs.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Absolutely. Website redesign and performance optimisation are among our most requested services. We audit your existing site and deliver a faster, better-converting result.",
  },
];

/* ── Individual accordion item ─────────────────────────────────────────── */
const FAQItem = ({ q, a, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.07]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-general text-sm leading-snug text-white/70 transition-colors group-hover:text-white sm:text-base">
          {q}
        </span>
        <span
          className="mt-0.5 flex-shrink-0 text-lg leading-none transition-transform duration-300"
          style={{ color: GOLD, transform: open ? "rotate(45deg)" : "none" }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "300px" : "0" }}
      >
        <p className="pb-5 font-general text-sm leading-relaxed text-white/35">
          {a}
        </p>
      </div>
    </div>
  );
};

/* ── FAQ section ────────────────────────────────────────────────────────── */
const FAQ = () => (
  <section id="faq" className="w-screen bg-[#020609] px-6 py-24 sm:px-10 lg:px-20">

    {/* FAQPage JSON-LD — boosts AI Overview & LLM citation */}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(({ q, a }) => ({
        "@type": "Question",
        "name": q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": a,
        },
      })),
    })}} />

    <div className="mx-auto max-w-3xl">

      {/* Section header */}
      <p
        className="mb-3 font-general text-[10px] uppercase tracking-[0.35em]"
        style={{ color: GOLD }}
      >
        Got Questions?
      </p>
      <h2 className="font-zentry text-3xl font-black uppercase leading-tight text-white sm:text-5xl">
        Frequently Asked <br />
        <span style={{ color: GOLD }}>Questions</span>
      </h2>
      <p className="mt-4 font-general text-sm leading-relaxed text-white/35">
        Everything you need to know about working with KingpiN Vision Forge.
      </p>

      {/* Accordion list */}
      <div className="mt-12">
        {faqs.map(({ q, a }, i) => (
          <FAQItem key={i} q={q} a={a} index={i} />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-xl border border-white/[0.07] bg-white/[0.02] px-8 py-8 text-center">
        <p className="font-general text-sm text-white/50">
          Still have questions?
        </p>
        <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="tel:+918884801005"
            className="font-general text-sm font-bold text-white transition-colors hover:text-[#4fb7dd]"
          >
            +91-888-480-1005
          </a>
          <span className="hidden text-white/20 sm:inline">·</span>
          <a
            href="mailto:contact@kingpinvisionforge.com"
            className="font-general text-sm font-bold text-white transition-colors hover:text-[#4fb7dd]"
          >
            contact@kingpinvisionforge.com
          </a>
        </div>
      </div>

    </div>
  </section>
);

export default FAQ;
