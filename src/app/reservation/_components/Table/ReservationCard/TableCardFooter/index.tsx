"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { reservationSchema, type ReservationValues } from "@/schemas/reservationFormSchema"
import { executeRecaptcha } from "@/lib/recaptcha-client"
import type { TableState } from "../types"
import { Button } from "@/components/CTA/Button"
import { Dialog } from "@/components/Dialog"
import { submitReservation } from "../../../../actions"

type TableCardFooterProps = {
  tableId: string
  tableName?: string
  tableState: TableState
  capacity: number
  occupiedSeats: number
  isAuthenticated: boolean
  reservationDateTime: Date
  reservationDuration: number
  isAdminMode?: boolean
}

export const TableCardFooter = ({
  tableId,
  tableName,
  tableState,
  capacity,
  occupiedSeats,
  isAuthenticated,
  reservationDateTime,
  reservationDuration,
  isAdminMode = false,
}: TableCardFooterProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [isPending, startTransition] = useTransition()

  const availableSeats = capacity - occupiedSeats
  const canReserveTable = tableState === "empty"
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReservationValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      reservationType: canReserveTable ? "table" : "seats",
      seatsToReserve: 1,
      gameName: "",
      canReserveTable,
    },
  })

  const watchReservationType = watch("reservationType")

  const handleOpenModal = () => {
    reset({
      reservationType: canReserveTable ? "table" : "seats",
      seatsToReserve: 1,
      gameName: "",
      canReserveTable,
    })
    setIsModalOpen(true)
  }

  const onSubmit = (data: ReservationValues) => {
    startTransition(async () => {
      try {
          const recaptchaToken = await executeRecaptcha("submit_reservation")

          await submitReservation({
            tableId,
            type: data.reservationType,
            seats: data.reservationType === "table" ? capacity : data.seatsToReserve,
            reservationDateTime,
            reservationDuration,
            gameName: canReserveTable && data.gameName ? data.gameName : undefined,
            recaptchaToken,
          })
        toast.success("Operace proběhla úspěšně", {
          description: "Rezervace byla úspěšně vytvořena! Stůl na vás čeká."
        })
        setIsModalOpen(false)
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err)
        toast.error("Něco se pokazilo", {
          description: "Připojení selhalo: " + msg
        })
      }
    })
  }

  const handleDeleteTable = () => {
    startTransition(async () => {
      try {
        const { deleteTable } = await import("@/app/admin/tables/actions")
        await deleteTable(tableId)
        
        toast.success("Stůl smazán", {
          description: `Stůl ${tableId} byl trvale odstraněn.`
        })
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err)
        toast.error("Chyba při mazání", {
          description: msg
        })
      } finally {
        setShowDeleteConfirm(false)
      }
    })
  }

  const handleEditTable = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const label = formData.get("label") as string
    const cap = parseInt(formData.get("capacity") as string, 10)

    startTransition(async () => {
      try {
        const { updateTable } = await import("@/app/admin/tables/actions")
        await updateTable(tableId, { label, capacity: cap })
        toast.success("Stůl upraven", {
          description: `Základní údaje pro stůl ${tableId} byly upraveny.`
        })
        setShowEditModal(false)
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err)
        toast.error("Chyba při úpravě", { description: msg })
      }
    })
  }

  return (
    <>
      {!isAdminMode && isAuthenticated && tableState !== "closed" && (
        <Button variant="primary" onClick={handleOpenModal} style={{ padding: "0.2rem 0.6rem", fontSize: "0.75rem", height: "auto" }}>
          Rezervovat
        </Button>
      )}

      {isAdminMode && (
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
          <Button 
            variant="primary" 
            onClick={() => setShowEditModal(true)} 
            style={{ padding: "0.2rem 0.6rem", fontSize: "0.75rem", height: "auto" }}
          >
            Upravit stůl
          </Button>
          <Button 
            variant="primary" 
            onClick={() => setShowDeleteConfirm(true)} 
            style={{ padding: "0.2rem 0.6rem", fontSize: "0.75rem", height: "auto", background: "#ff4444", borderColor: "#ff4444" }}
          >
            Smazat
          </Button>
        </div>
      )}

      {showEditModal && (
        <Dialog title="Upravit stůl" onClose={() => setShowEditModal(false)}>
          <form onSubmit={handleEditTable} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label htmlFor={`edit-label-${tableId}`} style={{ fontSize: "0.9rem" }}>Název stolu</label>
              <input
                id={`edit-label-${tableId}`}
                name="label"
                type="text"
                defaultValue={tableName}
                required
                style={{
                  padding: "0.5rem", borderRadius: "0.25rem", border: "1px solid #3f444e",
                  background: "var(--colors-card)", color: "white", width: "100%",
                }}
              />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label htmlFor={`edit-capacity-${tableId}`} style={{ fontSize: "0.9rem" }}>Kapacita míst</label>
              <input
                id={`edit-capacity-${tableId}`}
                name="capacity"
                type="number"
                min="1"
                max="10"
                defaultValue={capacity}
                required
                style={{
                  padding: "0.5rem", borderRadius: "0.25rem", border: "1px solid #3f444e",
                  background: "var(--colors-card)", color: "white", width: "100%",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end", marginTop: "1rem" }}>
              <Button type="button" variant="ghost" onClick={() => setShowEditModal(false)}>
                Zrušit
              </Button>
              <Button type="submit" variant="primary" disabled={isPending}>
                {isPending ? "Ukládám..." : "Uložit"}
              </Button>
            </div>
          </form>
        </Dialog>
      )}

      {showDeleteConfirm && (
        <Dialog title="Smazání stolu" onClose={() => setShowDeleteConfirm(false)}>
          <div style={{ padding: "1rem 0" }}>
            <p style={{ marginBottom: "1.5rem" }}>
              Opravdu chcete stůl <strong>{tableId}</strong> odstranit? Tato akce je nevratná.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
              <Button variant="ghost" onClick={() => setShowDeleteConfirm(false)}>
                Zrušit
              </Button>
              <Button variant="primary" style={{ background: "#ff4444" }} onClick={handleDeleteTable} disabled={isPending}>
                {isPending ? "Mažu..." : "Ano, smazat"}
              </Button>
            </div>
          </div>
        </Dialog>
      )}

      {isModalOpen && !isAdminMode && (
        <Dialog title="Rezervace stolu" onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }} noValidate>
            
            {canReserveTable && (
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                <input 
                  type="radio" 
                  value="table"
                  {...register("reservationType")}
                  style={{ accentColor: "var(--colors-primary)" }}
                />
                Celý stůl ({capacity} míst)
              </label>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                <input 
                  type="radio" 
                  value="seats"
                  {...register("reservationType")}
                  style={{ accentColor: "var(--colors-primary)" }}
                />
                Vybraný počet míst
              </label>

              {canReserveTable && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" }}>
                  <label htmlFor={`gameName-${tableId}`} style={{ fontSize: "0.9rem" }}>Název hry (povinné pro první rezervaci)</label>
                  <input
                    id={`gameName-${tableId}`}
                    type="text"
                    {...register("gameName")}
                    placeholder="Např. Catan, Duna, ..."
                    style={{
                      padding: "0.5rem",
                      borderRadius: "0.25rem",
                      border: "1px solid #3f444e",
                      background: "var(--colors-card)",
                      color: "white",
                      width: "100%",
                      borderColor: errors.gameName ? "#ff4444" : "#3f444e"
                    }}
                  />
                  {errors.gameName && <span style={{ color: "#ff4444", fontSize: "0.8rem" }}>{errors.gameName.message}</span>}
                </div>
              )}
              
              {watchReservationType === "seats" && (
                <div style={{ paddingLeft: "1.7rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>Počet míst:</span>
                  <select 
                    {...register("seatsToReserve", { valueAsNumber: true })}
                    style={{ 
                      padding: "0.3rem", 
                      borderRadius: "0.25rem", 
                      border: "1px solid #3f444e", 
                      background: "var(--colors-card)", 
                      color: "white" 
                    }}
                  >
                    {Array.from({ length: availableSeats }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <Button type="submit" variant="primary" fullWidth style={{ marginTop: "1rem" }} disabled={isPending}>
              {isPending ? "Zpracovávám..." : "Potvrdit rezervaci"}
            </Button>
          </form>
        </Dialog>
      )}
    </>
  )
}