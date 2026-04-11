"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Pagination } from "@/components/Pagination"

type TablesPaginationProps = {
  currentPage: number
  totalPages: number
}

export const TablesPagination = ({ currentPage, totalPages }: TablesPaginationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())

    if (page === 1) {
      params.delete("tablesPage")
    } else {
      params.set("tablesPage", String(page))
    }

    const query = params.toString()
    router.push(query ? `?${query}` : "?")
  }

  return <Pagination currentPage={currentPage} totalPages={totalPages} onChange={handleChange} />
}
