import { css } from "@/styled-system/css"

type CardItemProps = {
  label: string
  value: string
}

export const CardItem = ({ label, value }: CardItemProps) => {
  return (
    <p className={css({ fontSize: "sm" })}>
      <strong>{label}</strong> {value}
    </p>
  )
}
