import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * LegalPage — shared layout for Privacy / Terms / Cookie pages.
 * Content lives in LEGAL below; routes pick a key.
 */

const COMPANY = "KingpiN Vision Forge";
const CONTACT = "contact@kingpinvisionforge.com";
const UPDATED = "11 June 2026";

export const LEGAL = {
  "privacy-policy": {
    title: "Privacy Policy",
    sections: [
      {
        h: "What we collect",
        p: `When you contact us through this site (email, phone, or the contact form), we collect the details you choose to share — typically your name, email address, phone number, and the contents of your message. We do not collect payment information through this website.`,
      },
      {
        h: "How we use it",
        p: `We use your contact details solely to respond to your enquiry, scope project work, and communicate with you about services you have requested. We do not sell, rent, or trade your personal information to third parties.`,
      },
      {
        h: "Analytics",
        p: `We may use privacy-respecting analytics to understand how visitors use this site (pages visited, approximate region, device type). This data is aggregated and is not used to identify you personally.`,
      },
      {
        h: "Data retention",
        p: `Enquiry correspondence is retained for as long as needed to serve you and meet our legal obligations, after which it is deleted. You may request deletion of your data at any time by writing to ${CONTACT}.`,
      },
      {
        h: "Your rights",
        p: `You may request a copy of the personal data we hold about you, ask us to correct it, or ask us to delete it. Email ${CONTACT} and we will respond within 30 days.`,
      },
      {
        h: "Contact",
        p: `Questions about this policy: ${CONTACT}.`,
      },
    ],
  },
  "terms-and-conditions": {
    title: "Terms & Conditions",
    sections: [
      {
        h: "Use of this site",
        p: `This website is provided by ${COMPANY} for general information about our services. By using it you agree to these terms. Content on this site may not be copied, reproduced, or redistributed without our written permission.`,
      },
      {
        h: "Project engagements",
        p: `Client engagements are governed by individual written agreements (proposal, statement of work, or contract). Nothing on this website constitutes a binding offer; estimates and capabilities described here are indicative.`,
      },
      {
        h: "Intellectual property",
        p: `The ${COMPANY} name, logo, and all original content, design, and code on this site are our property. Client work shown in the portfolio remains the property of the respective clients and is displayed with permission.`,
      },
      {
        h: "No warranties",
        p: `This site is provided "as is". While we keep information current, we make no warranties about its completeness or accuracy, and we are not liable for decisions made based on it.`,
      },
      {
        h: "Limitation of liability",
        p: `To the maximum extent permitted by law, ${COMPANY} shall not be liable for any indirect or consequential loss arising from the use of this website.`,
      },
      {
        h: "Governing law",
        p: `These terms are governed by the laws of India. Disputes are subject to the jurisdiction of the courts of Karnataka.`,
      },
    ],
  },
  "cookie-policy": {
    title: "Cookie Policy",
    sections: [
      {
        h: "What cookies are",
        p: `Cookies are small text files stored on your device by websites you visit. They help sites remember preferences and understand usage.`,
      },
      {
        h: "How we use cookies",
        p: `This site uses only essential and analytics cookies. Essential cookies make the site function (e.g. remembering motion preferences). Analytics cookies help us understand aggregate visitor behaviour so we can improve the site.`,
      },
      {
        h: "What we don't do",
        p: `We do not use advertising cookies, cross-site tracking, or sell browsing data to third parties.`,
      },
      {
        h: "Managing cookies",
        p: `You can clear or block cookies in your browser settings at any time. Blocking essential cookies may affect how parts of this site behave.`,
      },
      {
        h: "Contact",
        p: `Questions about this policy: ${CONTACT}.`,
      },
    ],
  },
};

const LegalPage = ({ pageKey }) => {
  const page = LEGAL[pageKey];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageKey]);

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-[#070502]">
      <Navbar />
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-36 md:pt-44">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-8 bg-[#e8a33d]" />
          <span className="font-general text-[10px] uppercase tracking-[0.22em] text-[#e8a33d]">
            Legal
          </span>
        </div>
        <h1
          className="mb-3 font-zentry text-4xl font-black uppercase leading-none text-[#f5efe6] sm:text-5xl"
          style={{ fontFeatureSettings: '"ss01" on' }}
        >
          {page.title}
        </h1>
        <p className="mb-12 font-general text-xs text-[#f5efe6]/40">
          Last updated: {UPDATED}
        </p>

        <div className="flex flex-col gap-10">
          {page.sections.map((s) => (
            <div key={s.h}>
              <h2 className="mb-3 font-general text-sm font-semibold uppercase tracking-widest text-[#e8a33d]/90">
                {s.h}
              </h2>
              <p className="font-robert text-sm leading-relaxed text-[#f5efe6]/65">
                {s.p}
              </p>
            </div>
          ))}
        </div>

        <Link
          to="/"
          className="mt-16 inline-block font-general text-xs uppercase tracking-widest text-[#e8a33d] transition-colors hover:text-[#f5c66d]"
        >
          ← Back to home
        </Link>
      </section>
      <Footer />
    </main>
  );
};

export default LegalPage;
