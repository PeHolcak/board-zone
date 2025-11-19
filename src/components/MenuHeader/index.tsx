import { HeaderStyles, Title, Subtitle } from "./styles"

type HeaderProps = { title: string; description: string }

export const Header = ({ title, description }: HeaderProps) => (
  <header className={HeaderStyles}>
    <h1 className={Title}>{title}</h1>
    <p className={Subtitle}>{description}</p>
  </header>
)
