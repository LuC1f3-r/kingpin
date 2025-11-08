'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full text-sm font-semibold uppercase tracking-[0.35em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background backdrop-blur',
  {
    variants: {
      variant: {
        neon: 'bg-gradient-to-r from-teal/80 via-ivory/90 to-violet/90 text-background shadow-glow hover:opacity-90',
        ghost: 'border border-white/30 text-ivory hover:border-teal/60 hover:bg-white/5',
        subtle: 'bg-white/10 text-ivory hover:bg-white/15'
      },
      size: {
        sm: 'px-4 py-2 text-[0.6rem]',
        md: 'px-6 py-3 text-[0.65rem]',
        lg: 'px-8 py-4 text-[0.7rem]'
      }
    },
    defaultVariants: {
      variant: 'neon',
      size: 'md'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  }
);
Button.displayName = 'Button';
