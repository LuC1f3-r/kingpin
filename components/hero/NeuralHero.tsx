'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/sections/Contact';
import { getLenis } from '@/lib/scroll/lenis';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

const OrbScene = dynamic(() => import('./OrbScene').then((mod) => mod.OrbScene), {
  ssr: false,
  loading: () => <div className="h-[70vh] w-full bg-gradient-to-br from-teal/20 to-violet/10" />
});

const sentence = ['Forging', 'the', 'future', 'intelligence', 'of', 'brands'];

export function NeuralHero() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);

  const handleExplore = () => {
    const target = document.querySelector('#about');
    const lenis = getLenis();
    if (target && lenis) {
      lenis.scrollTo(target, { offset: -60 });
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-80">
        {!reduced ? (
          <Suspense fallback={<div className="h-full w-full bg-gradient-to-br from-teal/20 to-violet/10" />}>
            <OrbScene />
          </Suspense>
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(19,224,178,0.25),_transparent_60%)]" />
        )}
      </div>
      <div className="relative z-10 section-shell">
        <div className="container-shell flex flex-col items-center gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-full border border-white/10 px-6 py-2 text-[0.65rem] uppercase tracking-[0.5em] text-muted-foreground"
          >
            The Neural Forge
          </motion.div>
          <motion.h1 className="font-heading text-[clamp(3rem,6vw,6.5rem)] uppercase leading-[1.05] drop-shadow-[0_10px_40px_rgba(0,0,0,0.7)]">
            {sentence.map((word, index) => (
              <motion.span
                key={word}
                className="inline-block bg-gradient-to-r from-teal via-ivory to-violet bg-clip-text px-2 text-transparent"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 * index, duration: 0.5, ease: 'circOut' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            className="max-w-2xl text-base text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            Where design precision meets engineered cognition. We craft cinematic neural interfaces that adapt in real-time to your brand intelligence.
          </motion.p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <MagneticButton onClick={handleExplore}>Explore Our Realm</MagneticButton>
            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger asChild>
                <Button variant="ghost" size="lg">
                  Let’s Build Intelligence
                </Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur" />
                <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4">
                  <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-surface/90 p-8 shadow-glow">
                    <div className="mb-6 flex items-center justify-between">
                      <Dialog.Title className="text-2xl font-heading">Initiate Connection</Dialog.Title>
                      <Dialog.Close className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.4em]">
                        Close
                      </Dialog.Close>
                    </div>
                    <ContactForm compact onSuccess={() => setOpen(false)} />
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </div>
    </section>
  );
}
