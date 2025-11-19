import { css } from "@/styled-system/css"

export const tablesGrid = css({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "1.5rem",
  paddingBlockEnd: "1rem",
  "@media (min-width: 640px)": {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  "@media (min-width: 1024px)": {
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  },
})
