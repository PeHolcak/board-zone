"use client"

import { ReactNode, ButtonHTMLAttributes } from "react"
import { btn, btnPrimary, btnGhost, btnFullWidth } from "../styles"
import { cx } from "@/styled-system/css"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: "primary" | "ghost"
  fullWidth?: boolean
}

export const Button = ({
  children,
  variant = "primary",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={cx(
        btn,
        variant === "primary" ? btnPrimary : btnGhost,
        fullWidth && btnFullWidth,
        className,
      )}
    >
      {children}
    </button>
  )
}
