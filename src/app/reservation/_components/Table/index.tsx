import { ReservationCard } from "./ReservationCard"
import { tablesGrid } from "./styles"

type TableType = {
  id: string
  label: string
  capacity: number
}

const TABLES: TableType[] = [
  { id: "S-11", label: "Stůl S-11", capacity: 1 },
  { id: "S-01", label: "Stůl S-01", capacity: 2 },
  { id: "S-02", label: "Stůl S-02", capacity: 2 },
  { id: "S-03", label: "Stůl S-03", capacity: 2 },
  { id: "M-01", label: "Stůl M-01", capacity: 4 },
  { id: "M-02", label: "Stůl M-02", capacity: 4 },
  { id: "M-03", label: "Stůl M-03", capacity: 4 },
  { id: "L-01", label: "Stůl L-01", capacity: 6 },
  { id: "L-02", label: "Stůl L-02", capacity: 6 },
]

export const Table = () => {
  return (
    <div className={tablesGrid}>
      {TABLES.map((table) => (
        <ReservationCard
          key={table.id}
          id={table.id}
          label={table.label}
          capacity={table.capacity}
        />
      ))}
    </div>
  )
}
