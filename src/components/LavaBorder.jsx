/**
 * LavaBorder — molten ring around a CTA. Replaces ElectricBorder for the
 * gold Forge identity: a slow-churning conic gradient of molten gold and
 * ember circles the control, with a blurred copy underneath as heat haze.
 *
 * Pure CSS animation (one rotating pseudo-element per layer) — no per-frame
 * JS, no canvas. Styles live in index.css under .lava-border.
 */
const LavaBorder = ({ children, className = "" }) => (
  <div className={`lava-border ${className}`}>
    <span className="lava-border-haze" aria-hidden="true" />
    <span className="lava-border-ring" aria-hidden="true" />
    <div className="relative z-10">{children}</div>
  </div>
);

export default LavaBorder;
