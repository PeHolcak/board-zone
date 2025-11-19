import { css } from "@/styled-system/css"

export const dialog = css({
  width: "100%",
  maxWidth: "460px",
  bg: "dark",
  color: "text",
  borderRadius: "1.25rem",
  boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
  p: "2rem",
  position: "relative",
})

export const form = css({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
})

export const errorText = css({
  fontSize: "0.8rem",
  color: "error",
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
