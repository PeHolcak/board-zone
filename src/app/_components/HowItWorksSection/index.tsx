import { Header2 } from "@/components/SectionTitle"

import { section, grid, gridCols3 } from "./styles"
import { HowItWorksCard } from "./HowItWorksCard"

const steps = [
  {
    title: "1. Vyberte termín",
    description: "Zvolte datum, čas a délku sezení podle nálady vaší skupiny.",
  },
  {
    title: "2. Zarezervujte stůl",
    description: "Mrkněte na kapacity stolů a rezervujte si ideální místo.",
  },
  {
    title: "3. Užijte si večer",
    description:
      "Přijďte, vyberte hru z knihovny a objednejte si k tomu skvělé pití i něco na zub.",
  },
]

export const HowItWorksSection = () => {
  return (
    <section className={section}>
      <Header2>Jak to funguje</Header2>
      <div className={`${grid} ${gridCols3}`}>
        {steps.map((step) => (
          <HowItWorksCard key={step.title} title={step.title} description={step.description} />
        ))}
      </div>
    </section>
  )
}
