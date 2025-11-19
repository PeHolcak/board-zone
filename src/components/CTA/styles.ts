import { css } from "@/styled-system/css"

export const btn = css({
  borderRadius: "sm",
  p: "0.65rem 1.4rem",
  borderWidth: "0.1rem",
  borderStyle: "solid",
  borderColor: "transparent",
  fontWeight: 600,
  cursor: "pointer",
  textDecoration: "none",
  transitionDuration: ".3s",
})

export const btnPrimary = css({
  bg: "primary",
  color: "darkText !important",
  _hover: {
    bg: "text",
    color: "surface",
  },
})

export const btnGhost = css({
  bg: "transparent",
  borderColor: "ghostButton",
  _hover: {
    borderColor: "primary",
    color: "primary",
  },
})

export const btnFullWidth = css({
  width: "100%",
})
