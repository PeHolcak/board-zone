import { css } from "@/styled-system/css"

export const mobileDrawer = css({
  position: "fixed",
  inset: 0,
  bg: "linear-gradient(165deg, rgba(23, 26, 33, 0.98), rgba(12, 14, 18, 0.98))",
  p: "6rem 2rem",
  display: {
    base: "flex",
    lg: "none",
  },
  flexDirection: "column",
  gap: "0.6rem",
  transition: "opacity 0.2s ease, transform 0.2s ease",
  zIndex: 40,
})

export const mobileDrawerClose = css({
  position: "absolute",
  top: "md",
  right: "md",
})

export const mobileDrawerNavList = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  listStyle: "none",
  m: 0,
  p: 0,
})

export const mobileDrawerNavLink = css({
  display: "block",
  textDecoration: "none",
  borderRadius: "md",
  bg: "ghostButton",
  borderWidth: "0.1rem",
  borderStyle: "solid",
  borderColor: "muted",
  color: "text",
  fontSize: "1.05rem",
  fontWeight: 600,
  letterSpacing: "0.02em",

  p: "1.1rem 0.9rem",
  my: "0.5rem",

  transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease",
  _hover: {
    bg: "primary_20",
    borderColor: "primary",
    transform: "translateY(-1px)",
  },
})

export const mobileDrawerNavLinkActive = css({
  bg: "primary_20",
  borderColor: "primary",
})

export const mobileDrawerCta = css({
  display: "grid",
  gap: "sm",
  pt: "1rem",
  borderTopWidth: "0.1rem",
  borderTopStyle: "solid",
  borderTopColor: "borderSubtle",
})
