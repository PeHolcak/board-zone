import { css } from "@/styled-system/css"


export const filtersRow = css({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "1rem",
  "@media (min-width: 768px)": {
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  },
})

export const filterField = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.35rem",
})

export const filterLabel = css({
  fontSize: "0.8rem",
  fontWeight: 500,
  color: "muted",
})

export const filterInputWrapper = css({
  position: "relative",
  display: "flex",
  alignItems: "center",
})

const filterBase = {
  width: "100%",
  borderRadius: "2.2rem",
  border: "1px solid rgba(55, 65, 81, 0.9)",
  backgroundColor: "surface",
  paddingBlock: "0.6rem",
  fontSize: "0.9rem",
  color: "text",
  outline: "none",
  _focusVisible: {
    borderColor: "primary",
    boxShadow: "0 0 0 1px #3fb950",
  },
} as const

export const filterInput = css({
  ...filterBase,
  paddingInline: "1rem",
})

export const filterSelect = css({
  ...filterBase,
  paddingInline: "1rem",

  cursor: "pointer",
})
