import {
  tableWrapper,
  tableClass,
  thClass,
  tdClass,
} from "../../../_components/ReservationTable/styles"

type Row = {
  id: number
  name: string
  email: string
  role: string
  createdAt: string
}

type UsersTableProps = {
  rows: Row[]
}

const roleBadgeStyle = (role: string): React.CSSProperties => ({
  display: "inline-block",
  padding: "0.1rem 0.5rem",
  borderRadius: "0.25rem",
  fontSize: "0.75rem",
  fontWeight: 600,
  background: role === "admin" ? "#7c3aed" : "#3f444e",
  color: "#fff",
})

export const UsersTable = ({ rows }: UsersTableProps) => {
  return (
    <div className={tableWrapper}>
      <table className={tableClass}>
        <thead>
          <tr>
            <th className={thClass}>ID</th>
            <th className={thClass}>Jméno</th>
            <th className={thClass}>Email</th>
            <th className={thClass}>Role</th>
            <th className={thClass}>Registrace</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className={tdClass}>{row.id}</td>
              <td className={tdClass}>{row.name}</td>
              <td className={tdClass}>{row.email}</td>
              <td className={tdClass}>
                <span style={roleBadgeStyle(row.role)}>{row.role}</span>
              </td>
              <td className={tdClass}>{row.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
