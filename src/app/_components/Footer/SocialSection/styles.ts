import { css } from "@/styled-system/css"

export const socialWrapper = css({
    display: "flex",
    flexDirection: "column",
    alignItems: { base: "center", lg: "flex-end" },
    gap: "0.75rem",
})

export const socialTitle = css({
    fontSize: "1.1rem",
    fontWeight: 600,
})

export const socialList = css({
    display: "flex",
    flexDirection: "column",
    gap: "0.45rem",
})

export const socialItem = css({
    fontSize: "0.95rem",
    "& a": {
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        textDecoration: "none",
        transition: "opacity .2s ease",
    },
    "& a:hover": {
        opacity: 0.7,
    },
})
