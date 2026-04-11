"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { toast } from "sonner"

import { Dialog } from "@/components/Dialog"
import { Button } from "@/components/CTA"
import { tableSchema, type TableValues } from "@/schemas/tablesFormSchema"
import { createTable } from "../actions"

export const AddTableModal = ({ onClose }: { onClose: () => void }) => {
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TableValues>({
    resolver: zodResolver(tableSchema),
    defaultValues: {
      id: "",
      label: "",
      capacity: 1,
    },
  })

  const onSubmit = (data: TableValues) => {
    startTransition(async () => {
      try {
        await createTable(data)
        toast.success("Stůl byl úspěšně přidán", {
          description: `Vytvořen nový stůl ${data.id} (${data.label}).`
        })
        reset()
        onClose()
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err)
        toast.error("Vytvoření se nezdařilo", {
          description: msg
        })
      }
    })
  }

  const wrapperStyle = { display: "flex", flexDirection: "column" as const, gap: "0.5rem" }
  const inputStyle = {
    padding: "0.5rem",
    borderRadius: "0.25rem",
    border: "1px solid #3f444e",
    background: "var(--colors-card)",
    color: "white",
    width: "100%",
  }
  const errorStyle = { color: "#ff4444", fontSize: "0.8rem", marginTop: "0.2rem" }

  return (
    <Dialog title="Přidat nový stůl" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }} noValidate>
        
        <div style={wrapperStyle}>
          <label htmlFor="id" style={{ fontSize: "0.9rem", fontWeight: 500 }}>ID Stolu</label>
          <input
            id="id"
            type="text"
            placeholder="např. XL-1"
            {...register("id")}
            style={{ ...inputStyle, borderColor: errors.id ? "#ff4444" : "#3f444e" }}
          />
          {errors.id && <span style={errorStyle}>{errors.id.message}</span>}
        </div>

        <div style={wrapperStyle}>
          <label htmlFor="label" style={{ fontSize: "0.9rem", fontWeight: 500 }}>Celé jméno</label>
          <input
            id="label"
            type="text"
            placeholder="např. Extra velký stůl 1"
            {...register("label")}
            style={{ ...inputStyle, borderColor: errors.label ? "#ff4444" : "#3f444e" }}
          />
          {errors.label && <span style={errorStyle}>{errors.label.message}</span>}
        </div>

        <div style={wrapperStyle}>
          <label htmlFor="capacity" style={{ fontSize: "0.9rem", fontWeight: 500 }}>Kapacita (počet míst)</label>
          <input
            id="capacity"
            type="number"
            min={1}
            max={10}
            {...register("capacity", { valueAsNumber: true })}
            style={{ ...inputStyle, borderColor: errors.capacity ? "#ff4444" : "#3f444e" }}
          />
          {errors.capacity && <span style={errorStyle}>{errors.capacity.message}</span>}
        </div>

        <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
          <Button type="button" variant="ghost" onClick={onClose}>
            Zrušit
          </Button>
          <Button type="submit" variant="primary" disabled={isPending || isSubmitting}>
            {isPending ? "Ukládám..." : "Vytvořit stůl"}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
