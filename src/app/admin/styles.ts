import { css } from "@/styled-system/css"

export const emptyState = css({
  color: "muted",
})

export const list = css({
  display: "flex",
  flexDirection: "column",
  gap: "4",
})

export const cardGrid = css({
  display: "grid",
  gap: "1rem",
  gridTemplateColumns: "1fr",
  md: {
    gridTemplateColumns: "1fr 1fr",
  },
})

export const section = css({
  my: "3rem",
})
