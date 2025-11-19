import { hoursTable } from "./styles"

export const OpeningHoursTable = () => {
  return (
    <table className={hoursTable}>
      <tbody>
        <tr>
          <th scope="row">Po–Čt</th>
          <td>16:00–23:00</td>
        </tr>
        <tr>
          <th scope="row">Pá–So</th>
          <td>14:00–01:00</td>
        </tr>
        <tr>
          <th scope="row">Ne</th>
          <td>14:00–22:00</td>
        </tr>
      </tbody>
    </table>
  )
}
