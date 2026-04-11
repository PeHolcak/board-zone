import { css } from "@/styled-system/css"
import type { TableState } from "../types"


export const headerRow = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "1rem",
  marginBottom: "0.75rem",
})

export const tableName = css({
  fontSize: "1.125rem",
  fontWeight: 700,
  color: "var(--colors-text)",
  transition: "color 0.3s ease",
})


export const stateBadge = (tableState: TableState) =>
  css({
    display: "inline-flex",
    alignItems: "center",
    gap: "0.375rem",
    fontSize: "0.75rem",
    fontWeight: 600,
    paddingX: "0.625rem",
    paddingY: "0.25rem",
    borderRadius: "9999px",
    whiteSpace: "nowrap",
    backgroundColor:
      tableState === "empty"
        ? "#2a2e37"
        : tableState === "joinable"
          ? "rgba(59,130,246,0.2)"
          : "rgba(239,68,68,0.2)",
    color:
      tableState === "empty"
        ? "var(--colors-muted)"
        : tableState === "joinable"
          ? "var(--colors-primary)"
          : "#f87171",
  })

  