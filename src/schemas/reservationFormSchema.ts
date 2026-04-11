import * as z from "zod"

export const reservationSchema = z
  .object({
    reservationType: z.enum(["table", "seats"]),
    seatsToReserve: z.number().min(1),
    gameName: z.string().optional(),
    canReserveTable: z.boolean(),
  })
  .refine(
    (data) => {
      // Validate string only if the table is empty (which means it's the first reservation)
      if (data.canReserveTable) {
        return !!data.gameName && data.gameName.trim().length > 0
      }
      return true
    },
    {
      message: "Název hry je povinný pro první rezervaci stolu",
      path: ["gameName"],
    }
  )

export type ReservationValues = z.infer<typeof reservationSchema>
