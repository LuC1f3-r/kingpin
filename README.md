# kingpin-vision-forge

A cinematic, neural-inspired portfolio for **KingpiN Vision Forge**. Built with Next.js 15 (App Router + Edge runtime), Tailwind CSS v4 tokens, R3F shader hero, Lenis smooth scroll, GSAP ScrollTrigger scenes, Contentlayer-driven case studies, and a Resend-powered contact loop.

## Stack Highlights
- **Next.js 15** with ISR + Edge API routes, @vercel/og, @vercel/analytics
- **Tailwind CSS v4** + custom CSS variables (`styles/tokens.css`) derived from the provided DESIGN_REFERENCE_URL palette, spacing, radii, and glow shadows
- **shadcn/ui primitives** (Button, Dialog) enhanced with Framer Motion + custom hooks (`useMagnetic`, custom cursor)
- **react-three-fiber + drei + GLSL shaders** for the hero neural gradient + instanced particle field
- **Lenis + GSAP ScrollTrigger** for smooth locomotion and timeline pinning respecting `prefers-reduced-motion`
- **Howler.js** ambient audio with persisted toggle
- **Contentlayer + MDX** for `/work/[slug]` routes
- **React Hook Form + Zod + Resend + react-email** contact flow (Edge runtime)
- **Sentry & PostHog** instrumentation hooks enabled but inert without keys

## Getting Started
1. **Install dependencies**
   ```bash
   pnpm install
   ```
2. **Environment variables**
   Copy `.env.example` to `.env.local` and fill in:
   - `RESEND_API_KEY` – required in production, optional locally (mock logging fallback)
   - `SENTRY_DSN` – optional
   - `NEXT_PUBLIC_POSTHOG_KEY` – optional
   - `NEXT_PUBLIC_SITE_URL` – used for metadata + OG generation
3. **Run the dev server**
   ```bash
   pnpm dev
   ```
   Visit `http://localhost:3000`. The hero shader lazy-loads; reduced-motion users get a static gradient fallback.
4. **Build for production**
   ```bash
   pnpm build && pnpm start
   ```

## Content & CMS Stubs
- Edit or add MDX case studies under `content/work/*.mdx`. Each file supports `title`, `summary`, `tags`, `thumb`, `video`, and `featured`. Contentlayer generates typed data (see `.contentlayer/generated`).
- Thumbnails live in `public/images/*`. Replace with AVIF/WebP exports for best perf. Update MDX frontmatter to point to new assets.

## Design Tokens
- All palette, typography scale, spacing, radii, and shadow tokens extracted from the DESIGN_REFERENCE_URL are centralized in `styles/tokens.css`.
- Tailwind’s theme extension (see `tailwind.config.ts`) references those CSS variables so utilities stay in sync.
- To refresh tokens from a new Figma drop, update `styles/tokens.css` values and restart the dev server (Tailwind hot reload picks them up). Add new variables, then hydrate them inside the `extend` block as needed.

## Scroll, Motion & Accessibility
- Lenis initializes once in `LenisRoot`; `prefers-reduced-motion` disables Lenis + GSAP timelines.
- ScrollTrigger animates the Input→Evolve timeline, while Framer Motion handles hero type stagers and magnetic buttons.
- Custom cursor, ambient audio toggle, and soundless defaults respect accessibility guardrails.

## Contact Flow
- `components/sections/Contact.tsx` hosts the RHF + Zod form reused by the hero dialog.
- `/api/contact` validates payloads on the Edge runtime and dispatches the `ContactEmail` template via Resend. Missing keys trigger a dev-mode console log instead of throwing.

## Analytics & Error Capture
- `sentry.client/server.config.ts` boot when `SENTRY_DSN` is provided.
- `posthog.client.ts` lazily hydrates PostHog on the client, gated behind `NEXT_PUBLIC_POSTHOG_KEY`.

## Adding More Case Studies
1. Drop media into `public/images/` (optimize with AVIF/WebP if possible).
2. Create a new `content/work/my-project.mdx` with frontmatter + markdown body.
3. `pnpm dev` (or `pnpm contentlayer build`) regenerates types + JSON; new entries auto-appear in the grid and `/work/[slug]` route.

## Performance Notes
- Hero R3F scene is dynamically imported with `<Suspense>` fallback, instanced ~4K particles, and shader uniforms throttled per frame.
- All heavy scroll effects disable automatically for `prefers-reduced-motion` users.
- `next/image` serves AVIF/WebP; OG image generated via `/api/og`.
- Lighthouse guidance: use `pnpm build && pnpm start`, then audit desktop. Keep image sizes lean (<200kb) and avoid console noise from external embeds before shipping.
