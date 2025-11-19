import { css } from "@/styled-system/css"

export const HeaderStyles = css({
  display: "flex",
  flexDirection: "column",
  gap: "3",
})

export const Title = css({
  fontSize: { base: "2xl", md: "3xl" },
  fontWeight: "700",
})

export const Subtitle = css({
  maxWidth: "2xl",
  fontSize: "sm",
  color: "muted",
})
