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

type PageProps = {
  searchParams: Promise<{
    date?: string
    time?: string
    duration?: string
    page?: string
  }>
}

const ReservationSection = async ({ searchParams }: PageProps) => {
  const session = await getServerSession(authOptions)
  const isAuthenticated = !!session

  const resolvedSearchParams = await searchParams

  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  const defaultDateStr = `${year}-${month}-${day}`
  const defaultTimeStr = now.toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" })

  const selectedDate = resolvedSearchParams.date || defaultDateStr
  const selectedTime = resolvedSearchParams.time || defaultTimeStr
  const selectedDuration = Number(resolvedSearchParams.duration) || 60
  const currentPage = Number(resolvedSearchParams.page) || 1

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
      <Filters 
        initialDate={selectedDate}
        initialTime={selectedTime}
        initialDuration={String(selectedDuration)}
      />
      <Table 
        isAuthenticated={isAuthenticated} 
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        selectedDuration={selectedDuration}
        currentPage={currentPage}
      />
    </div>
  )
}
export default ReservationSection
