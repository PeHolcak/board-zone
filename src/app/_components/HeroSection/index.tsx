import Image from "next/image"
import { heroInner, heroTitle, heroText, heroActions, heroMedia, eyebrow } from "./styles"
import { ButtonLink } from "@/components/CTA/ButtonLink"

export const HeroSection = () => {
  return (
    <section className={heroInner}>
      <div>
        <p className={eyebrow}>Deskové hry &amp; řemeslné pivo</p>
        <h1 className={heroTitle}>Deskové hry &amp; pivo. Rezervuj stůl online.</h1>
        <p className={heroText}>
          Vyrazte s partou na večer plný strategií, příběhů a speciálních piv. Rezervace zvládnete
          během pár kliknutí.
        </p>

        <div className={heroActions}>
          <ButtonLink href="/reservation" variant="primary" fullWidth>
            Rezervovat stůl
          </ButtonLink>
          <ButtonLink href="/menu" variant="ghost" fullWidth>
            Zobrazit menu
          </ButtonLink>
        </div>
      </div>

      <div className={heroMedia}>
        <Image
          src="/images/hero-board.svg"
          alt="Deskové hry a pivo"
          width={600}
          height={400}
          loading="lazy"
        />
      </div>
    </section>
  )
}
