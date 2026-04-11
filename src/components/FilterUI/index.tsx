import type { ReactNode } from "react"
import React from "react"
import { Button } from "@/components/CTA"
import {
  filtersRow,
  filterField,
  filterLabel,
  filterInputWrapper,
  filterInputClass,
} from "./styles"

export const FilterForm = ({ 
  onSubmit, 
  isPending, 
  children 
}: { 
  onSubmit: (e: React.FormEvent) => void
  isPending: boolean
  children: ReactNode 
}) => {
  return (
    <div style={{ position: "relative", marginBottom: "2rem" }}>
      {isPending && (
        <div style={{ 
          position: "absolute", inset: 0, zIndex: 10, 
          display: "flex", alignItems: "center", justifyContent: "center", 
          background: "rgba(0,0,0,0.5)", borderRadius: "8px", color: "white" 
        }}>
          Hledám...
        </div>
      )}
      <form 
        onSubmit={onSubmit} 
        className={filtersRow} 
        style={{ opacity: isPending ? 0.6 : 1, transition: "opacity 0.2s" }}
      >
        {children}
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <Button type="submit" disabled={isPending} style={{ padding: "0.75rem 2rem", height: "auto" }}>
            {isPending ? "Hledám..." : "Filtrovat"}
          </Button>
        </div>
      </form>
    </div>
  )
}

type FilterInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  id: string
}

export const FilterInput = ({ label, id, ...props }: FilterInputProps) => {
  return (
    <div className={filterField} style={{ flex: 1, minWidth: "150px" }}>
      {label && <label htmlFor={id} className={filterLabel}>{label}</label>}
      <div className={filterInputWrapper}>
        <input
          id={id}
          className={filterInputClass}
          {...props}
        />
      </div>
    </div>
  )
}
