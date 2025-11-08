'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';

export function PostHogClient() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
    if ((window as unknown as { __posthog?: boolean }).__posthog) return;
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com',
      capture_pageview: true
    });
    (window as unknown as { __posthog?: boolean }).__posthog = true;
  }, []);

  return null;
}
