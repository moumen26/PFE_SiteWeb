import React from "react";
import VoirButton from "../buttons/buttonVoir";

export default function TableAntecedentReadOnlyRow({ Antecedent }) {
  return (
    <tr className="table-concultation-ligne">
      <td className="table-concultation-td-nom">{Antecedent.Nom_Maladie}</td>
      <td className="table-concultation-td-date">{Antecedent.Date}</td>
      <td className="table-concultation-td-time">{Antecedent.Time}</td>
      <td className="table-concultation-td-button">
        <VoirButton />
      </td>
    </tr>
  );
}
