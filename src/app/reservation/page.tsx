import type { Metadata } from "next"
import { getServerSession } from "next-auth"

import { Header } from "@/components/MenuHeader"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import { Filters } from "./_components/Filters"
import { Table } from "./_components/Table"
import { reservationSection, reservationAlert } from "./styles"

export const metadata: Metadata = {
  title: "Rezervace stolu | BoardZone",
  description: "Vyberte si datum, čas a stůl v herním baru BoardZone. Pohodlné online rezervace.",
}

const ReservationSection = async () => {
  const session = await getServerSession(authOptions)
  const isAuthenticated = !!session
  return (
    <div className={reservationSection}>
      <Header
        title="Rezervace stolu"
        description="
              Vyberte datum, čas a stůl, který bude vaší partě nejvíc sedět. Přihlášení uživatelé
              mohou rezervovat jedním klikem."
      />
      {!isAuthenticated && (
        <div className={reservationAlert}>Pro rezervaci se prosím přihlas nebo zaregistruj.</div>
      )}
      <Filters />
      <Table />
    </div>
  )
}
export default ReservationSection
