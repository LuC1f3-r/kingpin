"use client";

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Volume2, VolumeX, Waves } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { setAmbient } from '@/lib/sound/sound';
import { getLenis } from '@/lib/scroll/lenis';

const navItems = [
  { label: 'Realm', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#case-studies' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' }
];

export function TopNav() {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('kvf-sound');
    const isOn = stored === 'on';
    setEnabled(isOn);
    setAmbient(isOn);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setAmbient(enabled);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kvf-sound', enabled ? 'on' : 'off');
    }
  }, [enabled, mounted]);

  const handleNav = useCallback((href: string) => {
    const target = document.querySelector(href);
    const lenis = getLenis();
    if (target && lenis) {
      lenis.scrollTo(target, { offset: -80 });
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="container-shell">
        <div className="pointer-events-auto mt-6 flex items-center justify-between rounded-full border border-white/10 bg-black/35 px-6 py-3 backdrop-blur-2xl">
          <Link href="#hero" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.4em]">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-teal to-violet animate-pulse" />
            KingpiN Vision Forge
          </Link>
          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNav(item.href)}
                className="text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground transition hover:text-ivory"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.3em]">
              <Waves className="h-4 w-4 text-teal" aria-hidden />
              <span>Sound</span>
              <motion.button
                aria-label={enabled ? 'Disable ambient sound' : 'Enable ambient sound'}
                onClick={() => setEnabled((prev) => !prev)}
                className={cn(
                  'relative h-7 w-12 rounded-full border border-white/10 bg-black/50',
                  enabled ? 'ring-1 ring-teal/50' : 'opacity-75'
                )}
                animate={{ backgroundColor: enabled ? 'rgba(19,224,178,0.25)' : 'rgba(0,0,0,0.6)' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <motion.span
                  className="absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ivory text-background"
                  animate={{ x: enabled ? 20 : 0 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                >
                  {enabled ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
                </motion.span>
              </motion.button>
            </div>
            <button
              className="hidden rounded-full border border-teal/50 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-ivory transition hover:bg-teal/20 xl:block"
              onClick={() => handleNav('#contact')}
            >
              Engage
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
