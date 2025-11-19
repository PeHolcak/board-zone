import { css } from "@/styled-system/css"

export const btn = css({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "sm",
    py: "0.65rem",
    px: "1.4rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "transparent",
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none",
    transition:
        "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease",

    _focusVisible: {
        outline: "2px solid",
        outlineColor: "accent",
        outlineOffset: "2px",
    },

    _disabled: {
        opacity: 0.5,
        cursor: "not-allowed",
    },
})

export const btnPrimary = css({
    bg: "primary",
    color: "#0b0d10",
    _hover: {
        bg: "text",
        color: "surface",
    },
    _focus: {
        bg: "text",
        color: "surface",
    },
})

export const btnGhost = css({
    bg: "transparent",
    borderColor: "rgba(229, 231, 235, 0.18)",
    _hover: {
        color: "primary",
    },
    _focus: {
        color: "primary",
    },
})
