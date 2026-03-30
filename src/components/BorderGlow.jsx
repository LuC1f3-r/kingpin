import { useRef, useCallback, useEffect } from 'react';

/**
 * BorderGlow — cursor-reactive mesh-gradient border glow.
 * Source adapted from reactbits.dev/components/border-glow
 *
 * Props:
 *   colors         {string[]}  3 hex/hsl colors for mesh gradient  default purple/pink/sky
 *   glowColor      {string}    "H S L" hsl values for edge glow     default "40 80 80"
 *   backgroundColor{string}   card background                       default "#131315"
 *   borderRadius   {number}   border-radius in px                   default 4
 *   glowRadius     {number}   outer glow spread in px               default 40
 *   glowIntensity  {number}   glow brightness multiplier            default 1.0
 *   coneSpread     {number}   gradient cone width 0-50              default 25
 *   edgeSensitivity{number}   how close to edge before glow shows   default 30
 *   fillOpacity    {number}   fill layer opacity                    default 0.5
 *   animated       {boolean|number} play sweep animation when truthy or when the value changes
 *   className      {string}   extra classes on wrapper
 *   style          {object}   extra styles on wrapper
 */

function parseHSL(hslStr) {
  const m = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!m) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(m[1]), s: parseFloat(m[2]), l: parseFloat(m[3]) };
}

function buildGlowVars(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
  const vars = {};
  for (let i = 0; i < opacities.length; i++) {
    vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
  }
  return vars;
}

const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
const GRADIENT_KEYS = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven'];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildGradientVars(colors) {
  const vars = {};
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
  }
  vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }
function easeInCubic(x) { return x * x * x; }

function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }) {
  let cancelled = false;
  let frameId = 0;
  const t0 = performance.now() + delay;

  function tick() {
    if (cancelled) return;
    const elapsed = performance.now() - t0;
    const t = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) frameId = requestAnimationFrame(tick);
    else if (onEnd) onEnd();
  }

  const timeoutId = setTimeout(() => {
    if (cancelled) return;
    frameId = requestAnimationFrame(tick);
  }, delay);

  return () => {
    cancelled = true;
    clearTimeout(timeoutId);
    if (frameId) cancelAnimationFrame(frameId);
  };
}

const BorderGlow = ({
  children,
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
  glowColor = '40 80 80',
  backgroundColor = '#131315',
  borderRadius = 4,
  glowRadius = 40,
  glowIntensity = 1.0,
  coneSpread = 25,
  edgeSensitivity = 30,
  fillOpacity = 0.5,
  animated = false,
  className = '',
  style = {},
}) => {
  const cardRef = useRef(null);

  const getCenterOfElement = useCallback((el) => {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const getEdgeProximity = useCallback((el, x, y) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity;
    let ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  }, [getCenterOfElement]);

  const getCursorAngle = useCallback((el, x, y) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    if (dx === 0 && dy === 0) return 0;
    const radians = Math.atan2(dy, dx);
    let degrees = radians * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;
    return degrees;
  }, [getCenterOfElement]);

  const handlePointerMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--edge-proximity', `${(getEdgeProximity(card, x, y) * 100).toFixed(3)}`);
    card.style.setProperty('--cursor-angle', `${getCursorAngle(card, x, y).toFixed(3)}deg`);
  }, [getEdgeProximity, getCursorAngle]);

  useEffect(() => {
    if ((typeof animated === 'boolean' && !animated) || animated == null || !cardRef.current) {
      return undefined;
    }

    const card = cardRef.current;
    const angleStart = 110;
    const angleEnd = 465;

    card.classList.add('bg-sweep-active');
    card.style.setProperty('--cursor-angle', `${angleStart}deg`);
    card.style.setProperty('--edge-proximity', '0');

    const stopEdgeIntro = animateValue({
      duration: 500,
      onUpdate: v => card.style.setProperty('--edge-proximity', `${v}`),
    });
    const stopAngleMid = animateValue({ ease: easeInCubic, duration: 1500, end: 50, onUpdate: v => {
      card.style.setProperty('--cursor-angle', `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`);
    }});
    const stopAngleOutro = animateValue({ ease: easeOutCubic, delay: 1500, duration: 2250, start: 50, end: 100, onUpdate: v => {
      card.style.setProperty('--cursor-angle', `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`);
    }});
    const stopEdgeOutro = animateValue({ ease: easeInCubic, delay: 2500, duration: 1500, start: 100, end: 0,
      onUpdate: v => card.style.setProperty('--edge-proximity', `${v}`),
      onEnd: () => card.classList.remove('bg-sweep-active'),
    });

    return () => {
      stopEdgeIntro();
      stopAngleMid();
      stopAngleOutro();
      stopEdgeOutro();
      card.classList.remove('bg-sweep-active');
      card.style.setProperty('--edge-proximity', '0');
      card.style.setProperty('--cursor-angle', '45deg');
    };
  }, [animated]);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={`bg-glow-card ${className}`}
      style={{
        '--card-bg': backgroundColor,
        '--edge-sensitivity': edgeSensitivity,
        '--border-radius': `${borderRadius}px`,
        '--glow-padding': `${glowRadius}px`,
        '--cone-spread': coneSpread,
        '--fill-opacity': fillOpacity,
        ...buildGlowVars(glowColor, glowIntensity),
        ...buildGradientVars(colors),
        ...style,
      }}
    >
      <span className="bg-edge-light" />
      <div className="bg-glow-inner">
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;
