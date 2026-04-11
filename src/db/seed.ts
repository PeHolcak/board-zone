import "dotenv/config"
import { db } from "./client"
import { tables } from "./schema"

const TABLES = [
  ...Array.from({ length: 15 }).map((_, i) => ({
    id: `S-${String(i + 1).padStart(2, "0")}`,
    label: `Stůl S-${String(i + 1).padStart(2, "0")}`,
    capacity: 2,
  })),
  ...Array.from({ length: 15 }).map((_, i) => ({
    id: `M-${String(i + 1).padStart(2, "0")}`,
    label: `Stůl M-${String(i + 1).padStart(2, "0")}`,
    capacity: 4,
  })),
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: `L-${String(i + 1).padStart(2, "0")}`,
    label: `Stůl L-${String(i + 1).padStart(2, "0")}`,
    capacity: 6,
  })),
  ...Array.from({ length: 5 }).map((_, i) => ({
    id: `XL-${String(i + 1).padStart(2, "0")}`,
    label: `Stůl XL-${String(i + 1).padStart(2, "0")}`,
    capacity: 8,
  })),
]

async function seed() {
  console.log("Zahajuji seeding stolů do databáze...")
  let inserted = 0
  for (const t of TABLES) {
    try {
      await db.insert(tables).values({
        id: t.id,
        label: t.label,
        capacity: t.capacity,
        isActive: true,
      }).onConflictDoNothing()
      inserted++
    } catch (e) {
      console.error(`Chyba při vkládání stolu ${t.id}:`, e)
    }
  }
  console.log(`Hotovo! Zpracováno ${inserted} stolů.`)
  process.exit(0)
}

seed().catch((err) => {
  console.error("Kritická chyba při seedingu:", err)
  process.exit(1)
})
