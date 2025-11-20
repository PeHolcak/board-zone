import Link from "next/link"
import { useSession } from "next-auth/react"

import { Button } from "@/components/CTA/Button"

import { XmarkSolid } from "@lineiconshq/free-icons"
import { Lineicons } from "@lineiconshq/react-lineicons"
import { ButtonLink } from "@/components/CTA/ButtonLink"
import { IconButton } from "@/components/IconButton"

import {
  mobileDrawer,
  mobileDrawerNavLink,
  mobileDrawerNavLinkActive,
  mobileDrawerCta,
  mobileDrawerClose,
} from "./styles"

type NavItem = {
  id: string
  label: string
  href: string
}

type MobileMenuProps = {
  isOpen: boolean
  navItems: NavItem[]
  onClose: () => void
  onLogin: () => void
  onRegister: () => void
  onLogout: () => void
  isActive: (href: string) => boolean
}

export const MobileMenu = ({
  isOpen,
  navItems,
  onClose,
  onLogin,
  onRegister,
  onLogout,
  isActive,
}: MobileMenuProps) => {
  const { status, data: session } = useSession()
  if (!isOpen) {
    return null
  }

  const isAuthenticated = status === "authenticated"
  const isAdmin = session?.user?.role === "admin"

  console.log("isAdmin", isAdmin)
  return (
    <div className={mobileDrawer}>
      <IconButton
        onClick={onClose}
        ariaLabel="Zavřít menu"
        className={mobileDrawerClose}
        icon={
          <Lineicons icon={XmarkSolid} size={18} strokeWidth={1.7} style={{ marginRight: 8 }} />
        }
      />

      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className={`${mobileDrawerNavLink} ${
                  isActive(item.href) ? mobileDrawerNavLinkActive : ""
                }`}
                onClick={onClose}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={mobileDrawerCta}>
        {isAuthenticated ? (
          <>
            {isAdmin && (
              <ButtonLink href="/admin" variant="ghost">
                Admin
              </ButtonLink>
            )}
            <ButtonLink href="/profile" onClick={onClose} variant="ghost" fullWidth>
              Profil
            </ButtonLink>
            <Button variant="primary" onClick={onLogout} fullWidth>
              Odhlásit
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                onLogin()
              }}
            >
              Přihlásit
            </Button>
            <Button
              variant="ghost"
              fullWidth
              onClick={() => {
                onRegister()
              }}
            >
              Registrovat
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
