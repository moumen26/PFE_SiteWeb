import React, { useEffect, useState } from "react";
import VoirButton from "../buttons/buttonVoir";
import ConculterButton from "../buttons/buttonConculter";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";

export default function TableSesEnfant({ Enfant }) {
  const { user } = useAuthContext();
  const { id } = useParams();
  const history = useNavigate();
  
  return (
    <tr className="table-nouveau-ne-ligne">
      <td className="table-patients-td-nom">{Enfant._id}</td>
      <td className="table-patients-td-annee">{Enfant._id}</td>
      <td className="table-patients-td-willaya">{Enfant._id}</td>
      <td className="table-patients-td-region">{Enfant._id}</td>
      <td className="table-patients-td table-patient-td-button">
        <ConculterButton />
        <VoirButton/>
      </td>
    </tr>
  );
}
