import { css } from "@/styled-system/css"

export const hoursWrapper = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.75rem",
})

export const hoursTitle = css({
  fontSize: "1.1rem",
  fontWeight: 600,
})

export const hoursList = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",

  maxWidth: "15rem",
})

export const hoursItem = css({
  display: "flex",
  justifyContent: "space-between",
  gap: "1rem",
  fontSize: "0.95rem",
})
