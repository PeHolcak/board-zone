import { ReactNode } from "react"
import { titleH2 } from "./styles"

type Header2Props = {
    children: ReactNode
}

export const Header2 = ({ children }: Header2Props) => {
    return <h2 className={titleH2}>{children}</h2>
}
