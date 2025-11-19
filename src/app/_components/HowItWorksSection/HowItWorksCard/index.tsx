import { card, titleName } from "./styles"

type HowItWorksCardProps = {
  title: string
  description: string
}

export const HowItWorksCard = ({ title, description }: HowItWorksCardProps) => {
  return (
    <article className={card}>
      <h3 className={titleName}>{title}</h3>
      <p>{description}</p>
    </article>
  )
}
