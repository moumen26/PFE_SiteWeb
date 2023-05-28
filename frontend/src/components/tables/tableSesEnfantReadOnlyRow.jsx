import React from "react";
import VoirButton from "../buttons/buttonVoir";
import ConculterButton from "../buttons/buttonConculter";

export default function TableSesEnfant({ Enfant }) {
  return (
    <tr className="table-nouveau-ne-ligne">
      <td className="table-patients-td-nom">{Enfant.Nom_Nouveaune}</td>
      <td className="table-patients-td-annee">{Enfant.Annee_Nouveaune}</td>
      <td className="table-patients-td-willaya">{Enfant.Willaya_Nouveaune}</td>
      <td className="table-patients-td-region">{Enfant.Region_Nouveaune}</td>
      <td className="table-patients-td table-patient-td-button">
        <ConculterButton />
        <VoirButton/>
      </td>
    </tr>
  );
}
