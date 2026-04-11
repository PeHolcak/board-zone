import type { ReactNode } from "react"
import { AdminOnly } from "@/components/AdminOnly"
import { Header } from "@/components/MenuHeader"
import { AdminTabs } from "./_components/AdminTabs"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminOnly>
      <Header
        title="Administrace"
        description="Správa systému"
      />
      <AdminTabs />
      {children}
    </AdminOnly>
  )
}
