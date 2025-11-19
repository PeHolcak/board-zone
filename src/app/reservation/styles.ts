import { css } from "@/styled-system/css"

export const reservationSection = css({
  display: "flex",
  flexDirection: "column",
  gap: "md",
  mx: "auto",
})

export const reservationAlert = css({
  borderRadius: "sm",
  paddingBlock: "0.75rem",
  paddingInline: "1.25rem",
  background: "linear-gradient(90deg, rgba(126, 86, 0, 0.15), rgba(126, 86, 0, 0.05))",
  border: "1px solid rgba(245, 158, 11, 0.3)",
  color: "accent",
  fontSize: "0.9rem",
})
