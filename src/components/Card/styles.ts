import { css } from "@/styled-system/css"

export const cardBase = {
  borderRadius: "1.25rem",
  bg: "surface",
  boxShadow: "0 18px 45px var(--colors-secondary_dark)",
} as const

export const CardStyles = css({
  ...cardBase,
  p: "2rem",
  display: "flex",
  flexDirection: "column",
  gap: "1.75rem",
})

export const contactHeading = css({
  fontSize: { base: "1.5rem", md: "1.75rem" },
  fontWeight: 700,
})
