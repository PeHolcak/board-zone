"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useTransition, useState } from "react"
import { FilterForm, FilterInput } from "@/components/FilterUI"

export const ReservationsFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [email, setEmail] = useState(searchParams.get("email") ?? "")
  const [table, setTable] = useState(searchParams.get("table") ?? "")
  const [date, setDate] = useState(searchParams.get("date") ?? "")
  
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const params = new URLSearchParams(searchParams.toString())
    
    if (email.trim()) params.set("email", email.trim())
    else params.delete("email")
    
    if (table.trim()) params.set("table", table.trim())
    else params.delete("table")
    
    if (date) params.set("date", date)
    else params.delete("date")

    // Reset pagination when filtering
    params.delete("resPage")

    const query = params.toString()
    startTransition(() => {
      router.push(query ? `?${query}` : "?")
    })
  }

  return (
    <FilterForm onSubmit={handleSubmit} isPending={isPending}>
      <FilterInput
        id="filter-email"
        label="Email uživatele"
        type="text"
        placeholder="např. jan@novak.cz"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <FilterInput
        id="filter-table"
        label="Název stolu"
        type="text"
        placeholder="např. Stůl 1"
        value={table}
        onChange={(e) => setTable(e.target.value)}
      />

      <FilterInput
        id="filter-date"
        label="Datum"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
    </FilterForm>
  )
}
