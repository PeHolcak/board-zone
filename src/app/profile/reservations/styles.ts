import { css } from "@/styled-system/css"

export const wrapper = css({
  maxWidth: "800px",
  margin: "0 auto",
  padding: "2rem 1rem",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
})

export const header = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
})

export const title = css({
  fontSize: "2rem",
  fontWeight: "bold",
  color: "var(--colors-text)",
})

export const subTitle = css({
  fontSize: "1rem",
  color: "var(--colors-text-muted)",
})

export const sectionTitle = css({
  fontSize: "1.25rem",
  fontWeight: "600",
  marginBottom: "1rem",
  borderBottom: "1px solid #3f444e",
  paddingBottom: "0.5rem",
  color: "var(--colors-primary)",
})

export const reservationList = css({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
})

export const reservationCardWrapper = css({
  background: "var(--colors-card)",
  border: "1px solid #3f444e",
  borderRadius: "0.5rem",
  padding: "1.25rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.2)",
})

export const reservationCardTop = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
})

export const tableBadge = css({
  background: "var(--colors-primary)",
  color: "white",
  padding: "0.25rem 0.5rem",
  borderRadius: "0.25rem",
  fontWeight: "bold",
  fontSize: "0.85rem",
})

export const detailRow = css({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: "0.95rem",
})

export const emptyState = css({
  padding: "2rem",
  textAlign: "center",
  color: "var(--colors-text-muted)",
  background: "rgba(255,255,255,0.02)",
  borderRadius: "0.5rem",
  border: "1px dashed #3f444e",
})
