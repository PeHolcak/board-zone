import { css } from "@/styled-system/css"

export const venueInfoGrid = css({
  display: "grid",
  gap: "xl",
  md: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
})
