import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{mdx,md}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--kp-bg)",
        surface: "var(--kp-surface)",
        ivory: "var(--kp-ivory)",
        teal: "var(--kp-teal)",
        violet: "var(--kp-violet)",
        glass: "var(--kp-glass)",
        accent: "var(--kp-iris)",
        warning: "var(--kp-warning)"
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 35px rgba(111, 0, 255, 0.35)",
        card: "0 15px 45px rgba(5, 6, 10, 0.65)"
      },
      borderRadius: {
        glass: "var(--kp-radius)",
        pill: "999px"
      },
      transitionTimingFunction: {
        forge: "cubic-bezier(0.23, 1, 0.32, 1)"
      }
    }
  },
  darkMode: "class"
};

export default config;
