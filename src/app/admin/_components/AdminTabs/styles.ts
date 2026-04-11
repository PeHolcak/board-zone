import { css } from "@/styled-system/css"

export const tabsWrapper = css({
  display: "flex",
  gap: "0",
  borderBottomWidth: "1px",
  borderBottomColor: "borderSubtle",
  mb: "2rem",
  overflowX: "auto",
})

export const tabLink = css({
  px: "lg",
  py: "sm",
  fontSize: "sm",
  fontWeight: "500",
  color: "muted",
  borderBottomWidth: "2px",
  borderBottomColor: "transparent",
  transition: "all 0.2s ease",
  whiteSpace: "nowrap",
  cursor: "pointer",
  textDecoration: "none",
  _hover: {
    color: "text",
    bg: "surface",
  },
})

export const tabLinkActive = css({
  px: "lg",
  py: "sm",
  fontSize: "sm",
  fontWeight: "600",
  color: "primary",
  borderBottomWidth: "2px",
  borderBottomColor: "primary",
  whiteSpace: "nowrap",
  cursor: "default",
  textDecoration: "none",
})
