import { ReservationCard } from "./ReservationCard"
import { Pagination } from "../../../profile/reservations/_components/Pagination"

import { tablesGrid } from "./styles"
import { db } from "@/db/client"
import { tables, reservations } from "@/db/schema"
import { eq, and, lt, sql } from "drizzle-orm"

type TableProps = {
  isAuthenticated: boolean
  selectedDate: string
  selectedTime: string
  selectedDuration: number
  currentPage: number
}

export const Table = async ({
  isAuthenticated,
  selectedDate,
  selectedTime,
  selectedDuration,
  currentPage,
}: TableProps) => {
  const now = new Date()
  let searchStart = now

  if (selectedDate && selectedTime) {
    searchStart = new Date(`${selectedDate}T${selectedTime}`)
  } else if (selectedDate) {
    searchStart = new Date(`${selectedDate}T00:00:00`)
  }

  const searchEnd = new Date(searchStart.getTime() + selectedDuration * 60000)

  const [dbTables, overlappingReservations] = await Promise.all([
    db.query.tables.findMany({
      where: eq(tables.isActive, true),
      orderBy: (tables, { asc }) => [asc(tables.id)],
    }),
    db.query.reservations.findMany({
      where: and(
        eq(reservations.status, "active"),
        lt(reservations.reservationDate, searchEnd),
        sql`${reservations.reservationDate} + (${reservations.duration} * interval '1 minute') > ${searchStart}`
      ),
    }),
  ])

  const occupiedMap: Record<string, number> = {}
  const gameMap: Record<string, string> = {}
  for (const r of overlappingReservations) {
    occupiedMap[r.tableId] = (occupiedMap[r.tableId] || 0) + r.seats
    if (r.gameName) {
      gameMap[r.tableId] = r.gameName
    }
  }

  const ITEMS_PER_PAGE = 10
  const totalPages = Math.ceil(dbTables.length / ITEMS_PER_PAGE) || 1
  const paginatedTables = dbTables.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <>
      <div className={tablesGrid}>
        {paginatedTables.map((table) => {
          const occupied = occupiedMap[table.id] || 0
          const isJoinable = table.capacity > occupied
          const gameName = gameMap[table.id]
          
          return (
            <ReservationCard
              key={table.id}
              tableId={table.id}
              tableName={table.label}
              capacity={table.capacity}
              occupiedSeats={occupied}
              isJoinable={isJoinable}
              gameName={gameName || undefined}
              isAuthenticated={isAuthenticated}
              reservationDateTime={searchStart}
              reservationDuration={selectedDuration}
            />
          )
        })}
      </div>

      <div style={{ padding: "1rem 0" }}>
        <Pagination currentPage={currentPage} totalPages={totalPages} paramName="page" />
      </div>
    </>
  )
}
