"use server"

import { z } from "zod"
import { db } from "@/db/client"
import { contactMessages } from "@/db/schema"
import { contactFormSchema, ContactFormValues } from "./schema"

export async function submitContact(values: ContactFormValues) {
  const parsed = contactFormSchema.safeParse(values)

  if (!parsed.success) {
    throw new Error("Neplatná data formuláře")
  }

  const { name, email, message } = parsed.data

  await db.insert(contactMessages).values({
    name,
    email,
    message,
  })

  return { ok: true }
}
