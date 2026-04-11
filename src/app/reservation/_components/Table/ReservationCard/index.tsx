import { TableCardCapacityInfo } from "./TableCardCapacityInfo"
import { TableCardFooter } from "./TableCardFooter"
import { TableCardGameInfo } from "./TableCardGameInfo"
import { TableCardHeader } from "./TableCardHeader"
import { TableCardVisualisation } from "./TableCardVisualisation"
import { infoArea, tableCard } from "./styles"
import type { ReservationCardProps } from "./types"
import {
  getChairDistribution,
  getSafeCapacity,
  getSafeOccupiedSeats,
  getSeatStates,
  getTableState,
} from "./utils"

export const ReservationCard = ({
  tableId,
  tableName,
  capacity,
  occupiedSeats,
  isJoinable = true,
  gameName,
  isAuthenticated = false,
  reservationDateTime,
  reservationDuration,
  isAdminMode = false,
}: ReservationCardProps) => {
  const safeCapacity = getSafeCapacity(capacity)
  const safeOccupiedSeats = getSafeOccupiedSeats(occupiedSeats, safeCapacity)

  const distribution = getChairDistribution(safeCapacity)
  const seatStates = getSeatStates(distribution, safeOccupiedSeats)
  const tableState = getTableState(
    safeOccupiedSeats,
    safeCapacity,
    isJoinable
  )

  return (
    <div className={tableCard}>
      <TableCardVisualisation
        distribution={distribution}
        seatStates={seatStates}
        tableState={tableState}
        occupiedSeats={safeOccupiedSeats}
        capacity={safeCapacity}
      />

      <div className={infoArea}>
        <TableCardHeader tableNameText={tableName} tableState={tableState} isAdminMode={isAdminMode} />
        <TableCardGameInfo gameNameText={gameName} />
        <TableCardCapacityInfo
          occupiedSeats={safeOccupiedSeats}
          capacity={safeCapacity}
          tableState={tableState}
        />
        <TableCardFooter 
          tableId={tableId}
          tableName={tableName}
          tableState={tableState} 
          capacity={safeCapacity} 
          occupiedSeats={safeOccupiedSeats} 
          isAuthenticated={isAuthenticated}
          reservationDateTime={reservationDateTime}
          reservationDuration={reservationDuration}
          isAdminMode={isAdminMode}
        />
      </div>
    </div>
  )
}