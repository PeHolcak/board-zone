import { css } from "@/styled-system/css"

export const heroTitle = css({
  fontSize: "2xl",
  lineHeight: 1.1,
  mb: "sm",
})

export const heroText = css({
  color: "muted",
})

export const heroActions = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "sm",
  mt: "md",
})

export const heroMedia = css({
  "& img": {
    boxShadow: "soft",
    borderRadius: "md",
  },
})

export const eyebrow = css({
  fontSize: "sm",
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  color: "accent",
  mb: "xs",
})

export const heroInner = css({
  bg: "bg",

  display: "grid",
  gap: "xl",
  md: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    alignItems: "center",
  },
})
