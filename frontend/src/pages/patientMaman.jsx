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

  const handleAddPatient = async () => {
    try {
      const response = await fetch("http://localhost:8000/patients/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idAccoucheur: user?.id,
        }),
      });
      // get the patientID via response from the server patientRouter.post
      const data = await response.json();
      if (!response.ok) {
        window.alert("Add patient failed", data.error);
      }
      if (response.ok) {
        history(`/antecedent/${await data.id}`);
      }
    } catch (error) {
      console.error("Error adding article:", error);
    }
  };


  return (
    <div className="Patients-Details">
      <div className="patient-table">
        <MyNavBar act={act} setAct={setAct}></MyNavBar>
        <div className="lh"></div>
        
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
              <label>Region</label>
              <select
                className="Region-select"
                name="Region-age"
                id="Region-age"
              >
                <option value="">All</option>
              </select>
            </div>
            <input
              type="search"
              className="class-search"
              placeholder="Search.."
            />
            <div className="search-item">
              <input type="submit" value="Search" />
            </div>

            <div className="ajoute-nouveau-ne-item">
              <input
                type="submit"
                onClick={handleAddPatient}
                value="Ajouter un patient"
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
      
    </div>
  );
}
