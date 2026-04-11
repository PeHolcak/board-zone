import type { Metadata } from "next"
import { count, eq, and, ilike, gte, lte, asc } from "drizzle-orm"

import { db } from "@/db/client"
import { reservations, users, tables } from "@/db/schema"
import { Header2 } from "@/components/SectionTitle"

import { ReservationsPagination } from "../_components/ReservationsPagination"
import { ReservationsFilter } from "./_components/ReservationsFilter"
import { ReservationTable } from "../_components/ReservationTable"
import { emptyState, section } from "../styles"

export const metadata: Metadata = {
  title: "Rezervace | Administrace | BoardZone",
  description: "Správa rezervací.",
}

export const dynamic = "force-dynamic"

const RES_PAGE_SIZE = 8

type PageProps = {
  searchParams?: {
    resPage?: string
    email?: string
    table?: string
    date?: string
  }
}

export default async function AdminReservationsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const rawResPage = Number(params?.resPage ?? "1")
  const currentResPage = Number.isNaN(rawResPage) || rawResPage < 1 ? 1 : rawResPage
  const resOffset = (currentResPage - 1) * RES_PAGE_SIZE

  const conditions = [eq(reservations.status, "active")]

  if (params?.email) {
    conditions.push(ilike(users.email, `%${params.email}%`))
  }

  if (params?.table) {
    conditions.push(ilike(tables.label, `%${params.table}%`))
  }

  if (params?.date) {
    const startOfDay = new Date(params.date)
    startOfDay.setHours(0, 0, 0, 0)
    
    const endOfDay = new Date(params.date)
    endOfDay.setHours(23, 59, 59, 999)

    conditions.push(gte(reservations.reservationDate, startOfDay))
    conditions.push(lte(reservations.reservationDate, endOfDay))
  }

  const whereCondition = and(...conditions)

  const [totalRowsResult, rowsResult] = await Promise.all([
    db
      .select({ value: count() })
      .from(reservations)
      .leftJoin(users, eq(reservations.userId, users.id))
      .leftJoin(tables, eq(reservations.tableId, tables.id))
      .where(whereCondition),
    db
      .select({
        id: reservations.id,
        userName: users.name,
        userEmail: users.email,
        tableLabel: tables.label,
        reservationDate: reservations.reservationDate,
      })
      .from(reservations)
      .leftJoin(users, eq(reservations.userId, users.id))
      .leftJoin(tables, eq(reservations.tableId, tables.id))
      .where(whereCondition)
      .limit(RES_PAGE_SIZE)
      .offset(resOffset)
      .orderBy(asc(reservations.reservationDate)),
  ])

  const resTotal = totalRowsResult[0]?.value ?? 0
  const resTotalPages = Math.max(1, Math.ceil(resTotal / RES_PAGE_SIZE))

  const ROWS = rowsResult.map((res) => ({
    id: res.id,
    name: res.userName || "Neznámý uživatel",
    email: res.userEmail || "Bez emailu",
    tableLabel: res.tableLabel || "Neznámý stůl",
    reservationTime: res.reservationDate.toLocaleString("cs-CZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  }))

  return (
    <div className={section}>
      <Header2>Všechny rezervace ({resTotal})</Header2>
      
      <ReservationsFilter />

      {ROWS.length === 0 ? (
        <p className={emptyState}>Žádné aktivní rezervace neodpovídají hledání.</p>
      ) : (
        <>
          <ReservationTable rows={ROWS} />
          <ReservationsPagination currentPage={currentResPage} totalPages={resTotalPages} />
        </>
      )}
    </div>
  )
}
