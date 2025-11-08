'use client';

import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import { useScrollTrigger } from '@/lib/scroll/scrolltrigger';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

const phases = ['Input', 'Design', 'Forge', 'Train', 'Evolve'];

export function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ScrollTrigger = useScrollTrigger();
    if (!ScrollTrigger || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.phase-node').forEach((node, index) => {
        gsap.fromTo(
          node,
          { opacity: 0.3, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            scrollTrigger: {
              trigger: node,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            },
            delay: index * 0.1
          }
        );
      });
    }, ref);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="process" className="section-shell" ref={ref}>
      <div className="container-shell">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Input → Evolve</p>
        <h2 className="font-heading text-4xl md:text-5xl">Our philosophy</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-5">
          {phases.map((phase, index) => (
            <div key={phase} className="phase-node flex flex-col gap-4 rounded-3xl border border-white/10 bg-surface/60 p-6 text-center shadow-card">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-teal/40 text-lg font-bold">0{index + 1}</div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">{phase}</p>
            <p className="text-xs text-muted-foreground">
              {index === 0 && 'Ingest signals, context, and the edges of ambition.'}
              {index === 1 && 'Translate instincts into orchestrated sensory briefs.'}
              {index === 2 && 'Build cinematic neural canvases ready for live data.'}
              {index === 3 && 'Train the system with safeguards, telemetry, and care.'}
              {index === 4 && 'Deploy, learn, and evolve the ritual with every touch.'}
            </p>
          </div>
          ))}
        </div>
      </div>
    </section>
  );
}
