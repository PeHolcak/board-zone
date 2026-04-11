import { css } from "@/styled-system/css"
import { TableState } from "../types"

export const capacityText = css({
  fontSize: "0.875rem",
  fontWeight: 500,
  color: "var(--colors-muted)",
})

export const capacityValue = (tableState: TableState) =>
  css({
    fontWeight: 700,
    color:
      tableState === "empty"
        ? "var(--colors-text)"
        : tableState === "joinable"
          ? "var(--colors-primary)"
          : "#f87171",
  })

  
export const inlineInfoRow = css({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  marginBottom: "0.75rem",
})
