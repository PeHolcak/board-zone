"use server"

import { z } from "zod"
import { db } from "@/db/client"
import { users } from "@/db/schema"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { RegistrationValues, registrationSchema } from "@/schemas/userFormSchema"

export async function submitRegistration(values: RegistrationValues) {
  const parsed = registrationSchema.safeParse(values)

  if (!parsed.success) {
    throw new Error("Neplatná data formuláře")
  }

  const { name, email, password } = parsed.data

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  })

  if (existingUser) {
    throw new Error("Uživatel s tímto e-mailem již existuje")
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({
    name,
    email,
    passwordHash,
  })

  return { ok: true }
}
