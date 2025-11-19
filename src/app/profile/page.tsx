import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import type { Metadata } from "next"

import { db } from "@/db/client"
import { users, contactMessages } from "@/db/schema"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import {
  profilePage,
  profileCard,
  profileHeader,
  profileTitle,
  profileMeta,
  profileGrid,
  profileItem,
  profileLabel,
  profileValue,
  roleBadge,
} from "./styles"

export const metadata: Metadata = {
  title: "Můj profil | BoardZone",
  description: "Spravujte svůj profil, rezervace a nastavení účtu na BoardZone.",
}

export type User = typeof users.$inferSelect
export type ContactMessage = typeof contactMessages.$inferSelect

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("cs-CZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    redirect("/")
  }

  const email = session.user.email as string

  const userRow = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.email, email),
  })

  if (!userRow) {
    return (
      <div className={profilePage}>
        <div className={profileCard}>
          <p>Uživatel s e-mailem {email} nebyl nalezen v databázi.</p>
        </div>
      </div>
    )
  }

  const messages = await db.query.contactMessages.findMany({
    where: (u, { eq }) => eq(u.email, email),
  })

  const user: User = userRow

  return (
    <div className={profilePage}>
      <div className={profileCard}>
        <header className={profileHeader}>
          <div>
            <h1 className={profileTitle}>{user.name}</h1>
            <p className={profileMeta}>
              ID uživatele: <span>#{user.id}</span>
            </p>
          </div>
          <span className={roleBadge}>{user.role === "admin" ? "Administrátor" : "Uživatel"}</span>
        </header>

        <div className={profileGrid}>
          <div className={profileItem}>
            <dt className={profileLabel}>Jméno</dt>
            <dd className={profileValue}>{user.name}</dd>
          </div>

          <div className={profileItem}>
            <dt className={profileLabel}>E-mail</dt>
            <dd className={profileValue}>{user.email}</dd>
          </div>

          <div className={profileItem}>
            <dt className={profileLabel}>Role</dt>
            <dd className={profileValue}>{user.role}</dd>
          </div>

          <div className={profileItem}>
            <dt className={profileLabel}>Datum registrace</dt>
            <dd className={profileValue}>{formatDate(user.createdAt)}</dd>
          </div>
        </div>

        <section style={{ marginTop: "2rem" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>
            Zprávy z kontaktního formuláře
          </h2>

          {messages.length === 0 ? (
            <p>Nemáte žádné zprávy z kontaktního formuláře.</p>
          ) : (
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {messages.map((msg) => (
                <li
                  key={msg.id}
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "0.5rem",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.8rem",
                      opacity: 0.7,
                      marginBottom: "0.25rem",
                    }}
                  >
                    {formatDate(msg.createdAt)}
                  </div>
                  <div style={{ whiteSpace: "pre-wrap" }}>{msg.message}</div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
