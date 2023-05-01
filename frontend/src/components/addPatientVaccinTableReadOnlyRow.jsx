import React from "react";

const ReadOnlyRow = ({ Vaccin, handleEditRowClick }) => {
  return (
    <tr>
      <td className="vaccination-table-title-line2">
        <span>{Vaccin.Age}</span>
      </td>
      <td>
        <span>{Vaccin.Vaccin}</span>
      </td>
      <td>
        <span>{Vaccin.Contre}</span>
      </td>
      <td>
        <span>{Vaccin.Technique}</span>
      </td>
      <td>
        <span>{Vaccin.Numero}</span>
      </td>
      <td>
        <span>{Vaccin.Date}</span>
      </td>
      <td>
        <div className="action-table">
          <button onClick={(event) => handleEditRowClick(event, Vaccin)}>
            Edit
          </button>
          <button>Delete</button>
        </div>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
