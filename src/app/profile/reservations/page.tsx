import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import type { Metadata } from "next"

import { db } from "@/db/client"
import { users, reservations } from "@/db/schema"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { eq, desc, and, gte, lt, or, ne, sql } from "drizzle-orm"

import { CancelButton } from "./_components/CancelButton"
import { Pagination } from "./_components/Pagination"
import {
  wrapper,
  header,
  title,
  subTitle,
  sectionTitle,
  reservationList,
  reservationCardWrapper,
  reservationCardTop,
  tableBadge,
  detailRow,
  emptyState
} from "./styles"


  const ITEMS_PER_PAGE = 4

export const metadata: Metadata = {
  title: "Moje rezervace | BoardZone",
  description: "Přehled vašich rezervací stolů v BoardZone.",
}

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("cs-CZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)

type PageProps = {
  searchParams: Promise<{
    upPage?: string
    histPage?: string
  }>
}

export default async function MyReservationsPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    redirect("/")
  }

  const resolvedSearchParams = await searchParams
  const upPage = Number(resolvedSearchParams.upPage) || 1
  const histPage = Number(resolvedSearchParams.histPage) || 1

  const userRecord = await db.query.users.findFirst({
    where: eq(users.email, session.user.email),
  })

  if (!userRecord) {
    return <div>Uživatel nebyl nalezen.</div>
  }

  const isAdmin = userRecord.role === "admin"
  const now = new Date()

  const upcomingCondition = and(
    eq(reservations.userId, userRecord.id),
    gte(reservations.reservationDate, now),
    eq(reservations.status, "active")
  )

  const historyCondition = and(
    eq(reservations.userId, userRecord.id),
    or(lt(reservations.reservationDate, now), ne(reservations.status, "active"))
  )

  const [
    [upcomingCountRow],
    [historyCountRow],
    upcoming,
    history
  ] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(reservations).where(upcomingCondition),
    db.select({ count: sql<number>`count(*)` }).from(reservations).where(historyCondition),
    db.query.reservations.findMany({
      where: upcomingCondition,
      orderBy: [desc(reservations.reservationDate)],
      limit: ITEMS_PER_PAGE,
      offset: (upPage - 1) * ITEMS_PER_PAGE,
      with: { table: true },
    }),
    db.query.reservations.findMany({
      where: historyCondition,
      orderBy: [desc(reservations.reservationDate)],
      limit: ITEMS_PER_PAGE,
      offset: (histPage - 1) * ITEMS_PER_PAGE,
      with: { table: true },
    })
  ])

  const totalUpcomingPages = Math.ceil(Number(upcomingCountRow.count) / ITEMS_PER_PAGE) || 1
  const totalHistoryPages = Math.ceil(Number(historyCountRow.count) / ITEMS_PER_PAGE) || 1

  return (
    <div className={wrapper}>
      <div className={header}>
        <h1 className={title}>Moje rezervace</h1>
        <p className={subTitle}>Přehled všech vašich naplánovaných i proběhlých rezervací</p>
      </div>

      <section>
        <h2 className={sectionTitle}>Nadcházející rezervace</h2>
        
        {upcoming.length === 0 ? (
          <div className={emptyState}>Nemáte žádné nadcházející rezervace.</div>
        ) : (
          <>
            <div className={reservationList}>
              {upcoming.map((res) => {
                const timeDifferenceMs = res.reservationDate.getTime() - now.getTime()
                const hoursDifference = timeDifferenceMs / (1000 * 60 * 60)
                const canCancel = isAdmin || hoursDifference >= 24

                return (
                  <div key={res.id} className={reservationCardWrapper}>
                    <div className={reservationCardTop}>
                      <div>
                        <span className={tableBadge}>{res.table?.label || "Neznámý stůl"}</span>
                        <div style={{ marginTop: "0.5rem", fontSize: "1.1rem", fontWeight: "bold" }}>
                          {formatDate(res.reservationDate)} 
                        </div>
                        <div style={{ fontSize: "0.9rem", color: "var(--colors-text-muted)" }}>
                          Délka: {res.duration} minut
                        </div>
                      </div>
                      {canCancel && <CancelButton reservationId={res.id} />}
                    </div>
                    
                    <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.5rem" }}>
                      <div className={detailRow}>
                        <strong>Míst:</strong> {res.seats} {res.type === "table" ? "(Celý stůl)" : ""}
                      </div>
                      {res.gameName && (
                        <div className={detailRow}>
                          <strong>Hra:</strong> {res.gameName}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            <Pagination currentPage={upPage} totalPages={totalUpcomingPages} paramName="upPage" />
          </>
        )}
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2 className={sectionTitle} style={{ color: "var(--colors-text-muted)" }}>Historie a zrušené</h2>
        
        {history.length === 0 ? (
          <div className={emptyState}>Zatím nemáte žádnou historii rezervací.</div>
        ) : (
          <>
            <div className={reservationList}>
              {history.map((res) => (
                <div key={res.id} className={reservationCardWrapper} style={{ opacity: 0.6 }}>
                  <div className={reservationCardTop}>
                    <div>
                      <span className={tableBadge} style={{ background: "#3f444e" }}>{res.table?.label || "Neznámý stůl"}</span>
                      <div style={{ marginTop: "0.5rem", fontSize: "1.1rem" }}>
                        {formatDate(res.reservationDate)}
                      </div>
                    </div>
                    {res.status === "cancelled" && (
                      <span style={{ color: "#ff4444", fontSize: "0.85rem", fontWeight: "bold" }}>Zrušeno</span>
                    )}
                    {res.status === "active" && res.reservationDate < now && (
                      <span style={{ color: "var(--colors-text-muted)", fontSize: "0.85rem" }}>Proběhlo</span>
                    )}
                  </div>
                  
                  <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.5rem" }}>
                    <div className={detailRow}>
                      <strong>Míst:</strong> {res.seats}
                    </div>
                    {res.gameName && (
                      <div className={detailRow}>
                        <strong>Hra:</strong> {res.gameName}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Pagination currentPage={histPage} totalPages={totalHistoryPages} paramName="histPage" />
          </>
        )}
      </section>
    </div>
  )
}
