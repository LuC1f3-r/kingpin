'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { disposeLenis, getLenis } from '@/lib/scroll/lenis';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export function LenisRoot({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    document.documentElement.classList.toggle('reduced-motion', prefersReducedMotion);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const lenis = getLenis();
    if (!lenis) return;
    let frameId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frameId);
      disposeLenis();
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
