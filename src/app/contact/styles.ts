import { css } from "@/styled-system/css"

export const contactSection = css({
  bg: "bg",
  color: "text",
})

export const contactInner = css({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",

  md: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1.4fr)",
    gap: "2.5rem",
  },
})
