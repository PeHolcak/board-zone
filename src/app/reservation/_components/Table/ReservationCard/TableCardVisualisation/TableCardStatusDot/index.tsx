
import type { TableState } from "../../types"
import { statusDot, statusDotWrapper } from "./styles"

type TableCardStatusDotProps = {
  tableState: TableState
}

export const TableCardStatusDot = ({
  tableState,
}: TableCardStatusDotProps) => {
  return (
    <div className={statusDotWrapper}>
      <span className={statusDot(tableState)} />
    </div>
  )
}