import type { ReactNode } from "react";
import { Suspense } from "react";
import { TopNav } from "@/components/global/TopNav";
import { Footer } from "@/components/global/Footer";
import { CustomCursor } from "@/components/global/CustomCursor";
import { LenisRoot } from "@/components/global/LenisRoot";
import { PostHogClient } from "@/posthog.client";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <LenisRoot>
      <div className="relative min-h-screen bg-background text-ivory">
        <TopNav />
        <Suspense fallback={null}>
          <CustomCursor />
        </Suspense>
        <main>{children}</main>
        <Footer />
      </div>
      <PostHogClient />
    </LenisRoot>
  );
}
