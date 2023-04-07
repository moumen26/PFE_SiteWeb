export default function MyVaccinationTable() {
  return (
    <table className="vaccination-table">
      <tr>
        <th>
          <span>Age</span>
        </th>
        <th>
          <span>Vaccin</span>
        </th>
        <th>
          <span>Contre</span>
        </th>
        <th>
          <span>
            Technique
            <br />
            vaccinale
          </span>
        </th>
        <th>
          <span>
            Numero du
            <br />
            lot
          </span>
        </th>
        <th>
          <span>Date</span>
        </th>
      </tr>
      <tr>
        <td className="vaccination-table-title-line2">
          <span>
            A la
            <br />
            naissance
          </span>
        </td>
        <td>
          <select
            className="vaccination-select"
            name="vaccination-vaccin"
            id="vaccination-vaccin"
          >
            <option value="">vaccin</option>
            <option value="">vaccin2</option>
            <option value="">vaccin3</option>
            <option value="">vaccin4</option>
          </select>
        </td>
        <td>
          <select
            className="vaccination-select"
            name="vaccination-contre"
            id="vaccination-contre"
          >
            <option value="">contre</option>
            <option value="">contre2</option>
            <option value="">contre3</option>
            <option value="">contre4</option>
          </select>
        </td>
        <td>
          <select
            className="vaccination-select"
            name="vaccination-technique"
            id="vaccination-technique"
          >
            <option value="">technique</option>
            <option value="">technique2</option>
            <option value="">technique3</option>
            <option value="">technique4</option>
          </select>
        </td>
        <td>
          <select
            className="vaccination-select"
            name="vaccination-numero"
            id="vaccination-numero"
          >
            <option value="">numero</option>
            <option value="">numero2</option>
            <option value="">numero3</option>
            <option value="">numero4</option>
          </select>
        </td>
        <td>
          <input type="date" />
        </td>
      </tr>
    </table>
  );
}
