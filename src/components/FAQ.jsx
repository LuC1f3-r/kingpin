import { useState } from "react";
import {
  TbArrowUpRight,
  TbHelpHexagon,
  TbShieldCheck,
  TbSparkles,
  TbTimelineEvent,
} from "react-icons/tb";

const faqItems = [
  {
    category: "Scope",
    question: "What kinds of projects do you take on?",
    answer:
      "We handle brand-led websites, custom web platforms, SaaS builds, product launches, and redesigns where the core goal is growth, clarity, and better digital performance.",
  },
  {
    category: "Timeline",
    question: "How long does a typical project take?",
    answer:
      "Smaller marketing sites usually move in a few weeks, while larger product and platform work can span multiple phases. We define milestones early so you know what ships, when it ships, and what decisions unlock the next stage.",
  },
  {
    category: "Process",
    question: "How do revisions, feedback, and approvals work?",
    answer:
      "We keep feedback structured through focused review rounds, checkpoint approvals, and weekly progress updates. That keeps momentum high and avoids the slow drift that usually kills timelines.",
  },
  {
    category: "Tech",
    question: "Can you work with our current stack or team?",
    answer:
      "Yes. We can build from zero or step into an existing codebase, design system, or product workflow. If there is technical debt, we surface it early and show the tradeoffs before we commit to a path.",
  },
  {
    category: "Support",
    question: "Do you stay involved after launch?",
    answer:
      "Yes. We support launch readiness, post-launch fixes, performance tuning, and longer-term iteration. The handoff can be light-touch or ongoing depending on how your team operates.",
  },
  {
    category: "Pricing",
    question: "How do pricing and scope get defined?",
    answer:
      "We scope around business outcomes, technical complexity, and delivery speed. After discovery, we turn that into a clear project plan so expectations, budget, and responsibilities are aligned before execution starts.",
  },
];

const signals = [
  {
    label: "Kickoff",
    value: "Fast discovery",
    Icon: TbTimelineEvent,
  },
  {
    label: "Delivery",
    value: "Clear milestones",
    Icon: TbSparkles,
  },
  {
    label: "Support",
    value: "Launch coverage",
    Icon: TbShieldCheck,
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[#020609] px-4 py-20 sm:px-10 md:px-16 lg:px-20"
    >
      <div className="absolute inset-0">
        <div className="absolute left-[-12%] top-10 h-72 w-72 rounded-full bg-[#4fb7dd]/12 blur-3xl" />
        <div className="absolute right-[-10%] top-1/3 h-80 w-80 rounded-full bg-cyan-400/8 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-white/4 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-4 font-general text-[10px] uppercase tracking-[0.32em] text-[#4fb7dd]/80">
            FAQ Protocol
          </p>
          <h2
            className="font-zentry text-4xl font-black uppercase leading-none text-[#eef2ff] sm:text-5xl lg:text-6xl"
            style={{ fontFeatureSettings: '"ss01" on' }}
          >
            The answers
            <br />
            before the
            <span className="text-[#4fb7dd]"> build.</span>
          </h2>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden rounded-[32px] border border-[#4fb7dd]/12 bg-[linear-gradient(180deg,rgba(10,19,30,0.96),rgba(4,9,14,0.98))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4fb7dd]/55 to-transparent" />

            <div className="inline-flex items-center gap-3 rounded-full border border-[#4fb7dd]/16 bg-[#4fb7dd]/8 px-4 py-2">
              <TbHelpHexagon className="text-[#4fb7dd]" size={18} />
              <span className="font-general text-[10px] uppercase tracking-[0.28em] text-[#eef2ff]/70">
                Zero-friction onboarding
              </span>
            </div>

            <p className="mt-6 max-w-xl font-robert text-sm leading-relaxed text-[#eef2ff]/68 sm:text-[15px]">
              From timelines and scope to collaboration and support, this is
              the baseline clarity most teams need before they commit to a new
              digital build.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              {signals.map((signal) => {
                const SignalIcon = signal.Icon;

                return (
                  <div
                    key={signal.label}
                    className="rounded-[22px] border border-white/6 bg-white/[0.03] px-4 py-4 backdrop-blur-sm"
                  >
                    {SignalIcon ? (
                      <SignalIcon className="mb-4 text-[#4fb7dd]" size={18} />
                    ) : null}
                    <p className="font-general text-[10px] uppercase tracking-[0.22em] text-[#eef2ff]/40">
                      {signal.label}
                    </p>
                    <p className="mt-2 font-zentry text-lg font-black uppercase text-[#eef2ff]">
                      {signal.value}
                    </p>
                  </div>
                );
              })}
            </div>

            <a
              href="#contact"
              className="cta-transition-btn mt-8 inline-flex items-center gap-2 rounded-full border border-[#4fb7dd]/20 bg-[#4fb7dd] px-5 py-3 font-general text-xs font-semibold uppercase tracking-[0.22em] text-[#020609]"
            >
              Start a project
              <TbArrowUpRight size={16} />
            </a>
          </div>

          <div className="space-y-4">
            {faqItems.map(({ category, question, answer }, index) => {
              const isOpen = openIndex === index;

              return (
                <article
                  key={question}
                  className="rounded-[28px] border border-white/7 bg-[rgba(7,14,22,0.88)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:p-6"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() =>
                      setOpenIndex((current) =>
                        current === index ? -1 : index,
                      )
                    }
                    className="flex w-full items-start justify-between gap-4 text-left"
                  >
                    <div>
                      <span className="inline-block rounded-full border border-[#4fb7dd]/14 bg-[#4fb7dd]/8 px-3 py-1 font-general text-[10px] uppercase tracking-[0.24em] text-[#4fb7dd]">
                        {category}
                      </span>
                      <h3
                        className="mt-4 max-w-2xl font-zentry text-2xl font-black uppercase leading-[1.05] text-[#eef2ff] sm:text-[2rem]"
                        style={{ fontFeatureSettings: '"ss01" on' }}
                      >
                        {question}
                      </h3>
                    </div>

                    <span className="relative mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#4fb7dd]/15 bg-[#4fb7dd]/6">
                      <span className="absolute h-px w-4 bg-[#4fb7dd]" />
                      <span
                        className={`absolute h-4 w-px bg-[#4fb7dd] transition-transform duration-300 ${
                          isOpen ? "scale-y-0" : "scale-y-100"
                        }`}
                      />
                    </span>
                  </button>

                  <div
                    id={`faq-panel-${index}`}
                    className={`grid overflow-hidden transition-all duration-300 ${
                      isOpen
                        ? "mt-5 grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-white/8 pt-5">
                        <p className="max-w-3xl font-robert text-sm leading-relaxed text-[#eef2ff]/68 sm:text-[15px]">
                          {answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
