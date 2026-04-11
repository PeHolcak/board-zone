import type {
  ChairDistribution,
  SeatStates,
  TableState,
} from "./types"

export const getSafeCapacity = (capacity: number) =>
  Math.min(Math.max(capacity, 1), 10)

export const getSafeOccupiedSeats = (occupiedSeats: number, capacity: number) =>
  Math.min(Math.max(occupiedSeats, 0), capacity)

export const getChairDistribution = (capacity: number): ChairDistribution => {
  const cap = getSafeCapacity(capacity)

  if (cap === 1) return { top: 0, bottom: 1, left: 0, right: 0 }
  if (cap === 2) return { top: 1, bottom: 1, left: 0, right: 0 }
  if (cap === 3) return { top: 1, bottom: 1, left: 1, right: 0 }
  if (cap === 4) return { top: 2, bottom: 2, left: 0, right: 0 }
  if (cap === 5) return { top: 2, bottom: 2, left: 1, right: 0 }
  if (cap === 6) return { top: 2, bottom: 2, left: 1, right: 1 }
  if (cap === 7) return { top: 3, bottom: 2, left: 1, right: 1 }
  if (cap === 8) return { top: 3, bottom: 3, left: 1, right: 1 }
  if (cap === 9) return { top: 4, bottom: 3, left: 1, right: 1 }

  return { top: 4, bottom: 4, left: 1, right: 1 }
}

export const getTableState = (
  occupiedSeats: number,
  capacity: number,
  isJoinable: boolean
): TableState => {
  const isEmpty = occupiedSeats === 0
  const isFullyOccupied = occupiedSeats === capacity

  if (isEmpty) return "empty"
  if (isFullyOccupied || !isJoinable) return "closed"

  return "joinable"
}

export const getTableWidth = (distribution: ChairDistribution) => {
  const maxTopBottom = Math.max(distribution.top, distribution.bottom, 1)

  const widths: Record<number, string> = {
    1: "4rem",
    2: "6rem",
    3: "8rem",
    4: "10rem",
  }

  return widths[maxTopBottom] || "10rem"
}

const createSeatRow = (count: number, occupiedRef: { current: number }) =>
  Array.from({ length: count }, () => {
    if (occupiedRef.current > 0) {
      occupiedRef.current -= 1
      return true
    }

    return false
  })

export const getSeatStates = (
  distribution: ChairDistribution,
  occupiedSeats: number
): SeatStates => {
  const occupiedRef = { current: occupiedSeats }

  return {
    bottom: createSeatRow(distribution.bottom, occupiedRef),
    top: createSeatRow(distribution.top, occupiedRef),
    left: createSeatRow(distribution.left, occupiedRef),
    right: createSeatRow(distribution.right, occupiedRef),
  }
}