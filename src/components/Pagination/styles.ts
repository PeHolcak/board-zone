import { css } from "@/styled-system/css";

export const paginationInfo = css({
    fontSize: "sm",
    color: "muted",
});

export const paginationButtons = css({
    m: "1rem 0 0 auto",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    flexWrap: "wrap",
});

const paginationBase = {
    borderRadius: "full",
    fontSize: "sm",
    px: "6",
    py: "0.85",
    cursor: "pointer",
    border: "none",
    background: "rgba(15,17,21,0.85)",
} as const;

export const paginationButton = css({
    ...paginationBase,
});

export const paginationButtonActive = css({
    ...paginationBase,
    background: "primary",
    color: "#050608",
    borderRadius: "0.2rem"
});
