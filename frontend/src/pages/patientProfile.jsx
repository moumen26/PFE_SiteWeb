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
import AddConcultation from "../components/buttons/buttonAddConcultation";
import TableConcultation from "../components/tables/tableConcultation";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function PatientProfile() {
  const [add, setAdd] = useState(false);
  const [addVaccin, setAddvacin] = useState(false);
  const [addVaccin2, setAddVaccin2] = useState(false);
  const [addVisite, setAddvisite] = useState(false);
  const [addVisite2, setAddvisite2] = useState(false);
  const [addConsultation, setAddConsultation] = useState(false);

  let toggleClassAdd = add ? " add-cahier-active" : "";
  let toggleClassAddVaccin = addVaccin ? " add-vaccin-active" : "";
  let toggleClassAddVaccin2 = addVaccin2 ? " add-vaccin-active2" : "";
  let toggleClassAddVisite = addVisite ? " add-visite-active" : "";
  let toggleClassAddVisite2 = addVisite2 ? " add-visite-active2" : "";
  let toggleClassAddConcultation = addConsultation
    ? " add-concultation-active"
    : "";
  //get current user
  const { user } = useAuthContext();
  //get the id of the patient
  const { id } = useParams();
  // initialisation of the navigate function
  const history = useNavigate();
  // initialisation of the state of the data
  const [PatientData, setPatientData] = useState();
  const [ConcultationDB, setConcultationDB] = useState();
  const [Search, setSearch] = useState("");

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

  //user have access to Pediatre
  const giveAccessToPediatre = (speciality) => {
      if(speciality.toLowerCase() === "pediatre"){
        return true;
      }else{
        return false;
      }
  }
  //user have access to Sage Femme
  const giveAccessToSageFemme = (speciality) => {
    if(speciality.toLowerCase() === "sage femme"){
      return true;
    }else{
      return false;
    }
  }
  //user have access to Medecin
  const giveAccessToMedecin = (speciality) => {
    if(speciality.toLowerCase() === "medecin"){
      return true;
    }else{
      return false;
    }
  }
  return (
    <div className="Patients-profile">
      <div className="patient-profile-container">
        <div className="patient-profile-icon">
          <FiChevronLeft size={30} cursor="pointer" />
          <div className="left-icon">
            <FaShareSquare size={25} cursor="pointer" />
            <BsCloudDownloadFill size={25} cursor="pointer" />
          </div>
        </div>
        <div className="patient-profile-details">
          {/* Patient details */}
          <h4>Patient details</h4>
          <div className="patient-profile-details-container">
            <AboutPatient PatientData={PatientData} />
            <PatientDetailsReducation />
          </div>
          <div className="home-formulaire-swiper">
            {/* Patient details */}
            <MySwiper />
          </div>
          <div className="addpatient-add-cahier add-vaccin">
            {/* Cahier de sante */}
            <AddCahierSante add={add} setAdd={setAdd} />
          </div>
          <div className={`cahier-vaccin${toggleClassAdd}`}>
            <div className="cahier-sante-title">
              <h2>Carnet de sante :</h2>
            </div>
            <div className="cahier-formulaire-swiper">
              <MyCahierSwiper />
            </div>
            <div
              className={`vaccin-visite-class${toggleClassAddVaccin} vaccin-visite-class${toggleClassAddVisite2}`}
            >
              {/* Vaccin */}
              <AddVaccinButton
                addVaccin={addVaccin}
                setAddvacin={setAddvacin}
              />
              <AddVisiteButton2
                addVisite2={addVisite2}
                setAddvisite2={setAddvisite2}
              />
            </div>
            <div className={`vaccin-table${toggleClassAddVaccin}`}>
              <VaccinTable />
              <div className="addpatient-add-visite">
                <AddVisiteButton
                  addVisite={addVisite}
                  setAddvisite={setAddvisite}
                />
              </div>
              <div className={`visite-table${toggleClassAddVisite}`}>
                <div className="visite-table-container">
                  <h2>Visites systematique de 1 a 3 mois</h2>
                  <MyVisteTable />
                  <div className="visite-add-button-class">
                    <VisiteAddButton />
                  </div>
                  <div className="addpatient-add-consultation">
                    {/* Concultation */}
                    <AddConcultation
                      addConsultation={addConsultation}
                      setAddConsultation={setAddConsultation}
                    />
                  </div>
                </div>
                <div
                  className={`concultation-table${toggleClassAddConcultation}`}
                >
                  <div className="table-conclutation-container">
                    <h2>Conclutation</h2>
                    <div className="table-conclutation-search">
                      <input
                        type="search"
                        className="class-search"
                        placeholder="Search.."
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                      />
                      <AiOutlineSearch className="search-icon" />
                    </div>
                  </div>
                  <TableConcultation
                    ConcultationDB={ConcultationDB}
                    Search={Search}
                  />
                </div>
              </div>
            </div>

            <div className={`visite-table2${toggleClassAddVisite2}`}>
              <div className="visite-table-container">
                <h2>Visites systematique de 1 a 3 mois</h2>
                <MyVisteTable />
                <div className="visite-add-button-class">
                  <VisiteAddButton />
                </div>
              </div>
              <div className="addpatient-add-vaccin">
                <AddVaccinButtonTable
                  addVaccin2={addVaccin2}
                  setAddVaccin2={setAddVaccin2}
                />
              </div>
              <div className={`visite-table2${toggleClassAddVaccin2}`}>
                <VaccinTable />
                <div className="addpatient-add-consultation">
                  <AddConcultation
                    addConsultation={addConsultation}
                    setAddConsultation={setAddConsultation}
                  />
                </div>
                <div
                  className={`concultation-table${toggleClassAddConcultation}`}
                >
                  <div className="table-conclutation-container">
                    <h2>Conclutation</h2>
                    <div className="table-conclutation-search">
                      <input
                        type="search"
                        className="class-search"
                        placeholder="Search.."
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                      />
                      <AiOutlineSearch className="search-icon" />
                    </div>
                  </div>
                  <TableConcultation
                    ConcultationDB={ConcultationDB}
                    Search={Search}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
