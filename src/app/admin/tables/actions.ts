"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { db } from "@/db/client"
import { tables, reservations } from "@/db/schema"

import { tableSchema, type TableValues } from "@/schemas/tablesFormSchema"

export async function createTable(data: TableValues) {
  // Validate input parameters
  tableSchema.parse(data) // Throws Zod error if failed

  // Check if ID is somehow duplicate
  const existingTable = await db.query.tables.findFirst({
    where: eq(tables.id, data.id),
  })

  if (existingTable) {
    throw new Error(`Stůl s ID '${data.id}' již v systému existuje. Zvolte unikátní ID.`)
  }

  // Insert into DB
  await db.insert(tables).values({
    id: data.id,
    label: data.label,
    capacity: data.capacity,
    isActive: true,
  })

  revalidatePath("/admin/tables")
}

export async function deleteTable(tableId: string) {
  if (!tableId) throw new Error("Chybějící ID stolu.")

  // Safeguard: Check if the table has existing active reservations
  const linkedReservations = await db.query.reservations.findMany({
    where: eq(reservations.tableId, tableId),
  })

  // We consider all linked reservations a blocker so we don't accidentally trash booking history
  // If we only wanted to block active ones: linkedReservations.filter(r => r.status === "active")
  if (linkedReservations.length > 0) {
    throw new Error(`Nemůžete smazat stůl, na kterém v databázi evidujeme (${linkedReservations.length}) historických či aktivních rezervací. Nejprve je musíte přehodit jinam nebo zrušit.`)
  }

  await db.delete(tables).where(eq(tables.id, tableId))
  
  // Hard reload the layout to invalidate any cached list of tables anywhere in the App
  revalidatePath("/", "layout")
}

export async function toggleTableStatus(tableId: string, currentStatus: boolean) {
  if (!tableId) throw new Error("Chybějící ID stolu.")

  await db.update(tables)
    .set({ isActive: !currentStatus })
    .where(eq(tables.id, tableId))

  revalidatePath("/", "layout")
}

export async function updateTable(originalId: string, data: Omit<TableValues, "id">) {
  if (!originalId) throw new Error("Chybějící původní ID stolu.")

  // Validate the non-ID fields using a partial schema
  const updateSchema = tableSchema.omit({ id: true })
  updateSchema.parse(data)

  await db.update(tables)
    .set({
      label: data.label,
      capacity: data.capacity,
    })
    .where(eq(tables.id, originalId))

  revalidatePath("/", "layout")
}
