import { BsChevronLeft, BsFillCloudDownloadFill } from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import AboutPatient from "../components/aboutPatient";
import PatientDetailsCenter from "../components/patientDetails";
import PatientDetailsExamen from "../components/patientDetailsExamen";
import PatientDetailsReducation from "../components/patientDetailsReducation";
import MySwiper from "../components/swiperDossier";
import AddCahierSante from "../components/addCahierButton";
import MyCahierSwiper from "../components/swipeCahier";
import { useState } from "react";

export default function PatientDetails() {

  const [add, setAdd] = useState(false);
  
  let toggleClassAdd = add ? " add-cahier-active" : "";

  return (
    <div className="patient-details">
      <div className="patient-details-header">
        <BsChevronLeft className="icon-button" />
        <div className="patient-details-header-right">
          <FaShare className="icon-button" />
          <BsFillCloudDownloadFill className="icon-button" />
        </div>
      </div>
      <h2>Patient details</h2>
      <div className="patient-details-container">
        <AboutPatient></AboutPatient>
        <PatientDetailsCenter></PatientDetailsCenter>
        <div className="patient-details-container-right">
          <PatientDetailsExamen></PatientDetailsExamen>
          <PatientDetailsReducation></PatientDetailsReducation>
        </div>
      </div>
      <div className="patient-details-dossier-obse">
        <div className="patient-details-dossier-obse-swiper">
          <MySwiper></MySwiper>
        </div>
        <div className="profile-details-add-cahier">
          <AddCahierSante add={add} setAdd={setAdd} />
        </div>
        <div className={`profile-details-cahier-vaccin${toggleClassAdd}`}>
          <div className="cahier-formulaire-swiper">
            <MyCahierSwiper></MyCahierSwiper>
          </div>
        </div>
      </div>
    </div>
  );
}
