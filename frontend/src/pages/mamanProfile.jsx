import React from "react";
import PatientDetailsReducation from "../components/patientDetailsReducation";
import { BsCloudDownloadFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";
import AboutMaman from "../components/aboutMaman";
import AddBebe from "../components/addBebe";
import TableConcultation from "../components/tables/tableConcultation";

export default function MamanProfile() {
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
            <AboutMaman />
            <PatientDetailsReducation />
          </div>
          <AddBebe />
          <div className="Maman-profile-title">
            <h2>Conclutation :</h2>

          </div>
          <TableConcultation />
        </div>
      </div>
    </div>
  );
}
