import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--ink) / <alpha-value>)",
        "ink-2": "rgb(var(--ink-2) / <alpha-value>)",
        oat: "rgb(var(--oat) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        mist: "rgb(var(--mist) / <alpha-value>)",
        "mist-2": "rgb(var(--mist-2) / <alpha-value>)",
        sage: "rgb(var(--sage) / <alpha-value>)",
        "sage-deep": "rgb(var(--sage-deep) / <alpha-value>)",
        brass: "rgb(var(--brass) / <alpha-value>)",
        "brass-deep": "rgb(var(--brass-deep) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "20px",
        pill: "100px",
      },
      letterSpacing: {
        tightish: "-0.012em",
      },
      maxWidth: {
        content: "1120px",
      },
      transitionDuration: {
        DEFAULT: "180ms",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 200ms ease both",
      },
    },
  },
  plugins: [],
};

export default config;
