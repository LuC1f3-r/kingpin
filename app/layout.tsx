import type { Metadata } from "next";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://kingpinvisionforge.com"),
  title: {
    default: "KingpiN Vision Forge | Neural Brand Intelligence",
    template: "%s | KingpiN Vision Forge"
  },
  description:
    "KingpiN Vision Forge crafts cinematic, neural-inspired digital experiences that merge design precision with engineered cognition.",
  keywords: [
    "Neural brand studio",
    "Next.js portfolio",
    "Cognitive design"
  ],
  openGraph: {
    title: "KingpiN Vision Forge",
    description:
      "Cinematic brand engineering studio building immersive, intelligent interfaces.",
    url: "https://kingpinvisionforge.com",
    siteName: "KingpiN Vision Forge",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    site: "@kingpinvisionforge",
    creator: "@kingpinvisionforge",
    title: "KingpiN Vision Forge",
    description:
      "Cinematic brand engineering studio building immersive, intelligent interfaces."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
