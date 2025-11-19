import { z } from "zod"

const emailSchema = z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Neplatný formát e-mailu")

const passwordSchema = z
  .string()
  .min(6, "Heslo musí mít alespoň 6 znaků")
  .refine((value) => /[A-Z]/.test(value), {
    message: "Heslo musí obsahovat alespoň jedno velké písmeno",
  })
  .refine((value) => /[a-z]/.test(value), {
    message: "Heslo musí obsahovat alespoň jedno malé písmeno",
  })
  .refine((value) => /[0-9]/.test(value), {
    message: "Heslo musí obsahovat alespoň jednu číslici",
  })
  .refine((value) => /[!@#$%^&*(),.?\":{}|<>_\-]/.test(value), {
    message: "Heslo musí obsahovat alespoň jeden speciální znak",
  })

const baseCredentialsSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export const registrationSchema = baseCredentialsSchema
  .extend({
    name: z.string().min(2, "Jméno musí mít alespoň 2 znaky"),
    passwordConfirm: z.string().min(6, "Heslo musí mít alespoň 6 znaků"),
    consent: z.boolean().refine((val) => val === true, {
      message: "Musíte souhlasit se zpracováním osobních údajů",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Hesla se neshodují",
    path: ["passwordConfirm"],
  })

export type RegistrationValues = z.infer<typeof registrationSchema>

export const loginSchema = baseCredentialsSchema.extend({
  remember: z.boolean(),
})

export type LoginValues = z.infer<typeof loginSchema>
