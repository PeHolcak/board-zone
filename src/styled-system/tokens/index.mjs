const tokens = {
  "colors.bg": {
    "value": "#0f1115",
    "variable": "var(--colors-bg)"
  },
  "colors.surface": {
    "value": "#171a21",
    "variable": "var(--colors-surface)"
  },
  "colors.primary": {
    "value": "#3fb950",
    "variable": "var(--colors-primary)"
  },
  "colors.primary_20": {
    "value": "#3fb95020",
    "variable": "var(--colors-primary_20)"
  },
  "colors.secondary": {
    "value": "rgba(23, 26, 33)",
    "variable": "var(--colors-secondary)"
  },
  "colors.secondary_70": {
    "value": "rgba(23, 26, 33, 0.7)",
    "variable": "var(--colors-secondary_70)"
  },
  "colors.secondary_dark": {
    "value": "rgba(15, 17, 21, 0.95)",
    "variable": "var(--colors-secondary_dark)"
  },
  "colors.accent": {
    "value": "#f59e0b",
    "variable": "var(--colors-accent)"
  },
  "colors.text": {
    "value": "#e5e7eb",
    "variable": "var(--colors-text)"
  },
  "colors.muted": {
    "value": "#9ca3af",
    "variable": "var(--colors-muted)"
  },
  "colors.borderSubtle": {
    "value": "rgba(229, 231, 235, 0.08)",
    "variable": "var(--colors-border-subtle)"
  },
  "colors.dark": {
    "value": "#111827",
    "variable": "var(--colors-dark)"
  },
  "colors.darkText": {
    "value": "#0b0d10",
    "variable": "var(--colors-dark-text)"
  },
  "colors.ghostButton": {
    "value": "rgba(229, 231, 235, 0.18)",
    "variable": "var(--colors-ghost-button)"
  },
  "colors.white": {
    "value": "#fff",
    "variable": "var(--colors-white)"
  },
  "colors.error": {
    "value": "#f97373",
    "variable": "var(--colors-error)"
  },
  "colors.inputBorder": {
    "value": "#374151",
    "variable": "var(--colors-input-border)"
  },
  "colors.black": {
    "value": "rgb(0,0,0)",
    "variable": "var(--colors-black)"
  },
  "radii.sm": {
    "value": "0.5rem",
    "variable": "var(--radii-sm)"
  },
  "radii.md": {
    "value": "0.75rem",
    "variable": "var(--radii-md)"
  },
  "radii.lg": {
    "value": "1.25rem",
    "variable": "var(--radii-lg)"
  },
  "radii.pill": {
    "value": "999px",
    "variable": "var(--radii-pill)"
  },
  "shadows.soft": {
    "value": "0 10px 30px rgba(0, 0, 0, 0.35)",
    "variable": "var(--shadows-soft)"
  },
  "fonts.sans": {
    "value": "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
    "variable": "var(--fonts-sans)"
  },
  "fontSizes.xs": {
    "value": "clamp(0.75rem, 0.75rem + 0.1vw, 0.8rem)",
    "variable": "var(--font-sizes-xs)"
  },
  "fontSizes.sm": {
    "value": "clamp(0.875rem, 0.85rem + 0.2vw, 0.95rem)",
    "variable": "var(--font-sizes-sm)"
  },
  "fontSizes.base": {
    "value": "clamp(1rem, 1rem + 0.2vw, 1.075rem)",
    "variable": "var(--font-sizes-base)"
  },
  "fontSizes.lg": {
    "value": "clamp(1.25rem, 1.1rem + 1vw, 1.7rem)",
    "variable": "var(--font-sizes-lg)"
  },
  "fontSizes.xl": {
    "value": "clamp(1.6rem, 1.3rem + 2vw, 2.4rem)",
    "variable": "var(--font-sizes-xl)"
  },
  "fontSizes.2xl": {
    "value": "clamp(2rem, 1.6rem + 4vw, 3.2rem)",
    "variable": "var(--font-sizes-2xl)"
  },
  "spacing.xs": {
    "value": "0.5rem",
    "variable": "var(--spacing-xs)"
  },
  "spacing.sm": {
    "value": "0.75rem",
    "variable": "var(--spacing-sm)"
  },
  "spacing.md": {
    "value": "1.25rem",
    "variable": "var(--spacing-md)"
  },
  "spacing.lg": {
    "value": "2rem",
    "variable": "var(--spacing-lg)"
  },
  "spacing.xl": {
    "value": "clamp(2.5rem, 3vw, 3.5rem)",
    "variable": "var(--spacing-xl)"
  },
  "breakpoints.sm": {
    "value": "640px",
    "variable": "var(--breakpoints-sm)"
  },
  "breakpoints.md": {
    "value": "768px",
    "variable": "var(--breakpoints-md)"
  },
  "breakpoints.lg": {
    "value": "1024px",
    "variable": "var(--breakpoints-lg)"
  },
  "breakpoints.xl": {
    "value": "1280px",
    "variable": "var(--breakpoints-xl)"
  },
  "breakpoints.2xl": {
    "value": "1536px",
    "variable": "var(--breakpoints-2xl)"
  },
  "sizes.breakpoint-sm": {
    "value": "640px",
    "variable": "var(--sizes-breakpoint-sm)"
  },
  "sizes.breakpoint-md": {
    "value": "768px",
    "variable": "var(--sizes-breakpoint-md)"
  },
  "sizes.breakpoint-lg": {
    "value": "1024px",
    "variable": "var(--sizes-breakpoint-lg)"
  },
  "sizes.breakpoint-xl": {
    "value": "1280px",
    "variable": "var(--sizes-breakpoint-xl)"
  },
  "sizes.breakpoint-2xl": {
    "value": "1536px",
    "variable": "var(--sizes-breakpoint-2xl)"
  },
  "spacing.-xs": {
    "value": "calc(var(--spacing-xs) * -1)",
    "variable": "var(--spacing-xs)"
  },
  "spacing.-sm": {
    "value": "calc(var(--spacing-sm) * -1)",
    "variable": "var(--spacing-sm)"
  },
  "spacing.-md": {
    "value": "calc(var(--spacing-md) * -1)",
    "variable": "var(--spacing-md)"
  },
  "spacing.-lg": {
    "value": "calc(var(--spacing-lg) * -1)",
    "variable": "var(--spacing-lg)"
  },
  "spacing.-xl": {
    "value": "calc(var(--spacing-xl) * -1)",
    "variable": "var(--spacing-xl)"
  },
  "colors.colorPalette": {
    "value": "var(--colors-color-palette)",
    "variable": "var(--colors-color-palette)"
  }
}

export function token(path, fallback) {
  return tokens[path]?.value || fallback
}

function tokenVar(path, fallback) {
  return tokens[path]?.variable || fallback
}

token.var = tokenVar