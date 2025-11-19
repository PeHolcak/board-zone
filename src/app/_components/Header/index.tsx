"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import { MenuCheesburgerSolid } from "@lineiconshq/free-icons"

import {
  siteHeader,
  siteHeaderInner,
  siteHeaderBrand,
  siteHeaderWordmark,
  siteHeaderNav,
  siteHeaderNavList,
  siteHeaderCta,
  navLink,
  navLinkActive,
  mobileMenuButton,
} from "./styles"
import { Lineicons } from "@lineiconshq/react-lineicons"

import { LoginDialog } from "./LoginDialog"
import { RegisterDialog } from "./RegisterDialog"
import { MobileMenu } from "./MobileMenu"
import { IconButton } from "@/components/IconButton"
import { NavbarButtons } from "./NavbarButtons"

const navItems = [
  { id: "home", label: "Domů", href: "/" },
  { id: "reservation", label: "Rezervace", href: "/reservation" },
  { id: "menu", label: "Menu", href: "/menu" },
  { id: "contact", label: "Kontakt", href: "/contact" },
]

type ModalType = "login" | "register" | null

export const Header = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState<ModalType>(null)

  const { status } = useSession()
  const isAuthenticated = status === "authenticated"

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const handleCloseMenu = () => {
    setIsOpen(false)
    setModalType(null)
  }

  const closeDialog = () => setModalType(null)

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
    handleCloseMenu()
  }

  const handleLogin = () => {
    setIsOpen(false)
    setModalType("login")
  }

  const handleRegister = () => {
    setIsOpen(false)
    setModalType("register")
  }

  return (
    <header className={siteHeader} data-component="site-header">
      <div className={siteHeaderInner}>
        <Link
          href="/"
          className={siteHeaderBrand}
          aria-label={`BoardZone domů`}
          onClick={handleCloseMenu}
        >
          <>
            <Image
              src="/images/logo.svg"
              alt="Deskové hry a pivo"
              width={80}
              height={67}
              loading="lazy"
            />
            <span className={siteHeaderWordmark}>BoardZone</span>
          </>
        </Link>

        <IconButton
          onClick={() => setIsOpen(true)}
          ariaLabel="Otevřít menu"
          className={mobileMenuButton}
          icon={
            <Lineicons icon={MenuCheesburgerSolid} size={28} strokeWidth={1.7} aria-hidden="true" />
          }
        />

        <nav className={siteHeaderNav} aria-label="Hlavní navigace">
          <ul className={siteHeaderNavList}>
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`${navLink} ${isActive(item.href) ? navLinkActive : ""}`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={siteHeaderCta}>
          <NavbarButtons
            onLogin={handleLogin}
            onRegister={handleRegister}
            onLogout={handleLogout}
          />
        </div>
      </div>

      <MobileMenu
        isOpen={isOpen}
        navItems={navItems}
        isAuthenticated={isAuthenticated}
        onClose={handleCloseMenu}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={handleLogout}
        isActive={isActive}
      />

      {modalType === "login" ? <LoginDialog onClose={closeDialog} /> : null}
      {modalType === "register" ? <RegisterDialog onClose={closeDialog} /> : null}
    </header>
  )
}
