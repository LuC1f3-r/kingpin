'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export function CustomCursor() {
  const reduced = useReducedMotion();
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const smoothX = useSpring(x, { stiffness: 150, damping: 25 });
  const smoothY = useSpring(y, { stiffness: 150, damping: 25 });

  useEffect(() => {
    if (reduced) return;
    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [x, y, reduced]);

  if (reduced) return null;

  return <motion.div className="custom-cursor" style={{ x: smoothX, y: smoothY }} aria-hidden />;
}
