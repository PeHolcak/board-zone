"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Pagination } from "@/components/Pagination"

type MessagesPaginationProps = {
  currentPage: number
  totalPages: number
}

export const MessagesPagination = ({ currentPage, totalPages }: MessagesPaginationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())

    if (page === 1) {
      params.delete("page")
    } else {
      params.set("page", String(page))
    }

    const query = params.toString()
    router.push(query ? `?${query}` : "?")
  }

  return <Pagination currentPage={currentPage} totalPages={totalPages} onChange={handleChange} />
}
