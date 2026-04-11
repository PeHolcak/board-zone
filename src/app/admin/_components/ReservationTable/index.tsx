import { tableWrapper, tableClass, thClass, tdClass } from "./styles"
import { CancelButton } from "@/app/profile/reservations/_components/CancelButton"

type Row = {
  id: number
  name: string
  email: string
  tableLabel: string
  reservationTime: string
}

type ReservationTableProps = {
  rows: Row[]
}

export const ReservationTable = ({ rows }: ReservationTableProps) => {
  return (
    <div className={tableWrapper}>
      <table className={tableClass}>
        <thead>
          <tr>
            <th className={thClass}>ID</th>
            <th className={thClass}>Jméno</th>
            <th className={thClass}>Email</th>
            <th className={thClass}>Stůl</th>
            <th className={thClass}>Čas</th>
            <th className={thClass}>Akce</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={6} className={tdClass} style={{ textAlign: "center", padding: "1rem" }}>
                Žádné rezervace na nejbližší hodinu
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id}>
                <td className={tdClass}>{row.id}</td>
                <td className={tdClass}>{row.name}</td>
                <td className={tdClass}>{row.email}</td>
                <td className={tdClass}>{row.tableLabel}</td>
                <td className={tdClass}>{row.reservationTime}</td>
                <td className={tdClass}>
                  <CancelButton reservationId={row.id} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
