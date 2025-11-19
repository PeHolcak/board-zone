"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { toast } from "sonner"

import { Dialog } from "@/components/Dialog"
import { FormInput } from "@/components/FormInput"

import { type RegistrationValues, registrationSchema } from "@/schemas/userFormSchema"
import { getErrorMessage } from "@/utils/errorUtils"

import { submitRegistration } from "./actions"
import { form, errorText, rememberRow, checkbox, checkboxLabel, actionsRow } from "./styles"
import { Button } from "@/components/CTA"

type RegisterDialogProps = { onClose: () => void }

export const RegisterDialog = ({ onClose }: RegisterDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      consent: false,
    },
  })

  const showErrorToast = (errorText?: string) => {
    toast.error("Operace proběhla neúspěšně", {
      description: errorText ?? "Registrace se nezdařila.",
    })
  }

  const onSubmit = async (data: RegistrationValues) => {
    try {
      await submitRegistration(data)

      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (res?.error) {
        showErrorToast(res.error)
        return
      }

      toast.success("Operace proběhla úspěšně", {
        description: "Registrace se zdařila. Proběhne automatické přihlášení",
      })

      reset()
      onClose()
    } catch (error) {
      showErrorToast(getErrorMessage(error))
    }
  }

  return (
    <Dialog title="Registrace" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className={form} noValidate>
        <FormInput
          name="name"
          label="Jméno"
          type="text"
          autoComplete="name"
          register={register}
          error={errors.name?.message}
        />

        <FormInput
          name="email"
          label="E-mail"
          type="email"
          autoComplete="email"
          register={register}
          error={errors.email?.message}
        />

        <FormInput
          name="password"
          label="Heslo"
          type="password"
          autoComplete="new-password"
          register={register}
          error={errors.password?.message}
        />

        <FormInput
          name="passwordConfirm"
          label="Potvrzení hesla"
          type="password"
          autoComplete="new-password"
          register={register}
          error={errors.passwordConfirm?.message}
        />

        <div className={rememberRow}>
          <label className={checkboxLabel}>
            <input type="checkbox" className={checkbox} {...register("consent")} />
            Souhlasím se zpracováním osobních údajů.
          </label>
        </div>
        {errors.consent && <p className={errorText}>{errors.consent.message}</p>}

        <div className={actionsRow}>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Registruji..." : "Registrovat"}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
