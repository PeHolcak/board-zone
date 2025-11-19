import type { Metadata } from "next"
import { count } from "drizzle-orm"

import { AdminOnly } from "@/components/AdminOnly"
import { db } from "@/db/client"
import { contactMessages } from "@/db/schema"
import { Header } from "@/components/MenuHeader"
import { Card } from "@/components/Card"
import { Header2 } from "@/components/SectionTitle"

import { MessagesPagination } from "./_components/MessagesPagination"
import { CardItem } from "./_components/CardItem"
import { emptyState, list, cardGrid, section } from "./styles"
import { ReservationTable } from "./_components/ReservationTable"

export const metadata: Metadata = {
  title: "Administrace | BoardZone",
  description: "Administrační rozhraní pro správu BoardZone.",
}

export const dynamic = "force-dynamic"

const PAGE_SIZE = 4

type AdminPageProps = {
  searchParams?: {
    page?: string
  }
}

const ROWS = [
  { id: 1, name: "Jan Novák", email: "jan.novak@example.com", role: "admin" },
  { id: 2, name: "Petr Holčák", email: "petr@example.com", role: "editor" },
  { id: 3, name: "Lucie Malá", email: "lucie@example.com", role: "user" },
]

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams
  const rawPage = Number(params?.page ?? "1")
  const currentPage = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage
  const offset = (currentPage - 1) * PAGE_SIZE

  const messages = await db.query.contactMessages.findMany({
    limit: PAGE_SIZE,
    offset,
    orderBy: (tbl, { desc }) => desc(tbl.createdAt),
  })

  const totalRows = await db.select({ value: count() }).from(contactMessages)
  const total = totalRows[0]?.value ?? 0
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <AdminOnly>
      <Header
        title="Stránka pro administratory"
        description={`Kontaktní zprávy (${total} celkem)`}
      />

      <div className={section}>
        <Header2>Tabulka rezervací</Header2>
        <ReservationTable rows={ROWS} />
      </div>

      <div className={section}>
        <Header2>Seznam zpráv</Header2>
        {messages.length === 0 ? (
          <p className={emptyState}>Žádné zprávy k zobrazení.</p>
        ) : (
          <>
            <ul className={list}>
              {messages.map((msg) => (
                <Card key={msg.id} className={cardGrid}>
                  <CardItem label="Jméno" value={msg.name} />
                  <CardItem label="Email" value={msg.email} />
                  <CardItem label="Datum" value={msg.createdAt?.toLocaleString("cs-CZ")} />
                  <CardItem label="Zpráva" value={msg.message} />
                </Card>
              ))}
            </ul>

            <MessagesPagination currentPage={currentPage} totalPages={totalPages} />
          </>
        )}
      </div>
    </AdminOnly>
  )
}
