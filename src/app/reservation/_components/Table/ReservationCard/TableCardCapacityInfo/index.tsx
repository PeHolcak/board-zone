import { Lineicons } from "@lineiconshq/react-lineicons"
import { User4Bulk } from "@lineiconshq/free-icons"
import { capacityText, capacityValue, inlineInfoRow } from "./styles"
import type { TableState } from "../types"

interface TableCardCapacityInfoProps {
  occupiedSeats: number
  capacity: number
  tableState: TableState
}

export const TableCardCapacityInfo = ({
  occupiedSeats,
  capacity,
  tableState,
}: TableCardCapacityInfoProps) => {
  return (
    <div className={inlineInfoRow}>
      <p className={capacityText}>
        Kapacita:{" "}
        <span className={capacityValue(tableState)}>{occupiedSeats}</span> /{" "}
        {capacity} osob
      </p>
    </div>
  )
}