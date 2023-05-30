import React from 'react'
import VoirButton from "../buttons/buttonVoir";


export default function TableConcultationReadOnlyRow({ Concultation }) {
  return (
    <tr className="table-concultation-ligne">
      <td className="table-concultation-td-nom">{Concultation.MedecinID}</td>
      <td className="table-concultation-td-date">
        {Concultation.DateConcultation}
      </td>
      <td className="table-concultation-td-time">
        {Concultation.HeureConsultation}
      </td>
      <td className="table-concultation-td-button">
        <VoirButton />
      </td>
    </tr>
  );
}
