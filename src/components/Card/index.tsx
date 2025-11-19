import { PropsWithChildren } from "react"
import { cx } from "@/styled-system/css"
import { CardStyles, contactHeading } from "./styles"

type CardProps = PropsWithChildren<{ title?: string; className?: string }>

export const Card = ({ title, children, className }: CardProps) => {
  return (
    <div className={cx(CardStyles, className)}>
      {title ? <h2 className={contactHeading}>{title}</h2> : null}
      {children}
    </div>
  )
}
