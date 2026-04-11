"use server"

import { db } from "@/db/client"
import { reservations, users } from "@/db/schema"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { verifyRecaptcha } from "@/lib/recaptcha"

export async function submitReservation({
  tableId,
  type,
  seats,
  reservationDateTime,
  reservationDuration,
  gameName,
  recaptchaToken,
}: {
  tableId: string
  type: "table" | "seats"
  seats: number
  reservationDateTime: Date
  reservationDuration: number
  gameName?: string
  recaptchaToken: string
}) {
  await verifyRecaptcha(recaptchaToken)
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    throw new Error("Pro rezervaci musíte být přihlášeni.")
  }

  const userRecord = await db.query.users.findFirst({
    where: eq(users.email, session.user.email),
  })

  if (!userRecord) {
    throw new Error("Uživatelský účet nebyl v databázi nalezen.")
  }

  await db.insert(reservations).values({
    userId: userRecord.id,
    tableId,
    type,
    seats,
    reservationDate: new Date(reservationDateTime),
    duration: reservationDuration,
    gameName,
  })

  revalidatePath("/reservation")
}

export async function cancelReservation(reservationId: number) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    throw new Error("Pro zrušení rezervace musíte být přihlášeni.")
  }

  const userRecord = await db.query.users.findFirst({
    where: eq(users.email, session.user.email),
  })

  if (!userRecord) {
    throw new Error("Uživatelský účet nebyl v databázi nalezen.")
  }

  const existingReservation = await db.query.reservations.findFirst({
    where: eq(reservations.id, reservationId),
  })

  if (!existingReservation) {
    throw new Error("Rezervace nebyla nalezena.")
  }

  const isAdmin = userRecord.role === "admin"

  if (!isAdmin && existingReservation.userId !== userRecord.id) {
    throw new Error("Tato rezervace vám nepatří.")
  }

  if (existingReservation.status !== "active") {
    throw new Error("Tuto rezervaci již nelze zrušit.")
  }

  if (!isAdmin) {
    const now = new Date()
    const timeDifferenceMs = existingReservation.reservationDate.getTime() - now.getTime()
    const hoursDifference = timeDifferenceMs / (1000 * 60 * 60)

    if (hoursDifference < 24) {
      throw new Error("Rezervaci lze zrušit nejpozději 24 hodin před jejím začátkem.")
    }
  }

  await db.update(reservations)
    .set({ status: "cancelled" })
    .where(eq(reservations.id, reservationId))

  revalidatePath("/", "layout")
}
