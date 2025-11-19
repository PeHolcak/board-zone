"use client"

import { paginationButtons, paginationButton, paginationButtonActive } from "./styles"

type Props = {
  currentPage: number
  totalPages: number
  onChange: (page: number) => void
}

export const Pagination = ({ currentPage, totalPages, onChange }: Props) => {
  if (totalPages <= 1) return null

  return (
    <div className={paginationButtons}>
      {Array.from({ length: totalPages }, (_, i) => {
        const pageNumber = i + 1
        const isActive = pageNumber === currentPage

        return (
          <button
            key={pageNumber}
            type="button"
            className={isActive ? paginationButtonActive : paginationButton}
            onClick={() => onChange(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      })}
    </div>
  )
}
