import React, { useEffect, useState } from "react";
import data from "../MeddicamentDataBase.json";
import { nanoid } from "nanoid";
import AddMedicamentReadOnlyRow from "../components/tables/tableAddMedicamentReadOnlyRow";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function AffichageConcultation() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [ ConsultationData, setConsultationData] = useState();
  const [ DiagnosticData, setDiagnosticData] = useState();
  const [ OrdonanceData, setOrdonanceData] = useState();
  const [ MedicamentData, setMedicamentData] = useState(data);
  const [ UserData, setUserData] = useState();
  //get User data
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id !== undefined) {
        await fetch(`http://localhost:8000/user/${user?.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setUserData(data);
              })
              .catch((error) => {
                console.error("Error fetching Consultation data:", error);
              });
          } else {
            console.error("Error resieving Consultation date", response.error);
          }
        });
      }
    };
    fetchUserData();
  }, [UserData, user?.id, user?.token]);
  //get conculatation data
  useEffect(() => {
    const fetchConcultationData = async () => {
      if (user?.token !== undefined) {
        await fetch(`http://localhost:8000/patients/Consultation/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setConsultationData(data);
              })
              .catch((error) => {
                console.error("Error fetching Consultation data:", error);
              });
          } else {
            console.error("Error resieving Consultation date", response.error);
          }
        });
      }
    };
    fetchConcultationData();
  }, [ConsultationData, id, user?.token]);
  //get diagnostic data
  useEffect(() => {
    const fetchDiagnosticData = async () => {
      if (ConsultationData?.DiagnosticID !== undefined) {
        await fetch(`http://localhost:8000/patients/Diagnostic/${ConsultationData?.DiagnosticID}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setDiagnosticData(data);
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
    fetchDiagnosticData();
  }, [ConsultationData?.DiagnosticID, DiagnosticData, user?.token]);
  //get Medicament data
  
  //get diagnostic data
  useEffect(() => {
    const fetchMedicamentData = async () => {
      if (ConsultationData?.OrdonanceID !== undefined) {
        await fetch(`http://localhost:8000/patients/Medicament/all/${ConsultationData?.OrdonanceID}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setMedicamentData(data);
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
    fetchMedicamentData();
  }, [ConsultationData?.OrdonanceID, MedicamentData, user?.token]);
  return (
    <div className="Affichage-concultation">
      <div className="affichage-concultation-container">
        <div className="affichage-concultation-header">
          <h3>
            Medecin : <span>Dr. {UserData?.Fname}</span>
          </h3>
          <div className="time-date-concultation">
            <h3>Heure : {ConsultationData?.HeureConsultation}</h3>
            <h3>Date :  {ConsultationData?.DateConcultation}</h3>
          </div>
        </div>
        <div className="consultation-table">
          <div className="consultation-table-container">
            <div className="consultation-table-item">
              <div className="consultation-table-item-header">
                <h2>Diagnostic</h2>
              </div>
              <div className="consultation-table-item-contenu">
                <div className="consultation-table-item-context">
                  <div className="consultation-table-item-context-header">
                    <h2>Context :</h2>
                  </div>
                  <div className="consultation-table-item-context-container">
                    <textarea
                      defaultValue={DiagnosticData?.Context}
                      readOnly
                      placeholder="Context"
                    ></textarea>
                    <h2>Maladie :</h2>
                    <input type="text" placeholder="fiévre, faiblesse..." 
                      defaultValue={DiagnosticData?.Context}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="consultation-table-item">
              <div className="consultation-table-item-header consul-ligne2">
                <h2>Ordonance</h2>
              </div>
              <div className="consultation-table-item-contenu">
                <div className="consultation-table-item-context">
                  {MedicamentData?.map((Medicament) => (
                    <div className="consultation-table-item-context-container ord-med">
                      <AddMedicamentReadOnlyRow Medicament={Medicament} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="consultation-table-item">
              <div className="consultation-table-item-header consul-ligne2">
                <h2>Examen</h2>
              </div>
              <div className="consultation-table-item-contenu">
                <div className="consultation-table-item-context">
                  <div className="consultation-table-item-context-container consultation-examen"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
