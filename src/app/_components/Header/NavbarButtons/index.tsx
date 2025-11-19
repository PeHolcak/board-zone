"use client"

import { useSession } from "next-auth/react"

import { Button } from "@/components/CTA/Button"
import { ButtonLink } from "@/components/CTA/ButtonLink"
import Loader from "@/components/Loader"

type NavbarButtonsProps = {
  onLogin: () => void
  onRegister: () => void
  onLogout: () => void
}

export const NavbarButtons = ({ onLogin, onRegister, onLogout }: NavbarButtonsProps) => {
  const { status, data: session } = useSession()

  if (status === "loading") {
    return <Loader />
  }

  if (status === "authenticated") {
    return (
      <>
        {session?.user?.role === "admin" && (
          <ButtonLink href="/admin" variant="ghost">
            Admin
          </ButtonLink>
        )}
        <ButtonLink href="/profile" variant="ghost">
          Profil
        </ButtonLink>
        <Button variant="primary" onClick={onLogout}>
          Odhlásit
        </Button>
      </>
    )
  }

  return (
    <>
      <Button variant="primary" onClick={onLogin}>
        Přihlásit
      </Button>
      <Button variant="ghost" onClick={onRegister}>
        Registrovat
      </Button>
    </>
  )
}
