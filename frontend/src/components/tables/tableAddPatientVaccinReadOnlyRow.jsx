import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ReadOnlyRow = ({ VaccinData, handleEditRowClick, handleDeleteClick }) => {
  
  return (
    <tr>
      <td className="vaccination-table-title-line2">
        <span>{VaccinData?.Age_vaccination}</span>
      </td>
      <td>
        <span>{VaccinData?.Nom_vaccin}</span>
      </td>
      <td>
        <span>{VaccinData?.Contre_vaccin}</span>
      </td>
      <td>
        <span>{VaccinData?.Technique_vaccinale}</span>
      </td>
      <td>
        <span>{VaccinData?.Numero_lot}</span>
      </td>
      <td>
        <span>{VaccinData?.Date_vaccination}</span>
      </td>
      <td>
        <div className="action-table">
          <button onClick={(event) => handleEditRowClick(event, VaccinData)}>
            Edit
          </button>
          <button onClick={(event) => handleDeleteClick(event, VaccinData?._id)}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
