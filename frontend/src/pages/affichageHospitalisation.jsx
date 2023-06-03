import React, { useEffect, useState } from 'react'
import ButtonAddConcultationTable from '../components/buttons/buttonAddConcultationTable';
import TableConcultation from '../components/tables/tableConcultation';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

export default function AffichageHospitalisation() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const history = useNavigate();
  const [ HospitalisationData, setHospitalisationData] = useState();
  const [ ConcultationData, setConcultationData] = useState();

  //get Hospitalisation data
  useEffect(() => {
    const fetchHospitalisationData = async () => {
      if (user?.token !== undefined) {
        await fetch(`http://localhost:8000/patients/Hospitalisation/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setHospitalisationData(data);
              })
              .catch((error) => {
                console.error("Error fetching Hospitalisation data:", error);
              });
          } else {
            console.error("Error resieving Hospitalisation date", response.error);
          }
        });
      }
    };
    fetchHospitalisationData();
  }, [HospitalisationData, id, user?.token]);
  //get ConcultationData data
  useEffect(() => {
    const fetchConcultationData = async () => {
      if (user?.token !== undefined) {
        await fetch(`http://localhost:8000/patients/ConsultationByHospitalisationID/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setConcultationData(data);
              })
              .catch((error) => {
                console.error("Error fetching Hospitalisation data:", error);
              });
          } else {
            console.error("Error resieving Hospitalisation date", response.error);
          }
        });
      }
    };
    fetchConcultationData();
  }, [ConcultationData, id, user?.token]);
  return (
    <div className="Affichage-Hospitalisation">
      <div className="Affichage-Hospitalisation-container">
        <div className="addpatient-hedear">
          <input type="submit" value="Annuler" />
          <h2>Hospitalisation</h2>
          <input type="submit" value="Enregistrer tout" />
        </div>
        <div className="affichage-concultation-header">
          <h3>
            Medecin : <span>{user?.Fname}</span>
          </h3>
          <div className="time-date-concultation">
            <h3>
              Heure : <span>{HospitalisationData?.HeureHospitalisation}</span>
            </h3>
            <h3>
              Date : <span>{HospitalisationData?.DateHospitalisation}</span>
            </h3>
          </div>
        </div>
        <div className="home-formulaire-swiper profile-hospitalisation">
          <div className="profile-cahier-swiper-title">
            <h2>Consultation</h2>
            <ButtonAddConcultationTable />
          </div>
          <div className="line-hl">
            <div className="hl"></div>
          </div>
          <TableConcultation ConcultationDB={ConcultationData}/>
        </div>
      </div>
    </div>
  );
}
