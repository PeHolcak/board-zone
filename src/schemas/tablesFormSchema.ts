import * as z from "zod"

export const tableSchema = z.object({
  id: z.string().min(1, "Identifikátor nesmí být prázdný (př. S-10)"),
  label: z.string().min(1, "Název stolu je povinný"),
  capacity: z.number().int().min(1, "Kapacita musí být alespoň 1").max(10, "Maximální kapacita je 10 míst"),
})

export type TableValues = z.infer<typeof tableSchema>
