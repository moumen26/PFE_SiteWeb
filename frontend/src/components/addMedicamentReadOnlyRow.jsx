import React from "react";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

export default function AddMedicamentReadOnlyRow({
  Medicament,
  handleMedDeleteClick,
}) {
  return (
    <div className="ordononce-medicament">
      <div className="medicament-description">
        <h2>{Medicament.Nom_med}</h2>
        <h2>{Medicament.Quantite_med}</h2>
        <h2>{Medicament.Dose_med}</h2>
        <h2>{Medicament.Duree_med}</h2>
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
