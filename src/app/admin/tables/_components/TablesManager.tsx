"use client"

import { useState } from "react"
import { Button } from "@/components/CTA"
import { ReservationCard } from "@/app/reservation/_components/Table/ReservationCard"
import { AddTableModal } from "./AddTableModal"

type Table = {
  id: string
  label: string
  capacity: number
  isActive: boolean
}

export const TablesManager = ({ initialTables, totalTables }: { initialTables: Table[], totalTables: number }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <p style={{ color: "var(--colors-muted)" }}>{totalTables} stolů evidováno v systému</p>
        <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
          + Přidat nový stůl
        </Button>
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
        gap: "1.5rem" 
      }}>
        {initialTables.length === 0 ? (
          <p style={{ color: "var(--colors-muted)", gridColumn: "1 / -1", padding: "2rem 0" }}>
            Nenalezeny žádné stoly.
          </p>
        ) : (
          initialTables.map((table) => (
            <ReservationCard
              key={table.id}
              tableId={table.id}
              tableName={table.label}
              capacity={table.capacity}
              occupiedSeats={0} // Admin grid nepotřebuje obsazená místa vizualizovat
              isJoinable={true}
              isAuthenticated={true} // True pro vynucení dostupnosti footru
              reservationDateTime={new Date()} // Dummy
              reservationDuration={60} // Dummy
              isAdminMode={true} // Zapnutí admin módu skryje "Volno" a zobrazí "Smazat stůl"
            />
          ))
        )}
      </div>

      {isAddModalOpen && <AddTableModal onClose={() => setIsAddModalOpen(false)} />}
    </div>
  )
}
