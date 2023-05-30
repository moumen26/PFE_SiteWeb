import React from "react";
import ConculterButton from "../buttons/buttonConculter";
import VoirButton from "../buttons/buttonVoir";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function TableNouveauNe({ NouveauNe }) {
  const current = new Date();
  const date = `${current.getDate()}-${
    current.getMonth() + 1
  }-${current.getFullYear()}`;
  const time = `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
  const history = useNavigate();
  const { user } = useAuthContext();
  // Add Consultation
  const handleAddConsultation = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/patients/AddConsultation/${NouveauNe._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({
            Date_Concultation: date,
            Heure_Concultation: time,
            idMedecin: user?.id,
          }),
        }
      );
      // get the ConsultationID via response from the server and redirect to the Consultation page
      const data = await response.json();
      if (!response.ok) {
        window.alert("Add Consultation failed", data.error);
      }
      if (response.ok) {
        history(`/conculter/${await data.id}`);
      }
    } catch (error) {
      console.error("Error adding Consultation:", error);
    }
  };
  //Voir patient details
  const handleVoirDossierPatient = async () => {
    if (NouveauNe.maturity === "Adulte"){
      history(`/Dossier-Patient/${await NouveauNe._id}`);
    }else{
      history(`/Dossier-Nouveau-ne/${await NouveauNe._id}`);
    }
    
  };
  return (
    <tr className="table-nouveau-ne-ligne">
      <td className="table-patients-td-nom">{NouveauNe.Nom + " " + NouveauNe.Prenom}</td>
      <td className="table-patients-td-annee">{NouveauNe.DateDeNaissance}</td>
      <td className="table-patients-td-willaya">{NouveauNe.LieuDeNaissance}</td>
      <td className="table-patients-td-region">{NouveauNe.Adresse}</td>
      <td className="table-patients-td table-patient-td-button">
        <ConculterButton AddConsultation={handleAddConsultation} />
        <VoirButton VoirPatient={handleVoirDossierPatient} />
      </td>
    </tr>
  );
}
