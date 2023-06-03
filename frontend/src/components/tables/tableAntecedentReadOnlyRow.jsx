import React, { useEffect, useState } from "react";
import VoirButton from "../buttons/buttonVoir";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function TableAntecedentReadOnlyRow({ Antecedent }) {
  //get current user
  const { user } = useAuthContext();
  // initialisation of the navigate function
  const history = useNavigate();
  // initialisation of the state of the data
  const [DiagnosticData, setDiagnosticDB] = useState();
  //Diagnostic data
  useEffect(() => {
    const fetchPatientData = async () => {
      if (Antecedent?.DiagnosticID !== undefined) {
        await fetch(`http://localhost:8000/patients/Diagnostic/${Antecedent?.DiagnosticID}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setDiagnosticDB(data);
              })
              .catch((error) => {
                console.error("Error fetching Diagnostic data:", error);
              });
          } else {
            console.error("Error resieving Diagnostic date", response.error);
          }
        });
      }
    };
    fetchPatientData();
  }, [history, user?.token, DiagnosticData, Antecedent?.DiagnosticID]);
  //Voir patient details
  const handleVoirDossierPatient = async () => {
    if(Antecedent?.DateHospitalisation || Antecedent?.HeureHospitalisation){
      history(`/affichageHospitalisation/${await Antecedent._id}`);    
    }else{
      history(`/Concultation/${await Antecedent._id}`);  
    }
  };
  return (
    <tr className="table-concultation-ligne">
      <td className="table-concultation-td-nom">{DiagnosticData?.Maladie}</td>
      <td className="table-concultation-td-date">{Antecedent.DateConcultation}</td>
      <td className="table-concultation-td-time">{Antecedent.HeureConsultation}</td>
      <td className="table-concultation-td-button">
        <VoirButton VoirPatient = {handleVoirDossierPatient}/>
      </td>
    </tr>
  );
}
