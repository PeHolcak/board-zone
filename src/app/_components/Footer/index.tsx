import Link from "next/link"
import { footer, footerInner, footerBottom } from "./styles"
import { BrandSection } from "./BrandSection"
import { HoursSection } from "./HoursSection"
import { SocialSection } from "./SocialSection"

export const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className={footer}>
      <div className={footerInner}>
        <BrandSection />
        <HoursSection />
        <SocialSection />
      </div>

      <div className={footerBottom}>
        <p>&copy; {year} BoardZone. Všechna práva vyhrazena.</p>
        <Link href="#">Zásady ochrany osobních údajů</Link>
      </div>
    </footer>
  )
}
