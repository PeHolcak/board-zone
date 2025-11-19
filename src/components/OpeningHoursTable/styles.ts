import { css } from "@/styled-system/css"

export const hoursTable = css({
  mt: "md",
  width: "100%",
  borderCollapse: "collapse",
  bg: "secondary_70",
  borderRadius: "md",
  overflow: "hidden",
  "& th, & td": {
    py: "0.75rem",
    px: "1rem",
    borderBottom: "1px solid rgba(229, 231, 235, 0.06)",
    textAlign: "left",
  },
  "& tr:last-child th, & tr:last-child td": {
    borderBottom: "none",
  },
})
