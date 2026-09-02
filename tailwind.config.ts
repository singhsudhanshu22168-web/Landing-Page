import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080808",
        obsidian: "#080808",
        charcoal: "#151515",
        surface: "#0d0d0d",
        "surface-border": "#1a1a1a",
        gold: {
          light: "#F4EFE6",
          DEFAULT: "#C6A66B",
          champagne: "#C6A66B",
          muted: "#9F8050",
          dark: "#9F8050",
          bronze: "#8c6d3f",
          deep: "#5e451b",
        },
        champagne: {
          DEFAULT: "#C6A66B",
          light: "#F4EFE6",
          muted: "#9F8050",
        },
        ivory: {
          DEFAULT: "#F4EFE6",
          warm: "#F4EFE6",
          soft: "#EAE4D8",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-outfit)", "Inter", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #f7e5a9 0%, #d4af37 50%, #aa771c 100%)",
        "gold-metallic": "linear-gradient(90deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%)",
        "radial-dark": "radial-gradient(circle at center, rgba(212, 175, 55, 0.12) 0%, rgba(5, 5, 5, 0.95) 70%)",
      },
      animation: {
        "shimmer": "shimmer 3s infinite linear",
        "pulse-glow": "pulseGlow 4s infinite ease-in-out",
        "float": "float 6s infinite ease-in-out",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
