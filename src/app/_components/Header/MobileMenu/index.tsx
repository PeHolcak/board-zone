import Link from "next/link"
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
  isAuthenticated: boolean
  onClose: () => void
  onLogin: () => void
  onRegister: () => void
  onLogout: () => void
  isActive: (href: string) => boolean
}

export const MobileMenu = ({
  isOpen,
  navItems,
  isAuthenticated,
  onClose,
  onLogin,
  onRegister,
  onLogout,
  isActive,
}: MobileMenuProps) => {
  if (!isOpen) {
    return null
  }

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
        {!isAuthenticated ? (
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
        ) : (
          <>
            <ButtonLink href="/profile" onClick={onClose} variant="ghost" fullWidth>
              Profil
            </ButtonLink>
            <Button variant="primary" onClick={onLogout} fullWidth>
              Odhlásit
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
