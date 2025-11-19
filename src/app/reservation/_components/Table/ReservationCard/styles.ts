import { css } from "@/styled-system/css"

export const tableCard = css({
  backgroundColor: "dark",
  borderRadius: "1.25rem",
  padding: "1.25rem",

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "1rem",
  boxShadow: "0 1.4rem 4rem var(--colors-secondary_70)",
})

export const tableHeader = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
})

export const tableName = css({
  fontSize: "1rem",
  fontWeight: 600,
  color: "text",
})

export const tableCapacity = css({
  fontSize: "0.85rem",
  color: "muted",
})

export const tableDescription = css({
  fontSize: "0.9rem",
  lineHeight: 1.5,
  color: "text",
})
