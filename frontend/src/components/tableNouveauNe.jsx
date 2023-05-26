import React from "react";
import ConculterButton from "./conculterButton";
import VoirButton from "./voirButton";

export default function TableNouveauNe({ NouveauNe }) {
  return (
    <tr className="table-nouveau-ne-ligne">
      <td className="table-patients-td-nom">{NouveauNe.Nom_Nouveaune}</td>
      <td className="table-patients-td-annee">{NouveauNe.Annee_Nouveaune}</td>
      <td className="table-patients-td-willaya">{NouveauNe.Willaya_Nouveaune}</td>
      <td className="table-patients-td-region">{NouveauNe.Region_Nouveaune}</td>
      <td className="table-patients-td table-patient-td-button">
        <ConculterButton />
        <VoirButton />
      </td>
    </tr>
  );
}
