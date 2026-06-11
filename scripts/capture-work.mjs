/* Verification capture: drives a real (non-throttled) Chromium through the
   live dev server so GSAP/Lenis actually run, then screenshots the Work
   coverflow at several scroll depths. Usage: node scripts/capture-work.mjs */
import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1366, height: 850 } });

await page.goto("http://localhost:5173", { waitUntil: "networkidle" });
// let the preloader play out (it completes in ~4.5s when rAF runs)
await page.waitForTimeout(6000);

const workTop = await page.evaluate(() => {
  const el = document.getElementById("work");
  return el.getBoundingClientRect().top + window.scrollY;
});

// the pin gives the section (n-1)*420+200 = 1460px of scroll depth
const stops = [
  ["work-p0", workTop + 20],
  ["work-p1", workTop + 440],
  ["work-p2", workTop + 880],
  ["work-p3", workTop + 1380],
];

for (const [name, y] of stops) {
  await page.evaluate((target) => window.scrollTo(0, target), y);
  await page.waitForTimeout(1400); // let lenis/scrub/snap settle
  await page.screenshot({ path: `/tmp/${name}.png` });
}

await browser.close();
console.log("captured:", stops.map(([n]) => n).join(", "));
