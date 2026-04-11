import type { Metadata } from "next"
import { count, or, ilike } from "drizzle-orm"

import { db } from "@/db/client"
import { contactMessages } from "@/db/schema"
import { Card } from "@/components/Card"
import { Header2 } from "@/components/SectionTitle"

import { MessagesPagination } from "./_components/MessagesPagination"
import { MessagesFilter } from "./_components/MessagesFilter"
import { CardItem } from "./_components/CardItem"
import { emptyState, list, cardGrid, section } from "./styles"

export const metadata: Metadata = {
  title: "Zprávy | Administrace | BoardZone",
  description: "Správa kontaktních zpráv.",
}

export const dynamic = "force-dynamic"

const PAGE_SIZE = 6

type AdminPageProps = {
  searchParams?: {
    page?: string
    search?: string
  }
}

export default async function AdminMessagesPage({ searchParams }: AdminPageProps) {
  const params = await searchParams
  const rawPage = Number(params?.page ?? "1")
  const currentPage = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage
  const offset = (currentPage - 1) * PAGE_SIZE

  const normalizedSearch = params?.search ? `%${params.search}%` : undefined
  const searchCondition = normalizedSearch
    ? or(
        ilike(contactMessages.name, normalizedSearch),
        ilike(contactMessages.email, normalizedSearch),
        ilike(contactMessages.message, normalizedSearch)
      )
    : undefined

  const [totalRowsResult, messages] = await Promise.all([
    db.select({ value: count() }).from(contactMessages).where(searchCondition),
    db.query.contactMessages.findMany({
      where: searchCondition,
      limit: PAGE_SIZE,
      offset,
      orderBy: (tbl, { desc }) => desc(tbl.createdAt),
    })
  ])

  const total = totalRowsResult[0]?.value ?? 0
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <div className={section}>
      <Header2>Kontaktní zprávy ({total})</Header2>
      
      <MessagesFilter />

      {messages.length === 0 ? (
        <p className={emptyState} style={{ marginTop: "1rem" }}>Žádné zprávy neodpovídají hledání.</p>
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
  )
}
