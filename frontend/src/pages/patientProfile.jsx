import React, { useState } from "react";
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
        <div className="patient-profile-details">
          <h4>Patient details</h4>
          <div className="patient-profile-details-container">
            <AboutPatient />
            <PatientDetailsReducation />
          </div>
          <div className="home-formulaire-swiper">
            <MySwiper />
          </div>
          <div className="addpatient-add-cahier add-vaccin">
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
                    <AddConcultation
                      addConsultation={addConsultation}
                      setAddConsultation={setAddConsultation}
                    />
                  </div>
                </div>
                <div
                  className={`concultation-table${toggleClassAddConcultation}`}
                >
                  <TableConcultation />
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
                  <TableConcultation />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
