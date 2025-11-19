"use client"

import Link, { LinkProps } from "next/link"
import { ReactNode } from "react"
import { cx } from "@/styled-system/css"

import { btnFullWidth, btnPrimary, btnGhost, btn } from "@/components/CTA/styles"
import { link } from "./styles"

type ButtonLinkProps = LinkProps & {
  children: ReactNode
  onClick?: () => void
  variant?: "primary" | "ghost"
  fullWidth?: boolean
  className?: string
}

export const ButtonLink = ({
  children,
  href,
  onClick,
  variant = "primary",
  fullWidth = false,
  className,
  ...props
}: ButtonLinkProps) => {
  const variantClass = variant === "ghost" ? btnGhost : btnPrimary

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cx(btn, variantClass, fullWidth && btnFullWidth, link, className)}
      {...props}
    >
      {children}
    </Link>
  )
}
