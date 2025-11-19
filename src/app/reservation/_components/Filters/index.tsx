import {
  filtersRow,
  filterField,
  filterLabel,
  filterInputWrapper,
  filterInput,
  filterSelect,
} from "./styles"

export const Filters = () => {
  return (
    <div className={filtersRow}>
      <div className={filterField}>
        <label className={filterLabel} htmlFor="date">
          Datum
        </label>
        <div className={filterInputWrapper}>
          <input id="date" type="date" className={filterInput} />
        </div>
      </div>

      <div className={filterField}>
        <label className={filterLabel} htmlFor="time">
          Čas
        </label>
        <div className={filterInputWrapper}>
          <input id="time" type="time" className={filterInput} />
        </div>
      </div>

      <div className={filterField}>
        <label className={filterLabel} htmlFor="duration">
          Délka
        </label>
        <div className={filterInputWrapper}>
          <select id="duration" className={filterSelect} defaultValue="60">
            <option value="60">60 min</option>
            <option value="90">90 min</option>
            <option value="120">120 min</option>
          </select>
        </div>
      </div>
    </div>
  )
}
