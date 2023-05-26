import React from "react";
import { MdDelete } from "react-icons/md";

export default function AddMedicamentReadOnlyRow({
  Medicament,
  handleMedDeleteClick,
}) {
  return (
    <div className="ordononce-medicament">
      <div className="medicament-description">
        <h2>{Medicament.medicament}</h2>
        <h2>{Medicament.quantite} boite</h2>
        <h2>{Medicament.dose}</h2>
        <h2>{Medicament.duree}</h2>
      </div>
      <div className="action-table-med">
        <MdDelete
          className="delete-btn-icon"
          onClick={() => handleMedDeleteClick(Medicament.id)}
        />
      </div>
    </div>
  );
}
