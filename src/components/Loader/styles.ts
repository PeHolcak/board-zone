import { css } from "@/styled-system/css"

export const spinner = css({
  width: "48px",
  height: "48px",
  borderRadius: "24px",
  borderWidth: "5px",
  borderStyle: "solid",
  borderColor: "primary_20",
  borderTopColor: "white",
  animation: "spin 0.8s linear infinite",
})
