"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useTransition, useState } from "react"
import { FilterForm, FilterInput } from "@/components/FilterUI"

export const UsersFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get("search") ?? ""
  
  const [search, setSearch] = useState(initialSearch)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const params = new URLSearchParams(searchParams.toString())
    
    if (search.trim()) {
      params.set("search", search.trim())
      params.delete("usersPage")
    } else {
      params.delete("search")
    }

    const query = params.toString()
    startTransition(() => {
      router.push(query ? `?${query}` : "?")
    })
  }

  return (
    <FilterForm onSubmit={handleSubmit} isPending={isPending}>
      <FilterInput
        id="filter-users-search"
        type="text"
        placeholder="Podle jména nebo emailu..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </FilterForm>
  )
}

