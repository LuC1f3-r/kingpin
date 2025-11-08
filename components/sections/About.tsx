'use client';

import { motion } from 'framer-motion';

const keywords = ['adapt', 'learn', 'evolve'];

export function About() {
  return (
    <section id="about" className="section-shell">
      <div className="container-shell grid gap-10 md:grid-cols-2">
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8">
        <motion.svg
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          viewBox="0 0 400 400"
          className="h-[320px] w-full"
        >
          <defs>
            <linearGradient id="mesh" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#13E0B2" />
              <stop offset="100%" stopColor="#6F00FF" />
            </linearGradient>
          </defs>
          <motion.path
            d="M20 200 C120 120 280 280 380 200"
            stroke="url(#mesh)"
            strokeWidth="3"
            fill="none"
            animate={{ pathLength: [0.1, 1, 0.6] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.path
            d="M20 240 C160 160 240 320 380 240"
            stroke="rgba(157,247,255,0.6)"
            strokeWidth="2"
            fill="none"
            animate={{ pathLength: [0.2, 1, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
          />
          {Array.from({ length: 20 }).map((_, index) => (
            <motion.circle
              key={index}
              cx={40 + index * 16}
              cy={180 + Math.sin(index) * 30}
              r={index % 3 === 0 ? 4 : 2}
              fill={index % 3 === 0 ? '#13E0B2' : '#6F00FF'}
              animate={{ opacity: [0.2, 1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: index * 0.1 }}
            />
          ))}
        </motion.svg>
        </div>
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">The Conscious Code</p>
          <h2 className="font-heading text-4xl leading-tight">
            We architect sensorial systems that{' '}
          {keywords.map((word) => (
            <motion.span
              key={word}
              className="group relative mx-1 inline-flex cursor-pointer font-heading uppercase"
              whileHover={{ textShadow: '0 0 20px rgba(19,224,178,0.9)' }}
            >
              <span className="relative z-10">{word}</span>
              <span className="absolute inset-x-0 bottom-0 h-1 rounded-full bg-gradient-to-r from-teal to-violet opacity-0 transition group-hover:opacity-100" />
            </motion.span>
          ))}{' '}
          in realtime.
          </h2>
          <p className="text-lg text-muted-foreground">
            Neural heuristics, cinematic craft, and datastream choreography converge to keep every brand experience living, breathing, and aware.
          </p>
        </div>
      </div>
    </section>
  );
}
