import { Chair } from "../Chair"
import { TableCardStatusDot } from "./TableCardStatusDot"
import {
  horizontalSeatsRowBottom,
  horizontalSeatsRowTop,
  middleRow,
  tableShape,
  tableShapeText,
  verticalSeatsColumn,
  visualizationArea,
  visualizationInner,
} from "./styles"
import type {
  ChairDistribution,
  SeatStates,
  TableState,
} from "../types"

type TableCardVisualisationProps = {
  distribution: ChairDistribution
  seatStates: SeatStates
  tableState: TableState
  occupiedSeats: number
  capacity: number
}

const getTableWidth = (distribution: ChairDistribution) => {
  const totalSeats =
    distribution.top +
    distribution.right +
    distribution.bottom +
    distribution.left

  const horizontalSeats = Math.max(distribution.top, distribution.bottom)

  const minWidthRem = totalSeats >= 6 ? 6 : totalSeats >= 4 ? 4 : 3

  const calculatedWidthRem =
    horizontalSeats <= 1 ? minWidthRem : horizontalSeats * 1.5 + 1

  return `${Math.max(minWidthRem, calculatedWidthRem)}rem`
}

export const TableCardVisualisation = ({
  distribution,
  seatStates,
  tableState,
  occupiedSeats,
  capacity,
}: TableCardVisualisationProps) => {
  const width = getTableWidth(distribution)

  return (
    <div className={visualizationArea}>
      <TableCardStatusDot tableState={tableState} />

      <div className={visualizationInner}>
        {distribution.top > 0 && (
          <div className={horizontalSeatsRowTop}>
            {seatStates.top.map((occupied, seatNumber) => (
              <Chair
                key={`top-seat-${String(seatNumber)}`}
                occupied={occupied}
                tableState={tableState}
              />
            ))}
          </div>
        )}

        <div className={middleRow}>
          {distribution.left > 0 && (
            <div className={verticalSeatsColumn}>
              {seatStates.left.map((occupied, seatNumber) => (
                <Chair
                  key={`left-seat-${String(seatNumber)}`}
                  occupied={occupied}
                  tableState={tableState}
                />
              ))}
            </div>
          )}

          <div className={tableShape(tableState)} style={{ width }}>
            <span className={tableShapeText(tableState)}>
              {occupiedSeats}/{capacity}
            </span>
          </div>

          {distribution.right > 0 && (
            <div className={verticalSeatsColumn}>
              {seatStates.right.map((occupied, seatNumber) => (
                <Chair
                  key={`right-seat-${String(seatNumber)}`}
                  occupied={occupied}
                  tableState={tableState}
                />
              ))}
            </div>
          )}
        </div>

        {distribution.bottom > 0 && (
          <div className={horizontalSeatsRowBottom}>
            {seatStates.bottom.map((occupied, seatNumber) => (
              <Chair
                key={`bottom-seat-${String(seatNumber)}`}
                occupied={occupied}
                tableState={tableState}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}