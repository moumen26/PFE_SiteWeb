import React from "react";
import { MdDelete } from "react-icons/md";

export default function AddMedicamentReadOnlyRow({
  Medicament,
  handleMedDeleteClick,
}) {
  return (
    <div className="ordononce-medicament">
      <div className="medicament-description">
        <h2>{Medicament?.NomMedicament}</h2>
        <h2>{Medicament?.QuantiteMedicament} boite</h2>
        <h2>{Medicament?.DoseMedicament}</h2>
        <h2>{Medicament?.DureeMedicament}</h2>
      </div>
      <div className="action-table-med">
        <MdDelete
          className="delete-btn-icon"
          onClick={() => handleMedDeleteClick(Medicament?._id)}
        />
      </div>
    </div>
  );
}
