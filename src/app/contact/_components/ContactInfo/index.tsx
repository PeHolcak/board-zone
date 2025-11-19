import Link from "next/link"
import { contactLead, contactList, contactLabel } from "./styles"
import { OpeningHoursTable } from "@/components/OpeningHoursTable"
import { Card } from "@/components/Card"
import { COMPANY_DATA } from "@/config/company"

export const ContactInfo = () => {
  return (
    <Card title="Kontakt &amp; informace">
      <p className={contactLead}>
        Ozvěte se nám, pokud máte dotazy k rezervacím, firemním večírkům nebo speciálním přáním pro
        vaši herní partu.
      </p>

      <dl className={contactList}>
        <div>
          <dt className={contactLabel}>Adresa:</dt>
          <dd>{COMPANY_DATA.address}</dd>
        </div>
        <div>
          <dt className={contactLabel}>Telefon:</dt>
          <dd>
            <Link href="tel:+420777123456">{COMPANY_DATA.tel}</Link>
          </dd>
        </div>
        <div>
          <dt className={contactLabel}>E-mail:</dt>
          <dd>
            <Link href="mailto:ahoj@boardzone.cz">{COMPANY_DATA.email}</Link>
          </dd>
        </div>
      </dl>

      <OpeningHoursTable />
    </Card>
  )
}
