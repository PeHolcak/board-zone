"use server"

import { z } from "zod"
import { db } from "@/db/client"
import { contactMessages } from "@/db/schema"

const contactFormSchema = z.object({
  name: z.string().min(2, "Jméno musí mít alespoň 2 znaky"),
  email: z.string(),
  message: z.string().min(10, "Zpráva musí mít alespoň 10 znaků"),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

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
