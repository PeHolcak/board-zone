import "dotenv/config"
import { db } from "./client"
import { reservations } from "./schema"

async function check() {
  const all = await db.select().from(reservations)
  console.log("ALL RESERVATIONS IN DB:", JSON.stringify(all, null, 2))
  process.exit(0)
}

check()
