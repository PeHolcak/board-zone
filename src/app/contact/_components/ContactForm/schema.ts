import { z } from "zod"

export type ContactFormValues = z.infer<typeof contactFormSchema>

export const contactFormSchema = z.object({
  name: z.string().min(2, "Jméno musí mít alespoň 2 znaky"),
  email: z.string(),
  message: z.string().min(10, "Zpráva musí mít alespoň 10 znaků"),
})
