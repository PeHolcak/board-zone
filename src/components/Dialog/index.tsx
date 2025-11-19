"use client"

import { PropsWithChildren, ReactNode } from "react"

import { overlay, dialog, dialogHeader, closeButton, titleClass } from "./styles"

type DialogProps = PropsWithChildren<{
  onClose?: () => void
  title: string
  children: ReactNode
}>

export const Dialog = ({ onClose, title, children }: DialogProps) => {
  return (
    <div className={overlay}>
      <div className={dialog}>
        <header className={dialogHeader}>
          <h2 className={titleClass}>{title}</h2>
          <button type="button" onClick={onClose} className={closeButton} aria-label="Zavřít">
            ×
          </button>
        </header>

        {children}
      </div>
    </div>
  )
}
