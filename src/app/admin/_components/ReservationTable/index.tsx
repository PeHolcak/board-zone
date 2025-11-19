import { tableWrapper, tableClass, thClass, tdClass, captionClass } from "./styles"

type Row = {
  id: number
  name: string
  email: string
  role: string
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
            <th className={thClass}>Role</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className={tdClass}>{row.id}</td>
              <td className={tdClass}>{row.name}</td>
              <td className={tdClass}>{row.email}</td>
              <td className={tdClass}>{row.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
