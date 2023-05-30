import React from 'react'
import VoirButton from "../buttons/buttonVoir";
import { useNavigate } from 'react-router-dom';


export default function TableConcultationReadOnlyRow({ Concultation }) {
  const history = useNavigate();
  //Voir patient details
  const handleVoirDossierPatient = async () => {
    history(`/Concultation/${await Concultation._id}`);    
  };
  return (
    <tr className="table-concultation-ligne">
      <td className="table-concultation-td-nom">Dr {Concultation.MedecinNom}</td>
      <td className="table-concultation-td-date">
        {Concultation.DateConcultation}
      </td>
      <td className="table-concultation-td-time">
        {Concultation.HeureConsultation}
      </td>
      <td className="table-concultation-td-button">
        <VoirButton VoirPatient = {handleVoirDossierPatient}/>
      </td>
    </tr>
  );
}
