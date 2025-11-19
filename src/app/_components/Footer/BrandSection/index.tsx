import { Header2 } from "@/components/SectionTitle"
import { COMPANY_DATA } from "@/config/company"

import { brandWrapper, contactItem } from "./styles"

export const BrandSection = () => {
  return (
    <div className={brandWrapper}>
      <Header2>{COMPANY_DATA.companyName}</Header2>
      <p>{COMPANY_DATA.address}</p>
      <p className={contactItem}>
        <strong>Telefon:</strong> <a href="tel:+420777123456">{COMPANY_DATA.tel}</a>
      </p>
      <p className={contactItem}>
        <strong>E-mail:</strong> <a href="mailto:ahoj@boardzone.cz">{COMPANY_DATA.email}</a>
      </p>
    </div>
  )
}
