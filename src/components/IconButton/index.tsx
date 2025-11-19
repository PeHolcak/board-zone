"use client";

import { ReactNode } from "react";
import { iconStyle } from "./styles";

type IconButtonProps = {
    onClick: () => void;
    icon: ReactNode;
    className?: string;
    ariaLabel?: string;
};

export const IconButton = ({
    onClick,
    icon,
    className,
    ariaLabel = "Button",
}: IconButtonProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`${iconStyle} ${className ?? ""}`}
            aria-label={ariaLabel}
        >
            {icon}
        </button>
    );
};
