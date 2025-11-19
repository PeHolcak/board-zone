"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

import { FormInput } from "@/components/FormInput"
import { type LoginValues, loginSchema } from "@/schemas/userFormSchema"
import { Button } from "@/components/CTA/Button"
import { Dialog } from "@/components/Dialog"

import { form, rememberRow, checkbox, checkboxLabel, actionsRow, forgotLink } from "./styles"

type LoginDialogProps = {
  onClose?: () => void
}

export const LoginDialog = ({ onClose }: LoginDialogProps) => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  })

  const onSubmit = async (data: LoginValues) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (res?.error) {
      toast.error("Operace proběhla neúspěšně", {
        description: "Přihlášení se nezdařilo.",
      })
      return
    }

    toast.success("Operace proběhla úspěšně", {
      description: "Přihlášení se zdařilo.",
    })
    router.refresh()
    onClose?.()
  }

  return (
    <Dialog title="Přihlášení" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className={form} noValidate>
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
          autoComplete="current-password"
          register={register}
          error={errors.password?.message}
        />

        <div className={rememberRow}>
          <label className={checkboxLabel}>
            <input type="checkbox" className={checkbox} {...register("remember")} />
            Zapamatovat
          </label>
        </div>

        <div className={actionsRow}>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Přihlašuji..." : "Přihlásit se"}
          </Button>

          <Link href="/zapomenute-heslo" className={forgotLink}>
            Zapomenuté heslo
          </Link>
        </div>
      </form>
    </Dialog>
  )
}
