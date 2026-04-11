export interface ReservationCardProps {
  tableId: string
  tableName: string
  capacity: number
  occupiedSeats: number
  isJoinable?: boolean
  gameName?: string
  isAuthenticated?: boolean
  isAdminMode?: boolean
  reservationDateTime: Date
  reservationDuration: number
}

export type TableState = "empty" | "joinable" | "closed"

export interface ChairDistribution {
  top: number
  bottom: number
  left: number
  right: number
}

export interface SeatStates {
  top: boolean[]
  bottom: boolean[]
  left: boolean[]
  right: boolean[]
}