import { chair } from "./styles"
import type { TableState } from "../types"

interface ChairProps {
  occupied: boolean
  tableState: TableState
}

export const Chair = ({ occupied, tableState }: ChairProps) => {
  return <div className={chair(occupied, tableState)} />
}