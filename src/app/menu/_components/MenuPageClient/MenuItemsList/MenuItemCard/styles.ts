import { css } from "@/styled-system/css";

export const itemCard = css({
    position: "relative",
    overflow: "hidden",
    bg: "rgba(23,26,33,0.95)",
    borderRadius: "1rem",
    px: { base: "16", md: "24" },
    py: { base: "8", md: "12" },
    transition: "transform 0.18s ease-out, box-shadow 0.18s ease-out",
});

export const itemHeader = css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "3",
});

export const itemLeft = css({
    display: "flex",
    flexDirection: "column",
    gap: "1",
});

export const itemTitle = css({
    fontWeight: "600",
    fontSize: "lg",
});

export const itemDescription = css({
    fontSize: "sm",
    color: "muted",
});

export const itemMeta = css({
    fontSize: "xs",
    color: "muted",
    opacity: 0.8,
});

export const itemPriceWrapper = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "1",
    minWidth: "5.5rem",
});

export const itemPriceTag = css({
    fontSize: "xs",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "muted",
});

export const itemPrice = css({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    px: "3.25",
    py: "1.15",
    fontWeight: "600",
    fontSize: "sm",
    background: "rgba(63,185,80,1)",
    color: "#050608",
    borderRadius: "0.2rem",
});
