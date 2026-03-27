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
  color = '#0c41e2ff',
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
    const gain         = 0.7;
    const amplitude    = chaos;
    const frequency    = 10;
    const baseFlatness = 0;
    const displacement = 60;
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
        const centerX     = left + borderWidth / 2;
        const centerY     = top + borderHeight / 2;
        const flickerSeed = Math.floor(timeRef.current * 12);

        const drawLightningPass = (lineWidth, alpha, blur) => {
          ctx.save();
          ctx.lineWidth   = lineWidth;
          ctx.globalAlpha = alpha;
          ctx.shadowColor = color;
          ctx.shadowBlur  = blur;

          let cursor = 0;

          while (cursor < points.length - 1) {
            const seed          = flickerSeed * 131 + cursor * 17;
            const segmentLength = Math.max(4, Math.floor(5 + randomUnit(seed + 1.1) * 16));
            const gapLength     = Math.max(2, Math.floor(2 + randomUnit(seed + 2.2) * 10));
            const shouldDraw    = randomUnit(seed + 3.3) > 0.2;

            if (shouldDraw) {
              const end = Math.min(cursor + segmentLength, points.length - 1);

              ctx.beginPath();
              ctx.moveTo(points[cursor].x, points[cursor].y);

              for (let i = cursor + 1; i <= end; i++) {
                ctx.lineTo(points[i].x, points[i].y);
              }

              ctx.stroke();

              if (segmentLength > 7 && randomUnit(seed + 4.4) > 0.58) {
                const branchIndex  = Math.min(end, cursor + Math.max(1, Math.floor(segmentLength * randomUnit(seed + 5.5))));
                const branchStart  = points[branchIndex];
                const outwardX     = branchStart.x - centerX;
                const outwardY     = branchStart.y - centerY;
                const vectorLength = Math.hypot(outwardX, outwardY) || 1;
                const nx           = outwardX / vectorLength;
                const ny           = outwardY / vectorLength;
                const px           = -ny;
                const py           = nx;
                const branchLength = 10 + randomUnit(seed + 6.6) * 20;
                const branchBend   = (randomUnit(seed + 7.7) - 0.5) * 16;
                const midX         = branchStart.x + nx * (branchLength * 0.45) + px * branchBend;
                const midY         = branchStart.y + ny * (branchLength * 0.45) + py * branchBend;
                const tipX         = branchStart.x + nx * branchLength + px * (branchBend * 1.35);
                const tipY         = branchStart.y + ny * branchLength + py * (branchBend * 1.35);

                ctx.beginPath();
                ctx.moveTo(branchStart.x, branchStart.y);
                ctx.lineTo(midX, midY);
                ctx.lineTo(tipX, tipY);
                ctx.stroke();
              }
            }

            cursor += segmentLength + gapLength;
          }

          ctx.restore();
        };

        drawLightningPass(3.2, 0.18, 16);
        drawLightningPass(1.5, 0.95, 5);
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
  }, [color, speed, chaos, variant, borderRadius, octavedNoise, getRoundedRectPoint, randomUnit]);

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
      <div className="eb-layers">
        {variant === 'continuous' && (
          <>
            <div className="eb-glow-1" />
            <div className="eb-glow-2" />
          </>
        )}
        <div className="eb-background-glow" />
      </div>

      {/* Actual content */}
      <div className="eb-content">{children}</div>
    </div>
  );
};

export default ElectricBorder;
