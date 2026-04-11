import { Locked1Bulk, Unlocked2Bulk } from "@lineiconshq/free-icons"
import { Lineicons } from "@lineiconshq/react-lineicons"

import type { TableState } from "../types"
import { headerRow, stateBadge, tableName } from "./styles"

interface TableCardHeaderProps {
  tableNameText: string
  tableState: TableState
  isAdminMode?: boolean
}

export const TableCardHeader = ({
  tableNameText,
  tableState,
  isAdminMode = false,
}: TableCardHeaderProps) => {
  return (
    <div className={headerRow}>
      <h3 className={tableName}>{tableNameText}</h3>

      {!isAdminMode && (
        <div className={stateBadge(tableState)}>
          {tableState === "empty" ? (
            "Volno"
          ) : tableState === "closed" ? (
            <>
              <Lineicons icon={Locked1Bulk} size={20} />
              Uzavřeno
            </>
          ) : (
            <>
              <Lineicons icon={Unlocked2Bulk} size={20} />
              Volná místa
            </>
          )}
        </div>
      )}
    </div>
  )
}