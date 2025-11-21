"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/CTA/Button"
import { FormInput } from "@/components/FormInput"
import { FormTextarea } from "@/components/FormInput/FormTextarea"
import { Card } from "@/components/Card"

import { submitContact } from "./actions"
import { form } from "./styles"
import { contactFormSchema, type ContactFormValues } from "./schema"

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await submitContact(data)
      toast.success("Operace proběhla úspěšně", {
        description: "Odeslání se zdařilo.",
      })
      reset()
    } catch (error) {
      toast.error("Operace proběhla neúspěšně", {
        description: "Odeslání se nezdařilo.",
      })
      console.error("submitContact error:", error)
    }
  }

  return (
    <Card title="Kontakt &amp; informace">
      <form onSubmit={handleSubmit(onSubmit)} className={form}>
        <FormInput
          name="name"
          label="Jméno"
          register={register}
          error={errors.name?.message}
          placeholder="Vaše jméno"
        />
        <FormInput
          name="email"
          type="email"
          label="E-mail"
          register={register}
          error={errors.email?.message}
          placeholder="např. jana@example.cz"
        />
        <FormTextarea<ContactFormValues>
          name="message"
          label="Zpráva"
          register={register}
          error={errors.message?.message}
          placeholder="Sdělte nám, s čím vám můžeme pomoct."
        />

        <Button variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Odesílám..." : "Odeslat"}
        </Button>
      </form>
    </Card>
  )
}
