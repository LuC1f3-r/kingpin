'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { Sparkles, BrainCircuit, Radar, Atom } from 'lucide-react';

const items = [
  {
    title: 'Web Neural',
    description: 'Edge-native marketing sites with adaptive story beats.',
    icon: Sparkles
  },
  {
    title: 'SaaS Cognition',
    description: 'Human-in-the-loop dashboards that predict motion before it happens.',
    icon: BrainCircuit
  },
  {
    title: 'Brand Intelligence',
    description: 'Living systems that learn tone, thresholds, and vibe.',
    icon: Radar
  },
  {
    title: 'Immersive Apps',
    description: 'Spatial canvases that speak the same neural language as your team.',
    icon: Atom
  }
];

export function Services() {
  return (
    <section id="services" className="section-shell relative">
      <svg className="pointer-events-none absolute inset-0 -z-10" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(19,224,178,0.35)" />
            <stop offset="100%" stopColor="rgba(111,0,255,0.35)" />
          </linearGradient>
        </defs>
        <path d="M5 30 Q50 10 95 30" stroke="url(#line)" strokeWidth="0.2" fill="none" />
        <path d="M5 70 Q50 90 95 70" stroke="url(#line)" strokeWidth="0.2" fill="none" />
      </svg>
      <div className="container-shell">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Cognitive Architecture</p>
          <h2 className="font-heading text-4xl md:text-5xl">Core services shaped by living data</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item, idx) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
              <GlassCard className="h-full border border-white/10 p-8">
                <div className="flex items-center gap-4">
                  <item.icon className="h-10 w-10 text-teal" />
                  <div>
                    <h3 className="font-heading text-2xl">{item.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
