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
import MyNavBar from "../components/navBar";
import MyAsideBar from "../components/asideBar";
import MyAsideBarActive from "../components/asideBarActive";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";


export default function PatientDetails() {
  const current = new Date();
  const date = `${current.getDate()}-${
    current.getMonth() + 1
  }-${current.getFullYear()}`;
  const time = current.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const { user } = useAuthContext();

  const [add, setAdd] = useState(false);
  const [act, setAct] = useState(false);

  const history = useNavigate();

  const handleAddArticle = async () => {
    try {
      const response = await fetch("http://localhost:8000/patients/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Date_daccouchement: date,
          Heure_daccouchement: time,
          idAccoucheur: user?.id,
        }),
      });
      // get the patientID via response from the server patientRouter.post
      const data = await response.json();
      if (!response.ok) {
        window.alert("Add patient failed", data.error);
      }
      if (response.ok) {
        history(`/patients/${await data.id}`);
      }
    } catch (error) {
      console.error("Error adding article:", error);
    }
  };

  let toggleClassAdd = add ? " add-cahier-active" : "";

  return (
    <div className="Patients-Details">
      <div className="patient-table">
        <MyNavBar act={act} setAct={setAct}></MyNavBar>
        <div className="lh"></div>
        <MyAsideBar></MyAsideBar>
        <MyAsideBarActive act={act} setAct={setAct}></MyAsideBarActive>
        <div className="patient-table-container">
          <div className="patient-table-header">
            <div className="table-header-item">
              <label>Annee</label>
              <select className="Annee-select" name="Annee-age" id="Annee-age">
                <option value="">All</option>
              </select>
            </div>
            <div className="table-header-item">
              <label>Wilaya</label>
              <select
                className="Wilaya-select"
                name="Wilaya-age"
                id="Wilaya-age"
              >
                <option value="">All</option>
              </select>
            </div>
            <div className="table-header-item">
              <label>Annee</label>
              <select className="Annee-select" name="Annee-age" id="Annee-age">
                <option value="">All</option>
              </select>
            </div>
            <div className="search-item">
              <input type="submit" value="Search" />
            </div>
            <div className="ajoute-nouveau-ne-item">
              <input
                type="submit"
                onClick={handleAddArticle}
                value="Ajouter un nouveau-ne"
              />
            </div>
          </div>
          <div className="table-patients">
            <table>
              <tr className="table-patients-header">
                <td className="table-patients-header-nom">Nom complet</td>
                <td className="table-patients-header-annee">Annee</td>
                <td className="table-patients-header-willaya">Willaya</td>
                <td className="table-patients-header-region">Region</td>
              </tr>
              <tr>
                <td className="table-patients-td">Nom complet</td>
                <td className="table-patients-td">Annee</td>
                <td className="table-patients-td">Willaya</td>
                <td className="table-patients-td">Region</td>
              </tr>
              <tr>
                <td className="table-patients-td">Nom complet</td>
                <td className="table-patients-td">Annee</td>
                <td className="table-patients-td">Willaya</td>
                <td className="table-patients-td">Region</td>
              </tr>
              <tr>
                <td className="table-patients-td">Nom complet</td>
                <td className="table-patients-td">Annee</td>
                <td className="table-patients-td">Willaya</td>
                <td className="table-patients-td">Region</td>
              </tr>
              <tr>
                <td className="table-patients-td">Nom complet</td>
                <td className="table-patients-td">Annee</td>
                <td className="table-patients-td">Willaya</td>
                <td className="table-patients-td">Region</td>
              </tr>
              <tr>
                <td className="table-patients-td">Nom complet</td>
                <td className="table-patients-td">Annee</td>
                <td className="table-patients-td">Willaya</td>
                <td className="table-patients-td">Region</td>
              </tr>
              <tr>
                <td className="table-patients-td">Nom complet</td>
                <td className="table-patients-td">Annee</td>
                <td className="table-patients-td">Willaya</td>
                <td className="table-patients-td">Region</td>
              </tr>
              <tr>
                <td className="table-patients-td">Nom complet</td>
                <td className="table-patients-td">Annee</td>
                <td className="table-patients-td">Willaya</td>
                <td className="table-patients-td">Region</td>
              </tr>
              <tr>
                <td className="table-patients-td">Nom complet</td>
                <td className="table-patients-td">Annee</td>
                <td className="table-patients-td">Willaya</td>
                <td className="table-patients-td">Region</td>
              </tr>
              <tr>
                <td className="table-patients-td">Nom complet</td>
                <td className="table-patients-td">Annee</td>
                <td className="table-patients-td">Willaya</td>
                <td className="table-patients-td">Region</td>
              </tr>
              <tr>
                <td className="table-patients-td">Nom complet</td>
                <td className="table-patients-td">Annee</td>
                <td className="table-patients-td">Willaya</td>
                <td className="table-patients-td">Region</td>
              </tr>
              <tr>
                <td className="table-patients-td">Nom complet</td>
                <td className="table-patients-td">Annee</td>
                <td className="table-patients-td">Willaya</td>
                <td className="table-patients-td">Region</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
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
    </div>
  );
}
