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
import TableConcultation from "../components/tables/tableConcultation";

export default function ProfilePatient() {
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
            <AboutPatient />
            <PatientDetailsReducation />
          </div>
          <div className="home-formulaire-swiper profile-dossier">
            <MySwiper />
          </div>
          <div className="home-formulaire-swiper profile-cahier-swiper">
            <div className="profile-cahier-swiper-title">
              <h2>Cahier de sante</h2>
            </div>
            <MyCahierSwiper />
          </div>
          <div className="home-formulaire-swiper profile-cahier-table-vaccin">
            <div className=" profile-cahier-swiper-title">
              <h2>Vaccination</h2>
            </div>
            <VaccinTable />
          </div>
          <div className="home-formulaire-swiper profile-concultation">
            <div className="profile-cahier-swiper-title">
              <h2>Concultation</h2>
            </div>
            <TableConcultation />
          </div>
        </div>
      </div>
    </div>
  );
}
