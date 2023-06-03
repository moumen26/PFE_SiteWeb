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
import TableAntecedent from "../components/tables/tableAntecedent";
import VaccinTable from "../components/tables/tableAddPatientVaccin";

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
  const [ConcultationDBByMaladie, setConcultationDBByMaladie] = useState();
  const [HospitalisationDB, setHospitalisationDB] = useState();


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
    const fetchConcultationDB = async () => {
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
    fetchConcultationDB();
  }, [history, id, user?.token, PatientData]);

  //Hospitalisation data
  useEffect(() => {
    const fetchHospitalisationData = async () => {
      if (id !== undefined) {
        await fetch(`http://localhost:8000/patients/Hospitalisation/all/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setHospitalisationDB(data);
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
    }, [history, id, user?.token, HospitalisationDB]);
  const handleGoBack = () => {
    history(-1)
  }
  return (
    <div className="Maman-profile">
      <div className="maman-profile-container">
        <div className="patient-profile-icon">
          <FiChevronLeft size={30} onClick={handleGoBack}/>
        </div>
        <div className="patient-profile-details">
          <h4>Patient details</h4>
          <div className="patient-profile-details-container">
            <AboutMaman PatientData={PatientData} />
            <PatientDetailsReducation ConcultationDB={ConcultationDB} />
          </div>
          {!(PatientData?.Sexe.toLowerCase() === "homme" || 
              PatientData?.Sexe.toLowerCase() === "male") && 
            <AddBebe />
          }
          <div className="home-formulaire-swiper profile-cahier-table-vaccin">
            <div className="profile-cahier-swiper-title">
              <h2>Vaccination</h2>
            </div>
            <div className="line-hl">
              <div className="hl"></div>
            </div>
            <VaccinTable />
          </div>
          {ConcultationDB?.length > 0 && (
            <div className="home-formulaire-swiper profile-antecedent">
              <div className="profile-cahier-swiper-title">
                <h2>Antecedent</h2>
              </div>
              <div className="line-hl">
                <div className="hl"></div>
              </div>
              <TableAntecedent AntecedentDB={ConcultationDB} />
            </div>
          )}
          {ConcultationDB?.length > 0 && (
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
          )}
          {HospitalisationDB?.length > 0 && (
            <div className="home-formulaire-swiper profile-hospitalisation">
            <div className="profile-cahier-swiper-title">
              <h2>Hospitalisation</h2>
            </div>
            <div className="line-hl">
              <div className="hl"></div>
            </div>
            <TableConcultation ConcultationDB={HospitalisationDB} />
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
