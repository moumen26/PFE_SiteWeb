import { useState, Fragment, useEffect } from "react";
import AjouteVaccinButton from "./ajouteVaccinButton";
import CloseButton from "./closeButtonTableVaccin";
import VaccinationAddButton from "./vaccinationAddButton";
import ReadOnlyRow from "./addPatientVaccinTableReadOnlyRow";
import EditRow from "./addPatientVaccinTableEditRow";
import { useNavigate  } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from 'react-router-dom';
import axios from "axios";

export default function VaccinTable() {
  const [addVaccinTable, setaddVaccinTable] = useState(false);

  let toggleClassAddVaccinTable = addVaccinTable
    ? " add-Vaccin-Table-active"
    : "";

  const [VaccinDB, setVaccinDB] = useState();
  const [addFormData, setAddFormData] = useState({
    vaccinationAge: "",
    vaccinationVaccin: "",
    vaccinationContre: "",
    vaccinationTechnique: "",
    vaccinationNumero: "",
    vaccinationDate: "",
  });

  const [editFormData, setEditFormData] = useState({
    id: "",
    vaccinationAge: "",
    vaccinationVaccin: "",
    vaccinationContre: "",
    vaccinationTechnique: "",
    vaccinationNumero: "",
    vaccinationDate: "",
  });

  const [editVaccinId, setEditVaccinId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditRowClick = (event, VaccinData) => {
    event.preventDefault();
    setEditVaccinId(VaccinData?._id);
    const formValues = {
      Nom_vaccin: VaccinData.vaccinationVaccin,
      Date_vaccination: VaccinData.vaccinationDate,
      Age_vaccination: VaccinData.vaccinationAge,
      Contre_vaccin: VaccinData.vaccinationContre,
      Technique_vaccinale: VaccinData.vaccinationTechnique,
      Numero_lot: VaccinData.vaccinationNumero,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditVaccinId(null);
  };

//Get patient id from url
  const { id } = useParams();
//Get user id
  const { user } = useAuthContext();

  const history = useNavigate("/patients");
  
//Create new Vaccin
  const handleNewVaccinSubmit = async (event) => {
    event.preventDefault();
    if (id !== undefined) {
      try {
        const response = await fetch(
          `http://localhost:8000/patients/AddVaccin/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ID_vaccinateur: user?.id,
              Nom_vaccin: addFormData.vaccinationVaccin,
              Date_vaccination: addFormData.vaccinationDate,
              Age_vaccination: addFormData.vaccinationAge,
              Contre_vaccin: addFormData.vaccinationContre,
              Technique_vaccinale: addFormData.vaccinationTechnique,
              Numero_lot: addFormData.vaccinationNumero,
            }),
          }
        );
        // get the patientID via response from the server patientRouter.post
        const data = await response.json();
        if (!response.ok) {
          window.alert("Add vaccin failed", data.error);
        }
        if (response.ok) {
          window.alert("Add vaccin success", data.error);
        }
      } catch (error) {
        window.alert("Add Vaccin error");
      }
    } else {
      history();
    }
  };
// Fetch Vaccins
  useEffect(() => {
    const fetchVaccinData = async () => {
      if(id !== undefined){
        await fetch(`http://localhost:8000/patients/Vaccin/all/${id}`).then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              setVaccinDB(data);
            }).catch((error) => {
              console.error("Error fetching Vaccin data:", error);
            });
          } else {
            console.error("Error resieving vaccin date", response.error);
          }
        });
      }else{
        history()
      }
    };
    fetchVaccinData();
  }, [history, id]);
// Edit Vaccin
  const handleEditRowSubmitt = async (event) => {
    event.preventDefault();

    if(editVaccinId !== undefined){
       try {
        const response = await axios.patch(`http://localhost:8000/patients/Vaccin/${editVaccinId}`, { 
          Nom_vaccin: editFormData.vaccinationVaccin,
          Date_vaccination: editFormData.vaccinationDate,
          Age_vaccination: editFormData.vaccinationAge,
          Contre_vaccin: editFormData.vaccinationContre,
          Technique_vaccinale: editFormData.vaccinationTechnique,
          Numero_lot: editFormData.vaccinationNumero,
        });
        // Handle response as needed
        if (!response.status === 200) {
            window.alert("Update vaccin failed", response.error);
        }else if (response.status === 200) {
            window.alert("Update vaccin success", response.error);
        } 
      } catch (error) {
        window.alert(error);
      } 
    }else{
      window.alert("editVaccinId undefined");
    }
    
  };
