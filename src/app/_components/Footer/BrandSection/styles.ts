import { css } from "@/styled-system/css"

export const brandWrapper = css({
  display: "flex",
  flexDirection: "column",
  alignItems: { base: "center", lg: "flex-start" },
  gap: "0.35rem",
})

export const brandTitle = css({
  fontSize: "1.25rem",
  fontWeight: 600,
  marginBottom: "0.5rem",
})

export const contactItem = css({
  fontSize: "0.95rem",
  lineHeight: 1.4,
})
