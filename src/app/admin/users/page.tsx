import type { Metadata } from "next"
import { count, or, ilike } from "drizzle-orm"

import { db } from "@/db/client"
import { users } from "@/db/schema"
import { Header2 } from "@/components/SectionTitle"

import { UsersPagination } from "./_components/UsersPagination"
import { UsersTable } from "./_components/UsersTable"
import { UsersFilter } from "./_components/UsersFilter"
import { emptyState, section } from "../styles"

export const metadata: Metadata = {
  title: "Uživatelé | Administrace | BoardZone",
  description: "Správa uživatelů.",
}

export const dynamic = "force-dynamic"

const USERS_PAGE_SIZE = 10

type PageProps = {
  searchParams?: {
    usersPage?: string
    search?: string
  }
}

export default async function AdminUsersPage({ searchParams }: PageProps) {
  const params = await searchParams
  const rawPage = Number(params?.usersPage ?? "1")
  const currentPage = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage
  const offset = (currentPage - 1) * USERS_PAGE_SIZE

  const normalizedSearch = params?.search ? `%${params.search}%` : undefined
  const searchCondition = normalizedSearch
    ? or(ilike(users.name, normalizedSearch), ilike(users.email, normalizedSearch))
    : undefined

  const [totalRows, allUsers] = await Promise.all([
    db.select({ value: count() }).from(users).where(searchCondition),
    db.query.users.findMany({
      where: searchCondition,
      orderBy: (tbl, { asc }) => asc(tbl.id),
      limit: USERS_PAGE_SIZE,
      offset,
    }),
  ])

  const total = totalRows[0]?.value ?? 0
  const totalPages = Math.max(1, Math.ceil(total / USERS_PAGE_SIZE))

  const ROWS = allUsers.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt.toLocaleString("cs-CZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  }))

  return (
    <div className={section}>
      <Header2>Registrovaní uživatelé ({total})</Header2>
      
      <UsersFilter />

      {ROWS.length === 0 ? (
        <p className={emptyState}>Žádní uživatelé neodpovídají hledání.</p>
      ) : (
        <>
          <UsersTable rows={ROWS} />
          <UsersPagination currentPage={currentPage} totalPages={totalPages} />
        </>
      )}
    </div>
  )
}
