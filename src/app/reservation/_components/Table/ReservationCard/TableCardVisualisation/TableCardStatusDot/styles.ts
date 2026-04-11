import { css } from "@/styled-system/css"
import type { TableState } from "../../types"

export const statusDotWrapper = css({
  position: "absolute",
  top: "1rem",
  right: "1rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
})

export const statusDot = (tableState: TableState) =>
  css({
    width: "0.75rem",
    height: "0.75rem",
    borderRadius: "9999px",
    display: "inline-flex",
    backgroundColor:
      tableState === "empty"
        ? "#2a2e37"
        : tableState === "joinable"
          ? "var(--colors-primary)"
          : "#ef4444",
  })

