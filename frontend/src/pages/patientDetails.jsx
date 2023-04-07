import { BsChevronLeft, BsDownload } from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import AboutPatient from "../components/aboutPatient";
import PatientDetailsCenter from "../components/patientDetails";
import PatientDetailsExamen from "../components/patientDetailsExamen";
import PatientDetailsReducation from "../components/patientDetailsReducation";

export default function PatientDetails() {
  return (
    <div className="patient-details">
      <div className="patient-details-header">
        <BsChevronLeft className="icon-button" />
        <div className="patient-details-header-right">
          <FaShare className="icon-button" />
          <BsDownload className="icon-button" />
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
    </div>
  );
}
