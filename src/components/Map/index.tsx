import { mapButtonWrapper, mapCard, mapPlaceholderText } from "./styles"
import { ButtonLink } from "@/components/CTA"

export const Map = () => {
  return (
    <div className={mapCard}>
      <p className={mapPlaceholderText}>Interaktivní mapa bude doplněna.</p>
      <div className={mapButtonWrapper}>
        <ButtonLink href="https://maps.google.com">Otevřít v Mapách</ButtonLink>
      </div>
    </div>
  )
}
