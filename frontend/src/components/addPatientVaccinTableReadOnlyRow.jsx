import React from "react";

const ReadOnlyRow = ({ Vaccin, handleEditRowClick, handleDeleteClick }) => {
  return (
    <tr>
      <td className="vaccination-table-title-line2">
        <span>{Vaccin.vaccinationAge}</span>
      </td>
      <td>
        <span>{Vaccin.vaccinationVaccin}</span>
      </td>
      <td>
        <span>{Vaccin.vaccinationContre}</span>
      </td>
      <td>
        <span>{Vaccin.vaccinationTechnique}</span>
      </td>
      <td>
        <span>{Vaccin.vaccinationNumero}</span>
      </td>
      <td>
        <span>{Vaccin.vaccinationDate}</span>
      </td>
      <td>
        <div className="action-table">
          <button onClick={(event) => handleEditRowClick(event, Vaccin)}>
            Edit
          </button>
          <button onClick={() => handleDeleteClick(Vaccin.id)}>Delete</button>
        </div>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
