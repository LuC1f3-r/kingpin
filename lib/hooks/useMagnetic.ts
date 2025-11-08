'use client';

import { useCallback } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export function useMagnetic(radius = 120) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const onMouseMove = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const bounds = event.currentTarget.getBoundingClientRect();
      const relX = event.clientX - (bounds.left + bounds.width / 2);
      const relY = event.clientY - (bounds.top + bounds.height / 2);
      const distance = Math.hypot(relX, relY);
      if (distance < radius) {
        springX.set(relX * 0.3);
        springY.set(relY * 0.3);
      }
    },
    [radius, springX, springY]
  );

  const onMouseLeave = useCallback(() => {
    springX.set(0);
    springY.set(0);
  }, [springX, springY]);

  return { x: springX, y: springY, onMouseMove, onMouseLeave };
}
