import { css } from "@/styled-system/css"

export const title = css({
  fontSize: "1.5rem",
  fontWeight: 700,
})

export const form = css({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
})

export const rememberRow = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  mt: "0.5rem",
})

export const checkboxLabel = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: "0.9rem",
  color: "text",
  cursor: "pointer",
})

export const checkbox = css({
  width: "1rem",
  height: "1rem",
  borderRadius: "0.25rem",
  accentColor: "primary",
})

export const actionsRow = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  mt: "1.25rem",
})

export const forgotLink = css({
  fontSize: "0.9rem",
  textDecoration: "underline",
})
