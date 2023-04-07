import { BsCalendar } from "react-icons/bs";

export default function MyVisteTable() {
  return (
    <table className="my-visite-table">
      <tr>
        <th className="visite-table-petit-case">
          <span>Date</span>
        </th>
        <th className="visite-table-grand-case">
          <span>Observations</span>
        </th>
      </tr>
      <tr>
        <td className="visite-table-petit-case">
          <div className="visite-calendar-case">
            <BsCalendar className="visite-table-icon-calendar" />
            <input type="date" />
          </div>
        </td>
        <td className="visite-table-grand-case">
          <textarea
            name="visite-table-observations"
            id="visite-table-observations"
          ></textarea>
        </td>
      </tr>
    </table>
  );
}
