import { Header2 } from "@/components/SectionTitle"
import { venueInfoGrid } from "./styles"
import { OpeningHoursTable } from "@/components/OpeningHoursTable"
import { Map } from "@/components/Map"

export const VenueSection = () => {
  return (
    <section className={venueInfoGrid}>
      <div>
        <Header2>Kde nás najdete</Header2>
        <p>
          Najdete nás kousek od metra, atmosféru tvoří dřevo, světýlka a regály her připravené k
          vyzkoušení.
        </p>

        <OpeningHoursTable />
      </div>

      <Map />
    </section>
  )
}
