import { Metadata } from "next"

import { Map } from "@/components/Map"

import { contactSection, contactInner } from "./styles"
import { ContactInfo } from "./_components/ContactInfo"
import { ContactForm } from "./_components/ContactForm"

export const metadata: Metadata = {
  title: "Kontakt | BoardZone",
  description: "Kontaktujte nás ohledně rezervací, akcí nebo spolupráce.",
}

const ContactSection = () => {
  return (
    <map className={contactSection}>
      <div className={contactInner}>
        <ContactInfo />
        <ContactForm />
      </div>
      <Map />
    </map>
  )
}

export default ContactSection
