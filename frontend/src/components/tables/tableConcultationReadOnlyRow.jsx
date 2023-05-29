import React from 'react'
import VoirButton from "../buttons/buttonVoir";


export default function TableConcultationReadOnlyRow({ Concultation }) {
  return (
    <tr className="table-concultation-ligne">
      <td className="table-concultation-td-nom">{Concultation.Nom_Medcine}</td>
      <td className="table-concultation-td-date">
        {Concultation.Date}
      </td>
      <td className="table-concultation-td-time">
        {Concultation.Time}
      </td>
      <td className="table-concultation-td-button">
        <VoirButton />
      </td>
    </tr>
  );
}
