import { hoursWrapper, hoursTitle, hoursList, hoursItem } from "./styles"

const HOURS = [
  { label: "Po–Čt", value: "16:00–23:00" },
  { label: "Pá–So", value: "14:00–01:00" },
  { label: "Ne", value: "14:00–22:00" },
]

export const HoursSection = () => {
  return (
    <div className={hoursWrapper}>
      <h3 className={hoursTitle}>Otevírací doba</h3>
      <ul className={hoursList}>
        {HOURS.map(({ label, value }) => (
          <li key={label} className={hoursItem}>
            <span>{label}</span>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
