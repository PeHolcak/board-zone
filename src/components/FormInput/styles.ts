import { css } from "@/styled-system/css"

export const field = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.35rem",
})

export const errorText = css({
  fontSize: "0.8rem",
  color: "error",
})

export const input = css({
  width: "100%",
  borderRadius: "0.75rem",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "inputBorder",
  bg: "surface",
  color: "text",
  px: "0.9rem",
  py: "0.7rem",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  _focusVisible: {
    borderColor: "primary",
    boxShadow: "0 0 0 0.1rem var(--colors-primary)",
  },
})

export const labelText = css({
  fontSize: "0.85rem",
  color: "text",
})