// Delete Vaccin
  const handleDeleteClick = async (event, VaccinData) => {
    event.preventDefault();

    if(VaccinData !== undefined){
      try {
        const response = await axios.delete(`http://localhost:8000/patients/Vaccin/${VaccinData}`);
        // Handle response as needed
        if (!response.status === 200) {
            window.alert("Deleting vaccin failed", response.error);
        }else if (response.status === 200) {
            window.alert("Deleting vaccin success", response.error);
        } 
      } catch (error) {
        window.alert(error);
      } 
    }else{
      window.alert("VaccinData undefined");
    }
  };
  return (
    <div className="vaccin-container">
      <div className="vaccin-table-container">
        <h2>Vaccination :</h2>
        <form onSubmit={handleEditRowSubmitt}>
          <table className="vaccination-table">
            <tr>
              <th>
                <span>Age</span>
              </th>
              <th>
                <span>Vaccin</span>
              </th>
              <th>
                <span>Contre</span>
              </th>
              <th>
                <span>
                  Technique
                  <br />
                  vaccinale
                </span>
              </th>
              <th>
                <span>
                  Numero du
                  <br />
                  lot
                </span>
              </th>
              <th>
                <span>Date</span>
              </th>
              <th>
                <span>Actions</span>
              </th>
            </tr>
            {VaccinDB?.map(
              (VaccinData) => (
                console.log(VaccinData),
                (
                  <Fragment>
                    {editVaccinId === VaccinData?._id ? (
                      <EditRow
                        editFromData={editFormData}
                        handleEditFromChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                      />
                    ) : (
                      <ReadOnlyRow
                        VaccinData={VaccinData}
                        handleEditRowClick={handleEditRowClick}
                        handleDeleteClick={handleDeleteClick}
                      />
                    )}
                  </Fragment>
                )
              )
            )}
          </table>
        </form>
        <div className="vaccination-add-button-class">
          <VaccinationAddButton
            addVaccinTable={addVaccinTable}
            setaddVaccinTable={setaddVaccinTable}
          />
        </div>
      </div>
      <div className={`add-tableau-vaccin1${toggleClassAddVaccinTable}`}>
        <div className="add-tableau-vaccin1-container">
          <div className="add-tableau-vaccin1-close-class">
            <CloseButton
              addVaccinTable={addVaccinTable}
              setaddVaccinTable={setaddVaccinTable}
            />
          </div>
          <div className="vaccination-table-add">
            <div className="add-vaccin-table-item">
              <span>Age</span>
            </div>
            <div className="add-vaccin-table-item l-border">
              <span>Vaccin</span>
            </div>
            <div className="add-vaccin-table-item l-border">
              <span>Contre</span>
            </div>
            <div className="add-vaccin-table-item l-border">
              <span>
                Technique
                <br />
                vaccinale
              </span>
            </div>
            <div className="add-vaccin-table-item l-border r-border">
              <span>
                Numero du
                <br />
                lot
              </span>
            </div>
            <div className="add-vaccin-table-item">
              <span>Date</span>
            </div>
          </div>
          <form onSubmit={handleNewVaccinSubmit}>
            <div className="form-table2">
              <div className="form-table-item">
                <select
                  className="vaccination-select"
                  name="vaccinationAge"
                  id="vaccination-age"
                  onChange={handleAddFormChange}
                >
                  <option selected disabled>
                    Age
                  </option>

                  <option value="1mois">1 mois</option>
                  <option value="2mois">2 mois</option>
                  <option value="3mois">3 mois</option>
                </select>
              </div>

              <div className="form-table-item l-border">
                <select
                  className="vaccination-select"
                  name="vaccinationVaccin"
                  id="vaccination-vaccin"
                  onChange={handleAddFormChange}
                >
                  <option selected disabled>
                    Vaccin
                  </option>
                  <option value="vaccin1">vaccin</option>
                  <option value="vaccin2">vaccin2</option>
                  <option value="vaccin3">vaccin3</option>
                  <option value="vaccin4">vaccin4</option>
                </select>
              </div>

              <div className="form-table-item l-border s-table-item">
                <select
                  className="vaccination-select"
                  name="vaccinationContre"
                  id="vaccination-contre"
                  onChange={handleAddFormChange}
                >
                  <option selected disabled>
                    Contre
                  </option>
                  <option value="contre1">contre</option>
                  <option value="contre2">contre2</option>
                  <option value="contre3">contre3</option>
                  <option value="contre4">contre4</option>
                </select>
              </div>

              <div className="form-table-item l-border">
                <select
                  className="vaccination-select"
                  name="vaccinationTechnique"
                  id="vaccination-technique"
                  onChange={handleAddFormChange}
                >
                  <option selected disabled>
                    Technique
                  </option>
                  <option value="technique1">technique1</option>
                  <option value="technique2">technique2</option>
                  <option value="technique3">technique3</option>
                  <option value="technique4">technique4</option>
                </select>
              </div>

              <div className="form-table-item l-border r-border">
                <select
                  className="vaccination-select"
                  name="vaccinationNumero"
                  id="vaccination-numero"
                  onChange={handleAddFormChange}
                >
                  <option selected disabled>
                    Numero
                  </option>
                  <option value="numero1">numero1</option>
                  <option value="numero2">numero2</option>
                  <option value="numero3">numero3</option>
                  <option value="numero4">numero4</option>
                </select>
              </div>

              <div className="form-table-item s-table-item">
                <input
                  className="vaccination-input"
                  type="date"
                  name="vaccinationDate"
                  onChange={handleAddFormChange}
                />
              </div>
            </div>

            <div className="add-tableau-vaccin-ajouter-btn">
              <AjouteVaccinButton
                addVaccinTable={addVaccinTable}
                setaddVaccinTable={setaddVaccinTable}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
