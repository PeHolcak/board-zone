import { css } from "@/styled-system/css";

export const pillNav = css({
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.35rem",
});

const pillBase = {
    px: "1.2rem",
    py: "0.55rem",
    borderRadius: "0.8rem",
    fontSize: "sm",
    fontWeight: 500,
    border: "none",
    cursor: "pointer",
    transition:
        "all 0.18s ease",
    whiteSpace: "nowrap",
} as const;

export const pillButton = css({
    ...pillBase,
    bg: "rgba(255,255,255,0.04)",
    color: "muted",
    _hover: {
        bg: "rgba(255,255,255,0.08)",
        color: "text",
        transform: "translateY(-1px)",
        boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
    },
});

export const pillButtonActive = css({
    ...pillBase,
    bg: "rgb(63, 185, 80)",
    color: "#0c0f12",
    transform: "translateY(-1px) scale(1.04)",
    _hover: {
        transform: "translateY(-2px) scale(1.05)",
        boxShadow: "0 6px 18px rgba(63,185,80,0.25)",
    },
});
