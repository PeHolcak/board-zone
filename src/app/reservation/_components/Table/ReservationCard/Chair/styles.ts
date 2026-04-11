import { css } from "@/styled-system/css"
import type { TableState } from "../types"

export const chair = (occupied: boolean, tableState: TableState) =>
  css({
    width: "1.25rem",
    height: "1.25rem",
    borderRadius: "9999px",
    border: "2px solid #2a2e37",
    boxShadow: "sm",
    transition: "all 0.3s ease",
    backgroundColor: occupied
      ? tableState === "joinable"
        ? "var(--colors-primary)"
        : tableState === "closed"
          ? "#ef4444"
          : "var(--colors-surface)"
      : "var(--colors-surface)",
    borderColor: occupied
      ? tableState === "joinable"
        ? "var(--colors-primary)"
        : tableState === "closed"
          ? "#ef4444"
          : "#2a2e37"
      : "#2a2e37",
  })