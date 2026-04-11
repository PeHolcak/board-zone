"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { tabsWrapper, tabLink, tabLinkActive } from "./styles"

const TABS = [
  { href: "/admin", label: "Zprávy" },
  { href: "/admin/reservations", label: "Rezervace" },
  { href: "/admin/tables", label: "Stoly" },
  { href: "/admin/users", label: "Uživatelé" },
]

export const AdminTabs = () => {
  const pathname = usePathname()

  return (
    <nav className={tabsWrapper}>
      {TABS.map((tab) => {
        const isActive = pathname === tab.href
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={isActive ? tabLinkActive : tabLink}
          >
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
