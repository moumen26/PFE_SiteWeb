import React, { useEffect, useState } from "react";
import ButtonAddConcultationTable from "../components/buttons/buttonAddConcultationTable";
import PatientDetailsReducation from "../components/patientDetailsReducation";
import { BsCloudDownloadFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";
import AboutMaman from "../components/aboutMaman";
import AddBebe from "../components/addBebe";
import TableConcultation from "../components/tables/tableConcultation";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";

export default function MamanProfile() {
  //get current user
  const { user } = useAuthContext();
  //get the id of the patient
  const { id } = useParams();
  // initialisation of the navigate function
  const history = useNavigate();
  // initialisation of the state of the data
  const [PatientData, setPatientData] = useState();
  const [ConcultationDB, setConcultationDB] = useState();

  // Fetch Patient Data
  useEffect(() => {
    const fetchPatientData = async () => {
      if (user?.token !== undefined) {
        await fetch(`http://localhost:8000/patients/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setPatientData(data);
              })
              .catch((error) => {
                console.error("Error fetching Patient data:", error);
              });
          } else {
            console.error("Error resieving Patient date", response.error);
          }
        });
      } else {
        history(`/patients`);
      }
    };
    fetchPatientData();
  }, [history, id, user?.token, PatientData]);

  //Concultation data
  useEffect(() => {
    const fetchPatientData = async () => {
      if (id !== undefined) {
        await fetch(`http://localhost:8000/patients/Consultation/all/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setConcultationDB(data);
              })
              .catch((error) => {
                console.error("Error fetching Concultation data:", error);
              });
          } else {
            console.error("Error resieving Concultation date", response.error);
          }
        });
      }
    };
    fetchPatientData();
  }, [history, id, user?.token, PatientData]);
  return (
    <div className="Maman-profile">
      <div className="maman-profile-container">
        <div className="patient-profile-icon">
          <FiChevronLeft size={30} />
          <div className="left-icon">
            <FaShareSquare size={25} />
            <BsCloudDownloadFill size={25} />
          </div>
        </div>
        <div className="patient-profile-details">
          <h4>Patient details</h4>
          <div className="patient-profile-details-container">
            <AboutMaman PatientData={PatientData} />
            <PatientDetailsReducation ConcultationDB={ConcultationDB} />
          </div>
          <AddBebe />
          <div className="home-formulaire-swiper profile-hospitalisation">
            <div className="profile-cahier-swiper-title">
              <h2>Concultation</h2>
              <ButtonAddConcultationTable />
            </div>
            <div className="line-hl">
              <div className="hl"></div>
            </div>
            <TableConcultation ConcultationDB={ConcultationDB} />
          </div>
        </div>
      </div>
    </div>
  );
}
