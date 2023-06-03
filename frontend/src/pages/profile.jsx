import React, { useEffect, useState } from "react";
import AboutPatient from "../components/aboutPatient";
import { BsCloudDownloadFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";
import MySwiper from "../components/swipers/swiperDossier";
import PatientDetailsReducation from "../components/patientDetailsReducation";
import VaccinTable from "../components/tables/tableAddPatientVaccin";
import AddVaccinButtonTable from "../components/buttons/buttonAddVaccin2";
import VisiteAddButton from "../components/buttons/buttonVisiteAdd";
import MyVisteTable from "../components/tables/tableVisite";
import AddVisiteButton from "../components/buttons/buttonAddVisite";
import AddVisiteButton2 from "../components/buttons/buttonAddVisite2";
import AddVaccinButton from "../components/buttons/buttonAddVaccin";
import MyCahierSwiper from "../components/swipers/swiperCahier";
import AddCahierSante from "../components/buttons/buttonAddCahier";
import TableConcultation from "../components/tables/tableConcultation";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
import TableAntecedent from "../components/tables/tableAntecedent";

export default function ProfilePatient() {
  //get current user
  const { user } = useAuthContext();
  //get the id of the patient
  const { id } = useParams();
  // initialisation of the navigate function
  const history = useNavigate();
  // initialisation of the state of the data
  const [PatientData, setPatientData] = useState();
  const [ConcultationDB, setConcultationDB] = useState();
  const [HospitalisationDB, setHospitalisationDB] = useState();
  const [Search, setSearch] = useState("");
  const [CarnetSanteData, setCarnetSante] = useState(null);
  const [VaccinData, setVaccinData] = useState(null);
  // Fetch Nouveau-ne Data
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
  }, [history, id, user?.token, ConcultationDB]);
  //Hospitalisation data
  useEffect(() => {
    const fetchHospitalisationData = async () => {
      if (id !== undefined) {
        await fetch(
          `http://localhost:8000/patients/Hospitalisation/all/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
          }
        ).then((response) => {
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
            console.error(
              "Error resieving Hospitalisation date",
              response.error
            );
          }
        });
      }
    };
    fetchHospitalisationData();
  }, [history, id, user?.token, HospitalisationDB]);
  useEffect(() => {
    const fetchVaccinData = async () => {
      if (id !== undefined) {
        await fetch(`http://localhost:8000/patients/Vaccin/all/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setVaccinData(data);
              })
              .catch((error) => {
                console.error("Error fetching Vaccin data:", error);
              });
          } else {
            console.error("Error resieving vaccin date", response.error);
          }
        });
      } else {
        history();
      }
    };
    fetchVaccinData();
  }, [history, id, VaccinData]);
  //user have access to Pediatre
  const giveAccessToPediatre = (speciality) => {
    if (speciality.toLowerCase() === "pediatre") {
      return true;
    } else {
      return false;
    }
  };
  //user have access to Sage Femme
  const giveAccessToSageFemme = (speciality) => {
    if (speciality.toLowerCase() === "sage femme") {
      return true;
    } else {
      return false;
    }
  };
  //user have access to Medecin
  const giveAccessToMedecin = (speciality) => {
    if (speciality.toLowerCase() === "medecin") {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="Patients-profile">
      <div className="patient-profile-container">
        <div className="patient-profile-icon">
          <FiChevronLeft size={30} />
          <div className="left-icon">
            <FaShareSquare size={25} />
            <BsCloudDownloadFill size={25} />
          </div>
        </div>
        <div className="patient-profile-details profile-cahier">
          <h4>Patient details</h4>
          <div className="patient-profile-details-container">
            <AboutPatient PatientData={PatientData} />
            <PatientDetailsReducation />
          </div>
          <div className="home-formulaire-swiper profile-dossier">
            <MySwiper />
          </div>
          <div className="home-formulaire-swiper profile-antecedent">
            <div className="profile-cahier-swiper-title">
              <h2>Antecedent</h2>
            </div>
            <div className="line-hl">
              <div className="hl"></div>
            </div>
            <TableAntecedent ConcultationDB={ConcultationDB} />
          </div>
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
            <div className="home-formulaire-swiper profile-concultation">
              <div className="profile-cahier-swiper-title">
                <h2>Concultation</h2>
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
