import { css } from "@/styled-system/css"

export const tableWrapper = css({
  width: "100%",
  overflowX: "auto",
  borderRadius: "lg",
  borderWidth: "1px",
  borderColor: "borderSubtle",
  bg: "surface",
})

export const tableClass = css({
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "sm",
  minWidth: "32rem",
})

const tableCellBase = {
  px: "md",
  py: "sm",
  borderBottomWidth: "1px",
  borderBottomColor: "borderSubtle",
} as const

export const captionClass = css({
  ...tableCellBase,
  textAlign: "left",
  fontWeight: "600",
  color: "muted",
})

export const thClass = css({
  ...tableCellBase,
  textAlign: "left",
  fontWeight: "500",
  color: "muted",
  bg: "bg",
  whiteSpace: "nowrap",
})

export const tdClass = css({
  ...tableCellBase,
  color: "text",
  _last: {
    borderBottomWidth: 0,
  },
})
