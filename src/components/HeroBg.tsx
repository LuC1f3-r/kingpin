const gridStyle = {
  backgroundImage: `
    radial-gradient(circle at center, rgba(79, 183, 221, 0.34) 0 1px, transparent 1.6px),
    linear-gradient(135deg, rgba(79, 183, 221, 0.08), transparent 52%)
  `,
  backgroundSize: "24px 24px, 100% 100%",
  backgroundPosition: "center center, center center",
};

const HeroBg = ({ className = "absolute inset-0 h-full w-full" }) => {
  return (
    <div className={`${className} overflow-hidden bg-[#020609]`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(79,183,221,0.18),transparent_32%),radial-gradient(circle_at_78%_34%,rgba(79,183,221,0.16),transparent_24%),linear-gradient(180deg,#020609_0%,#050d14_42%,#020609_100%)]" />

      <div
        className="absolute inset-0 opacity-55"
        style={gridStyle}
      />

      <div className="absolute inset-y-0 right-[8%] w-[38vw] min-w-[220px] bg-[linear-gradient(180deg,rgba(79,183,221,0.06),rgba(79,183,221,0.02)_46%,transparent)] blur-[2px]" />

      <div className="absolute right-[10%] top-[14%] h-44 w-44 rounded-full bg-[#4fb7dd]/18 blur-3xl motion-safe:animate-pulse" />
      <div
        className="absolute right-[22%] top-[28%] h-72 w-72 rounded-full border border-[#4fb7dd]/10 bg-[#4fb7dd]/[0.04] blur-2xl motion-safe:animate-pulse"
        style={{ animationDuration: "8s" }}
      />
      <div
        className="absolute bottom-[12%] right-[16%] h-28 w-[28vw] min-w-[180px] max-w-[360px] rounded-full bg-[linear-gradient(90deg,transparent,rgba(79,183,221,0.24),transparent)] blur-2xl motion-safe:animate-pulse"
        style={{ animationDuration: "10s" }}
      />

      <div className="absolute inset-y-0 right-[11%] w-px bg-[linear-gradient(180deg,transparent,rgba(79,183,221,0.34),transparent)] opacity-65" />
      <div className="absolute right-[8%] top-[16%] h-[62%] w-[34vw] min-w-[200px] max-w-[460px] rounded-[40px] border border-[#4fb7dd]/10 bg-[linear-gradient(180deg,rgba(79,183,221,0.05),rgba(79,183,221,0.01))] shadow-[0_0_90px_rgba(79,183,221,0.07)]" />
    </div>
  );
};

export default HeroBg;
