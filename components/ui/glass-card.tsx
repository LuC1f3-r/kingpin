'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';

export function GlassCard({ children, className }: { children: ReactNode; className?: string }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  return (
    <motion.div
      className={cn('glass-panel relative border border-white/10 p-6', className)}
      style={{ rotateX: springX, rotateY: springY }}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const relX = event.clientY - bounds.top - bounds.height / 2;
        const relY = event.clientX - bounds.left - bounds.width / 2;
        rotateX.set(-(relX / bounds.height) * 10);
        rotateY.set((relY / bounds.width) * 10);
      }}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/5 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
