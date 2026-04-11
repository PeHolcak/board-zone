"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Button } from "@/components/CTA/Button"

export const Pagination = ({ currentPage, totalPages, paramName }: { currentPage: number, totalPages: number, paramName: string }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  if (totalPages <= 1) return null

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(paramName, page.toString())
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center", justifyContent: "center", marginTop: "1rem" }}>
      <Button 
        variant="ghost"
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage <= 1}
        style={{ padding: "0.2rem 0.6rem" }}
      >
        &larr; Předchozí
      </Button>
      
      <span style={{ fontSize: "0.9rem", color: "var(--colors-text-muted)" }}>
        Stránka {currentPage} z {totalPages}
      </span>
      
      <Button 
        variant="ghost"
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        style={{ padding: "0.2rem 0.6rem" }}
      >
        Další &rarr;
      </Button>
    </div>
  )
}
