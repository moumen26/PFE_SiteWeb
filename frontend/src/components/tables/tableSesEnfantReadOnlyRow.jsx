import React, { useEffect, useState } from "react";
import VoirButton from "../buttons/buttonVoir";
import ConculterButton from "../buttons/buttonConculter";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";

export default function TableSesEnfant({ Enfant }) {
  
  const { user } = useAuthContext();
  const { id } = useParams();
  const history = useNavigate();
  // Add Consultation
  const handleAddConsultation = async () => {
    const current = new Date();
    const date = `${current.getDate()}-${current.getMonth() + 1}-${current.getFullYear()}`;
    const time = `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
    try {
      const response = await fetch(
        `http://localhost:8000/patients/AddConsultation/${Enfant._id}`,
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
    history(`/Dossier-Nouveau-ne/${await Enfant._id}`);
  };
  return (
    <tr className="table-nouveau-ne-ligne">
      <td className="table-patients-td-nom">{Enfant.Nom + " " + Enfant.Prenom}</td>
      <td className="table-patients-td-annee">{Enfant.DateDeNaissance}</td>
      <td className="table-patients-td-willaya">{Enfant.LieuDeNaissance}</td>
      <td className="table-patients-td-region">{Enfant.Adresse}</td>
      <td className="table-patients-td table-patient-td-button">
        {user?.speciality === "Pediatre" &&
          <ConculterButton AddConsultation={handleAddConsultation}/>
        }
        <VoirButton VoirPatient={handleVoirDossierPatient}/>
      </td>
    </tr>
  );
}
