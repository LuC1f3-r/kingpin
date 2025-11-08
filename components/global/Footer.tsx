export function Footer() {
  return (
    <footer className="section-shell border-t border-white/5 bg-black/20 text-sm text-muted-foreground">
      <div className="container-shell flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} KingpiN Vision Forge. Crafted on the neural forge.</p>
        <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em]">
          <span>Edge Runtime</span>
          <span>Next.js 15</span>
          <span>Tailwind 4</span>
        </div>
      </div>
    </footer>
  );
}
