import { defineConfig } from "@pandacss/dev"

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{ts,tsx,js,jsx}"],
  exclude: [],
  jsxFramework: "react",
  outdir: "src/styled-system",

  theme: {
    extend: {
      keyframes: {
        spin: {
          to: { transform: "rotate(360deg)" },
        },
      },
    },

    tokens: {
      colors: {
        bg: { value: "#0f1115" },
        surface: { value: "#171a21" },
        primary: { value: "#3fb950" },
        primary_20: { value: "#3fb95020" },
        secondary: { value: "rgba(23, 26, 33)" },
        secondary_70: { value: "rgba(23, 26, 33, 0.7)" },
        secondary_dark: { value: "rgba(15, 17, 21, 0.95)" },
        accent: { value: "#f59e0b" },
        text: { value: "#e5e7eb" },
        muted: { value: "#9ca3af" },
        borderSubtle: { value: "rgba(229, 231, 235, 0.08)" },
        dark: { value: "#111827" },
        darkText: { value: "#0b0d10" },
        ghostButton: { value: "rgba(229, 231, 235, 0.18)" },
        white: { value: "#fff" },
        error: { value: "#f97373" },
        inputBorder: { value: "#374151" },
        black: { value: "rgb(0,0,0)" },
      },
      radii: {
        sm: { value: "0.5rem" },
        md: { value: "0.75rem" },
        lg: { value: "1.25rem" },
        pill: { value: "999px" },
      },
      shadows: {
        soft: { value: "0 10px 30px rgba(0, 0, 0, 0.35)" },
      },
      fonts: {
        sans: {
          value: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
        },
      },
      fontSizes: {
        xs: { value: "clamp(0.75rem, 0.75rem + 0.1vw, 0.8rem)" },
        sm: { value: "clamp(0.875rem, 0.85rem + 0.2vw, 0.95rem)" },
        base: { value: "clamp(1rem, 1rem + 0.2vw, 1.075rem)" },
        lg: { value: "clamp(1.25rem, 1.1rem + 1vw, 1.7rem)" },
        xl: { value: "clamp(1.6rem, 1.3rem + 2vw, 2.4rem)" },
        "2xl": { value: "clamp(2rem, 1.6rem + 4vw, 3.2rem)" },
      },
      spacing: {
        xs: { value: "0.5rem" },
        sm: { value: "0.75rem" },
        md: { value: "1.25rem" },
        lg: { value: "2rem" },
        xl: { value: "clamp(2.5rem, 3vw, 3.5rem)" },
      },
    },
  },
})
