import React, { useEffect, useState } from "react";
import TableConcultation from "../components/tables/tableConcultation";
import ButtonAddConcultationTable from "../components/buttons/buttonAddConcultationTable";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

export default function AddHospitalisation() {
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
  //delete the Hospitalisation
  const handleDeleteHospitalisation = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/patients/Hospitalisation/${HospitalisationData._id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      const data = await response.data;
      if (!response.ok) {
        window.alert(data.message);
      }
      if (response.ok) {
        window.alert(data.message);
      }
      history(`/Nouveaune`);
    } catch (error) {
      console.error("Error Deleting Diagnostic:", error);
    }
  };
  //add concultation to hospitalisation
  const handleAddConsultation = async () => {
    try {
      // get current date
      const current = new Date();
      const date = `${current.getDate()}-${
        current.getMonth() + 1
      }-${current.getFullYear()}`;
      const time = `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
      // post new concultation
      const response = await fetch(
        `http://localhost:8000/patients/Hospitalisation/${HospitalisationData?._id}`,
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
  return (
    <div className="Add-Hospitalisation">
      <div className="Add-Hospitalisation-container">
        <div className="addpatient-hedear">
          <input type="submit" value="Annuler" onClick={handleDeleteHospitalisation}/>
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
            <h2>Concultation</h2>
            <ButtonAddConcultationTable AddConsultation={handleAddConsultation}/>
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
