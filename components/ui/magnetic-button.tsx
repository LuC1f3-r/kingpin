'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useMagnetic } from '@/lib/hooks/useMagnetic';
import { cn } from '@/lib/utils/cn';

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function MagneticButton({ children, className, ...props }: MagneticButtonProps) {
  const { x, y, onMouseMove, onMouseLeave } = useMagnetic();
  return (
    <motion.button
      className={cn(
        'group magnetic relative overflow-hidden rounded-pill border border-white/30 px-8 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-ivory backdrop-blur transition',
        className
      )}
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-teal/30 to-violet/30 opacity-0 transition group-hover:opacity-100" />
    </motion.button>
  );
}
