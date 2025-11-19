import type { Metadata } from "next"

import { getMenuData } from "./actions"
import { MenuPageClient } from "./_components/MenuPageClient"
import { menuSection } from "./styles"

export const metadata: Metadata = {
  title: "Nabídka | BoardZone",
  description: "Prohlédněte si nabídku řemeslných piv, občerstvení a deskových her v BoardZone.",
}

export default async function MenuPage() {
  const { categories, menu } = await getMenuData()

  return (
    <section className={menuSection}>
      <MenuPageClient categories={categories} menu={menu} />
    </section>
  )
}
