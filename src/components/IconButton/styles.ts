import { css } from "@/styled-system/css";

export const iconStyle = css({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: "sm",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgba(229, 231, 235, 0.18)",
    bg: "rgba(255, 255, 255, 0.04)",
    color: "text",
    cursor: "pointer",
    transition: "background 0.2s ease, border-color 0.2s ease",
    _hover: {
        bg: "rgba(255, 255, 255, 0.08)",
        borderColor: "rgba(229, 231, 235, 0.28)",
    },
});
