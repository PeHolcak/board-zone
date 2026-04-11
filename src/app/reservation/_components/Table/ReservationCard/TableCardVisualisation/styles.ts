import { css } from "@/styled-system/css"
import type { TableState } from "../types"

export const horizontalSeatsRowTop = css({
  display: "flex",
  gap: "0.75rem",
  marginBottom: "0.5rem",
})

export const horizontalSeatsRowBottom = css({
  display: "flex",
  gap: "0.75rem",
  marginTop: "0.5rem",
})

export const middleRow = css({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
})

export const tableShape = (tableState: TableState) =>
  css({
    height: "4rem",
    borderRadius: "0.75rem",
    borderWidth: "2px",
    borderStyle: "solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "sm",
    transition: "all 0.3s ease",
    backgroundColor:
      tableState === "empty"
        ? "var(--colors-surface)"
        : tableState === "joinable"
          ? "rgba(59,130,246,0.1)"
          : "rgba(239,68,68,0.1)",
    borderColor:
      tableState === "empty"
        ? "#2a2e37"
        : tableState === "joinable"
          ? "rgba(59,130,246,0.5)"
          : "rgba(239,68,68,0.5)",
  })

export const tableShapeText = (tableState: TableState) =>
  css({
    fontSize: "0.75rem",
    fontWeight: 500,
    color:
      tableState === "empty"
        ? "var(--colors-muted)"
        : tableState === "joinable"
          ? "var(--colors-primary)"
          : "#f87171",
  })

export const visualizationArea = css({
  position: "relative",
  minHeight: "220px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",
  backgroundColor: "var(--colors-bg)",
  borderBottom: "1px solid #2a2e37",
})

export const visualizationInner = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
})

export const verticalSeatsColumn = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
})