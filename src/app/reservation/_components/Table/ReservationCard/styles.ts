import { css } from "@/styled-system/css"

export const infoArea = css({
  padding: "1.25rem",
})

export const tableCard = css({
  backgroundColor: "var(--colors-surface)",
  borderRadius: "1rem",
  overflow: "hidden",
  border: "1px solid #2a2e37",
  boxShadow: "sm",
  transition: "all 0.3s ease",
  _hover: {
    borderColor: "#3f4552",
  },
})