'use client';

import Lenis from '@studio-freight/lenis';

let singleton: Lenis | null = null;

export function getLenis() {
  if (typeof window === 'undefined') return null;
  if (singleton) return singleton;
  singleton = new Lenis({
    duration: 1.1,
    smoothWheel: true,
    easing: (t: number) => 1 - Math.pow(1 - t, 3)
  });
  return singleton;
}

export function disposeLenis() {
  if (singleton) {
    singleton.destroy();
    singleton = null;
  }
}
