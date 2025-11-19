"use client"

import { Button } from "@/components/CTA/Button"
import { tableCard, tableHeader, tableName, tableCapacity, tableDescription } from "./styles"
import { useSession } from "next-auth/react"
import Loader from "@/components/Loader"
import { Card } from "@/components/Card"

type ReservationCardProps = {
  id: string
  label: string
  capacity: number
}

const getDescription = (capacity: number) => {
  if (capacity === 1) {
    return "Ideální pro jednotlivce, kteří chtějí klidné a nerušené hraní."
  }
  if (capacity === 2) {
    return "Perfektní pro dvojice, které si chtějí zahrát v pohodlném prostoru."
  }
  if (capacity <= 4) {
    return "Skvělá volba pro menší skupiny, které hledají pohodlí a dostatek prostoru."
  }
  if (capacity <= 6) {
    return "Výborné pro větší skupiny, které chtějí hrát spolu u jednoho stolu."
  }

  return "Prostorný stůl vhodný pro početnější skupiny."
}

export const ReservationCard = ({ label, capacity, id }: ReservationCardProps) => {
  const { status } = useSession()
  return (
    <Card>
      <header className={tableHeader}>
        <h3 className={tableName}>{label}</h3>
        <p className={tableCapacity}>
          Kapacita: {capacity} {capacity === 1 ? "osoba" : "osob"}
        </p>
      </header>

      <p className={tableDescription}>{getDescription(capacity)}</p>
      {status === "loading" && <Loader />}
      {status === "authenticated" && (
        <Button onClick={() => alert(`Rezervovat ${label} (ID: ${id})`)} fullWidth>
          Rezervovat
        </Button>
      )}
    </Card>
  )
}
