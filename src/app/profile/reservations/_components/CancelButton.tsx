"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import { Dialog } from "@/components/Dialog"
import { Button } from "@/components/CTA/Button"
import { cancelReservation } from "../../../reservation/actions"

export const CancelButton = ({ reservationId }: { reservationId: number }) => {
  const [isPending, startTransition] = useTransition()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleCancelClick = () => {
    setShowConfirm(true)
  }

  const handleConfirmCancel = () => {
    startTransition(async () => {
      try {
        await cancelReservation(reservationId)
        toast.success("Operace proběhla úspěšně", {
          description: "Rezervace byla úspěšně zrušena a kapacita uvolněna."
        })
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err)
        toast.error("Něco se pokazilo", {
          description: "Chyba při rušení rezervace: " + msg
        })
      } finally {
        setShowConfirm(false)
      }
    })
  }

  return (
    <>
      <Button 
        variant="ghost" 
        onClick={handleCancelClick} 
        disabled={isPending}
        style={{ padding: "0.2rem 0.5rem", fontSize: "0.8rem", height: "auto", border: "1px solid #ff4444", color: "#ff4444" }}
      >
        {isPending ? "Ruším..." : "Zrušit rezervaci"}
      </Button>

      {showConfirm && (
        <Dialog title="Zrušení rezervace" onClose={() => setShowConfirm(false)}>
          <div style={{ padding: "1rem 0" }}>
            <p style={{ marginBottom: "1.5rem" }}>Opravdu chcete zrušit tuto rezervaci? Tuto akci nelze vzít zpět.</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
              <Button variant="ghost" onClick={() => setShowConfirm(false)}>
                Zpět
              </Button>
              <Button variant="primary" style={{ background: "#ff4444" }} onClick={handleConfirmCancel} disabled={isPending}>
                Ano, zrušit
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </>
  )
}
