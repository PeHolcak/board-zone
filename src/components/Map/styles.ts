import { css } from "@/styled-system/css"

export const cardBase = {
  borderRadius: "1.25rem",
  bg: "#111318",
  boxShadow: "0 18px 45px rgba(0,0,0,0.55)",
  border: "1px solid rgba(148,163,184,0.12)",
} as const

export const mapCard = css({
  ...cardBase,
  mt: "2rem",
  p: "2rem",
  position: "relative",
  overflow: "hidden",
  bg: "bg",
  backgroundImage:
    "repeating-linear-gradient(135deg, rgba(63,185,80,0.18) 0, rgba(63,185,80,0.18) 14px, transparent 14px, transparent 28px)",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
})

export const mapPlaceholderText = css({
  position: "relative",
  zIndex: 1,
  textAlign: "center",
  fontSize: "1rem",
  fontWeight: 500,
  mb: "1.5rem",
})

export const mapButtonWrapper = css({
  position: "relative",
  zIndex: 1,
  display: "flex",
  justifyContent: "center",
})
