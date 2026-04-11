"use client"

import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Button } from "@/components/CTA"
import {
  filtersRow,
  filterField,
  filterLabel,
  filterInputWrapper,
  filterInputClass,
  filterSelectClass,
} from "@/components/FilterUI/styles"

type FilterFormValues = {
  date: string
  time: string
  duration: string
}

type FiltersProps = {
  initialDate: string
  initialTime: string
  initialDuration: string
}

export const Filters = ({ initialDate, initialTime, initialDuration }: FiltersProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const { register, handleSubmit } = useForm<FilterFormValues>({
    defaultValues: {
      date: initialDate,
      time: initialTime,
      duration: initialDuration,
    },
  })

  const onSubmit = (value: FilterFormValues) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (value.date) params.set("date", value.date)
      if (value.time) params.set("time", value.time)
      if (value.duration) params.set("duration", value.duration)
      
      params.delete("page")

      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }

  return (
    <div style={{ position: "relative" }}>
      {isPending && (
        <div style={{ 
          position: "absolute", inset: 0, zIndex: 10, 
          display: "flex", alignItems: "center", justifyContent: "center", 
          background: "rgba(0,0,0,0.5)", borderRadius: "8px", color: "white" 
        }}>
          Načítám dostupnost...
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className={filtersRow} style={{ opacity: isPending ? 0.6 : 1, transition: "opacity 0.2s" }}>
        <div className={filterField} style={{ flex: 1, minWidth: "150px" }}>
          <label className={filterLabel} htmlFor="date">Datum</label>
          <div className={filterInputWrapper}>
            <input 
              id="date" 
              type="date" 
              className={filterInputClass} 
              min={new Date().toISOString().split("T")[0]}
              {...register("date")} 
            />
          </div>
        </div>

        <div className={filterField} style={{ flex: 1, minWidth: "150px" }}>
          <label className={filterLabel} htmlFor="time">Čas</label>
          <div className={filterInputWrapper}>
            <input id="time" type="time" className={filterInputClass} {...register("time")} />
          </div>
        </div>

        <div className={filterField} style={{ flex: 1, minWidth: "150px" }}>
          <label className={filterLabel} htmlFor="duration">Délka</label>
          <div className={filterInputWrapper}>
            <select id="duration" className={filterSelectClass} {...register("duration")}>
              <option value="60">60 min</option>
              <option value="90">90 min</option>
              <option value="120">120 min</option>
            </select>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <Button type="submit" disabled={isPending} style={{ padding: "0.75rem 2rem", height: "auto" }}>
            {isPending ? "Hledám..." : "Filtrovaní"}
          </Button>
        </div>
      </form>
    </div>
  )
}

