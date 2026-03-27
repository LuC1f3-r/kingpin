import { useEffect, useRef, useCallback } from 'react';

/**
 * ElectricBorder — canvas-based procedural electric border animation.
 * Source adapted from reactbits.dev/animations/electric-border
 *
 * Props:
 *   color        {string}  Border color           default "#4fb7dd"
 *   speed        {number}  Animation speed        default 1
 *   chaos        {number}  Displacement amount    default 0.12
 *   variant      {string}  "continuous" | "disconnected"
 *   borderRadius {number}  Border radius in px    default 9999 (pill)
 *   className    {string}  Extra classes on wrapper
 *   style        {object}  Extra styles on wrapper
 */
const ElectricBorder = ({
  children,
  color = '#4fb7dd',
  speed = 2.2,
  chaos = 0.05,
  variant = 'continuous',
  borderRadius = 9999,
  className = '',
  style = {},
}) => {
  const canvasRef        = useRef(null);
  const containerRef     = useRef(null);
  const animationRef     = useRef(null);
  const timeRef          = useRef(0);
  const lastFrameTimeRef = useRef(0);

  // ── Noise helpers ──────────────────────────────────────────────────────────
  const random = useCallback((x) => (Math.sin(x * 12.9898) * 43758.5453) % 1, []);
  const randomUnit = useCallback((x) => Math.abs(random(x)), [random]);

  const noise2D = useCallback(
    (x, y) => {
      const i  = Math.floor(x);
      const j  = Math.floor(y);
      const fx = x - i;
      const fy = y - j;

      const a  = random(i + j * 57);
      const b  = random(i + 1 + j * 57);
      const c  = random(i + (j + 1) * 57);
      const d  = random(i + 1 + (j + 1) * 57);

      const ux = fx * fx * (3.0 - 2.0 * fx);
      const uy = fy * fy * (3.0 - 2.0 * fy);

      return (
        a * (1 - ux) * (1 - uy) +
        b * ux * (1 - uy) +
        c * (1 - ux) * uy +
        d * ux * uy
      );
    },
    [random],
  );

  const octavedNoise = useCallback(
    (x, octaves, lacunarity, gain, baseAmplitude, baseFrequency, time, seed, baseFlatness) => {
      let y         = 0;
      let amplitude = baseAmplitude;
      let frequency = baseFrequency;

      for (let i = 0; i < octaves; i++) {
        let octaveAmplitude = amplitude;
        if (i === 0) octaveAmplitude *= baseFlatness;
        y += octaveAmplitude * noise2D(frequency * x + seed * 100, time * frequency * 0.3);
        frequency *= lacunarity;
        amplitude *= gain;
      }
      return y;
    },
    [noise2D],
  );

  const getCornerPoint = useCallback((cx, cy, radius, startAngle, arcLength, progress) => {
    const angle = startAngle + progress * arcLength;
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  }, []);

  const getRoundedRectPoint = useCallback(
    (t, left, top, width, height, radius) => {
      const sw             = width - 2 * radius;
      const sh             = height - 2 * radius;
      const cornerArc      = (Math.PI * radius) / 2;
      const totalPerimeter = 2 * sw + 2 * sh + 4 * cornerArc;
      const distance       = t * totalPerimeter;
      let   acc            = 0;

      if (distance <= acc + sw) {
        const p = (distance - acc) / sw;
        return { x: left + radius + p * sw, y: top };
      }
      acc += sw;

      if (distance <= acc + cornerArc) {
        const p = (distance - acc) / cornerArc;
        return getCornerPoint(left + width - radius, top + radius, radius, -Math.PI / 2, Math.PI / 2, p);
      }
      acc += cornerArc;

      if (distance <= acc + sh) {
        const p = (distance - acc) / sh;
        return { x: left + width, y: top + radius + p * sh };
      }
      acc += sh;

      if (distance <= acc + cornerArc) {
        const p = (distance - acc) / cornerArc;
        return getCornerPoint(left + width - radius, top + height - radius, radius, 0, Math.PI / 2, p);
      }
      acc += cornerArc;

      if (distance <= acc + sw) {
        const p = (distance - acc) / sw;
        return { x: left + width - radius - p * sw, y: top + height };
      }
      acc += sw;

      if (distance <= acc + cornerArc) {
        const p = (distance - acc) / cornerArc;
        return getCornerPoint(left + radius, top + height - radius, radius, Math.PI / 2, Math.PI / 2, p);
      }
      acc += cornerArc;

      if (distance <= acc + sh) {
        const p = (distance - acc) / sh;
        return { x: left, y: top + height - radius - p * sh };
      }
      acc += sh;

      const p = (distance - acc) / cornerArc;
      return getCornerPoint(left + radius, top + radius, radius, Math.PI, Math.PI / 2, p);
    },
    [getCornerPoint],
  );

  // ── Canvas animation loop ──────────────────────────────────────────────────
  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const octaves      = 10;
    const lacunarity   = 1.6;
    const gain         = 0.9;
    const amplitude    = variant === 'disconnected' ? chaos * 0.7 : chaos;
    const frequency    = variant === 'disconnected' ? 8 : 10;
    const baseFlatness = 0;
    const displacement = variant === 'disconnected' ? 36 : 60;
    const borderOffset = 60;

    const updateSize = () => {
      const rect   = container.getBoundingClientRect();
      const width  = rect.width  + borderOffset * 2;
      const height = rect.height + borderOffset * 2;
      const dpr    = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width        = width  * dpr;
      canvas.height       = height * dpr;
      canvas.style.width  = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      return { width, height };
    };

    let { width, height } = updateSize();

    const draw = (currentTime) => {
      if (!canvas || !ctx) return;

      const deltaTime = (currentTime - lastFrameTimeRef.current) / 1000;
      timeRef.current += deltaTime * speed;
      lastFrameTimeRef.current = currentTime;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      ctx.strokeStyle = color;
      ctx.lineWidth   = 1.5;
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';

      const left         = borderOffset;
      const top          = borderOffset;
      const borderWidth  = width  - 2 * borderOffset;
      const borderHeight = height - 2 * borderOffset;
      const maxRadius    = Math.min(borderWidth, borderHeight) / 2;
      const radius       = Math.min(borderRadius, maxRadius);

      const approxPerimeter = 2 * (borderWidth + borderHeight) + 2 * Math.PI * radius;
      const sampleCount     = Math.floor(approxPerimeter / 2);
      const points = [];

      for (let i = 0; i <= sampleCount; i++) {
        const progress = i / sampleCount;
        const point    = getRoundedRectPoint(progress, left, top, borderWidth, borderHeight, radius);

        const xNoise = octavedNoise(progress * 8, octaves, lacunarity, gain, amplitude, frequency, timeRef.current, 0, baseFlatness);
        const yNoise = octavedNoise(progress * 8, octaves, lacunarity, gain, amplitude, frequency, timeRef.current, 1, baseFlatness);

        const dx = point.x + xNoise * displacement;
        const dy = point.y + yNoise * displacement;

        points.push({ x: dx, y: dy });
      }

      if (variant === 'disconnected') {
        const centerX   = left + borderWidth / 2;
        const centerY   = top + borderHeight / 2;
        const boltCount = approxPerimeter > 280 ? 3 : 2;
        const bolts     = Array.from({ length: boltCount }, (_, boltIndex) => {
          const seed   = (boltIndex + 1) * 37.19;
          const center = (randomUnit(seed) + timeRef.current * (0.18 + randomUnit(seed + 1.7) * 0.24)) % 1;
          const span   = 0.1 + randomUnit(seed + 2.8) * 0.07;

          return { center, seed, span };
        });

        const wrapDistance = (a, b) => {
          const diff = Math.abs(a - b);
          return Math.min(diff, 1 - diff);
        };

        const drawBoltPass = (baseWidth, alphaScale, blurScale) => {
          ctx.save();
          ctx.shadowColor = color;

          for (let i = 0; i < points.length - 1; i++) {
            const progress = (i + 0.5) / sampleCount;
            let energy = 0;

            bolts.forEach((bolt) => {
              const distance = wrapDistance(progress, bolt.center);
              const radius   = bolt.span * 0.5;

              if (distance > radius) return;

              const falloff = 1 - distance / radius;
              const pulse   = 0.72 + Math.abs(noise2D(progress * 9 + bolt.seed, timeRef.current * 1.8 + bolt.seed)) * 0.45;
              energy = Math.max(energy, Math.pow(falloff, 1.8) * pulse);
            });

            if (energy < 0.16) continue;

            ctx.beginPath();
            ctx.globalAlpha = Math.min(1, energy * alphaScale);
            ctx.lineWidth   = baseWidth + energy * (baseWidth * 0.8);
            ctx.shadowBlur  = 5 + energy * blurScale;
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[i + 1].x, points[i + 1].y);
            ctx.stroke();
          }

          ctx.restore();
        };

        drawBoltPass(1.8, 0.18, 12);
        drawBoltPass(0.9, 0.75, 4);

        ctx.save();
        ctx.shadowColor = color;

        bolts.forEach((bolt, boltIndex) => {
          const branchSeed = bolt.seed + Math.floor(timeRef.current * 2.2) * 13 + boltIndex;
          if (randomUnit(branchSeed + 4.1) < 0.68) return;

          const anchorProgress = (bolt.center + (randomUnit(branchSeed + 5.4) - 0.5) * bolt.span * 0.32 + 1) % 1;
          const anchorIndex    = Math.min(points.length - 2, Math.floor(anchorProgress * (points.length - 1)));
          const branchStart    = points[anchorIndex];
          const outwardX       = branchStart.x - centerX;
          const outwardY       = branchStart.y - centerY;
          const vectorLength   = Math.hypot(outwardX, outwardY) || 1;
          const nx             = outwardX / vectorLength;
          const ny             = outwardY / vectorLength;
          const px             = -ny;
          const py             = nx;
          const branchLength   = 8 + randomUnit(branchSeed + 6.7) * 12;
          const branchBend     = (randomUnit(branchSeed + 7.9) - 0.5) * 10;
          const midX           = branchStart.x + nx * (branchLength * 0.48) + px * branchBend;
          const midY           = branchStart.y + ny * (branchLength * 0.48) + py * branchBend;
          const tipX           = branchStart.x + nx * branchLength + px * (branchBend * 1.1);
          const tipY           = branchStart.y + ny * branchLength + py * (branchBend * 1.1);

          ctx.beginPath();
          ctx.globalAlpha = 0.22 + randomUnit(branchSeed + 8.6) * 0.14;
          ctx.lineWidth   = 0.8 + randomUnit(branchSeed + 9.5) * 0.35;
          ctx.shadowBlur  = 4;
          ctx.moveTo(branchStart.x, branchStart.y);
          ctx.lineTo(midX, midY);
          ctx.lineTo(tipX, tipY);
          ctx.stroke();
        });

        ctx.restore();
      } else {
        ctx.beginPath();

        points.forEach((point, index) => {
          index === 0 ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y);
        });

        ctx.closePath();
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(() => {
      const s = updateSize();
      width   = s.width;
      height  = s.height;
    });
    resizeObserver.observe(container);

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [color, speed, chaos, variant, borderRadius, noise2D, octavedNoise, getRoundedRectPoint, randomUnit]);

  const cssVars = {
    '--electric-border-color': color,
    borderRadius,
    ...style,
  };

  return (
    <div
      ref={containerRef}
      className={`eb-root ${className}`}
      style={cssVars}
      data-variant={variant}
    >
      {/* Canvas arc */}
      <div className="eb-canvas-container">
        <canvas ref={canvasRef} className="eb-canvas" />
      </div>

      {/* Static glow layers */}
      {variant === 'continuous' && (
        <div className="eb-layers">
          <div className="eb-glow-1" />
          <div className="eb-glow-2" />
          <div className="eb-background-glow" />
        </div>
      )}

      {/* Actual content */}
      <div className="eb-content">{children}</div>
    </div>
  );
};

export default ElectricBorder;
