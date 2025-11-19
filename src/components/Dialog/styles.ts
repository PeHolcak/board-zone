import { css } from "@/styled-system/css"

export const overlay = css({
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bg: "secondary_dark",
  zIndex: 40,
})

export const dialog = css({
  width: "100%",
  maxWidth: "28rem",

  bg: "secondary",
  color: "text",

  borderRadius: "1.25rem",

  boxShadow: "0 2rem 6rem var(--colors-black)",

  p: "2rem",
  position: "relative",
})

export const dialogHeader = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  mb: "1.5rem",
})

export const closeButton = css({
  border: "none",
  bg: "transparent",
  color: "muted",
  fontSize: "1.7rem",
  cursor: "pointer",
  lineHeight: 1,
  _hover: {
    color: "white",
  },
})

export const titleClass = css({
  fontSize: "1.7rem",
  fontWeight: 700,
})
