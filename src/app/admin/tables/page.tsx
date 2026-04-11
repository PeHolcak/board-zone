import type { Metadata } from "next"
import { count, ilike } from "drizzle-orm"

import { db } from "@/db/client"
import { tables } from "@/db/schema"
import { Header2 } from "@/components/SectionTitle"

import { TablesManager } from "./_components/TablesManager"
import { TablesPagination } from "./_components/TablesPagination"
import { TablesFilter } from "./_components/TablesFilter"

export const metadata: Metadata = {
  title: "Správa stolů | Administrace | BoardZone",
  description: "Základní správa herních stolů.",
}

export const dynamic = "force-dynamic"

const TABLES_PAGE_SIZE = 9

type PageProps = {
  searchParams?: {
    tablesPage?: string
    search?: string
  }
}

export default async function AdminTablesPage({ searchParams }: PageProps) {
  const params = await searchParams
  const rawPage = Number(params?.tablesPage ?? "1")
  const currentPage = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage
  const offset = (currentPage - 1) * TABLES_PAGE_SIZE

  const normalizedSearch = params?.search ? `%${params.search}%` : undefined
  const searchCondition = normalizedSearch ? ilike(tables.label, normalizedSearch) : undefined

  const [totalRows, paginatedTables] = await Promise.all([
    db.select({ value: count() }).from(tables).where(searchCondition),
    db.query.tables.findMany({
      where: searchCondition,
      orderBy: (tbl, { asc }) => asc(tbl.id),
      limit: TABLES_PAGE_SIZE,
      offset,
    }),
  ])

  const total = totalRows[0]?.value ?? 0
  const totalPages = Math.max(1, Math.ceil(total / TABLES_PAGE_SIZE))

  return (
    <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
      <Header2>Seznam herních stolů</Header2>
      
      <TablesFilter />

      <TablesManager initialTables={paginatedTables} totalTables={total} />
      
      {totalPages > 1 && (
        <div style={{ marginTop: "2rem" }}>
          <TablesPagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}
    </section>
  )
}
