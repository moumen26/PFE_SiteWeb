import { useState, Fragment } from "react";
import AjouteVaccinButton from "./ajouteVaccinButton";
import CloseButton from "./closeButtonTableVaccin";
import VaccinationAddButton from "./vaccinationAddButton";
import data from "../VaccinDataBase.json";
import { nanoid } from "nanoid";
import ReadOnlyRow from "./addPatientVaccinTableReadOnlyRow";
import EditRow from "./addPatientVaccinTableEditRow";
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from 'react-router-dom';
export default function VaccinTable() {
  const [addVaccinTable, setaddVaccinTable] = useState(false);

  let toggleClassAddVaccinTable = addVaccinTable
    ? " add-Vaccin-Table-active"
    : "";

  const [VaccinDB, setVaccinDB] = useState(data);
  const [addFormData, setAddFormData] = useState({
    vaccinationAge: "",
    vaccinationVaccin: "",
    vaccinationContre: "",
    vaccinationTechnique: "",
    vaccinationNumero: "",
    vaccinationDate: "",
  });

  const [editFormData, setEditFormData] = useState({
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

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newVaccin = {
      id: nanoid(),
      vaccinationAge: addFormData.vaccinationAge,
      vaccinationVaccin: addFormData.vaccinationVaccin,
      vaccinationContre: addFormData.vaccinationContre,
      vaccinationTechnique: addFormData.vaccinationTechnique,
      vaccinationNumero: addFormData.vaccinationNumero,
      vaccinationDate: addFormData.vaccinationDate,
    };

    const newVaccinDB = [...VaccinDB, newVaccin];
    setVaccinDB(newVaccinDB);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editVaccin = {
      id: editVaccinId,
      vaccinationAge: editFormData.vaccinationAge,
      vaccinationVaccin: editFormData.vaccinationVaccin,
      vaccinationContre: editFormData.vaccinationContre,
      vaccinationTechnique: editFormData.vaccinationTechnique,
      vaccinationNumero: editFormData.vaccinationNumero,
      vaccinationDate: editFormData.vaccinationDate,
    };

    const newVaccin = [...VaccinDB];

    const index = VaccinDB.findIndex((Vaccin) => Vaccin.id === editVaccinId);

    newVaccin[index] = editVaccin;

    setVaccinDB(newVaccin);
    setEditVaccinId(null);
  };

  const handleEditRowClick = (event, Vaccin) => {
    event.preventDefault();
    setEditVaccinId(Vaccin.id);

    const formValues = {
      vaccinationAge: Vaccin.vaccinationAge,
      vaccinationVaccin: Vaccin.vaccinationVaccin,
      vaccinationContre: Vaccin.vaccinationContre,
      vaccinationTechnique: Vaccin.vaccinationTechnique,
      vaccinationNumero: Vaccin.vaccinationNumero,
      vaccinationDate: Vaccin.vaccinationDate,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditVaccinId(null);
  };

  const handleDeleteClick = (VaccinId) => {
    const newVaccin = [...VaccinDB];

    const index = VaccinDB.findIndex((Vaccin) => Vaccin.id === VaccinId);

    newVaccin.splice(index, 1);

    setVaccinDB(newVaccin);
  };

  // Vaccin data
  const [Nom_vaccin, setNom_vaccin] = useState("Date_vaccination");
  const [Date_vaccination, setDate_vaccination] = useState("Date_vaccination");
  const [Age_vaccination, setAge_vaccination] = useState("Date_vaccination");
  const [Contre_vaccin, setContre_vaccin] = useState("Date_vaccination");
  const [Technique_vaccinale, setTechnique_vaccinale] = useState("Date_vaccination");
  const [Numero_lot, setNumero_lot] = useState("Date_vaccination");
  //Get patient id from url
  const  {id}  = useParams();
  //Get user id 
  const { user } = useAuthContext();

  const history = useNavigate ('/patients');

  //Create new Vaccin 
  const handleNewVaccinSubmit = async (event) => {
    event.preventDefault();
    
    if(id !== undefined){
       try {
        const response = await axios.post(`http://localhost:8000/patients/AddVaccin/${id}`, { 
          ID_vaccinateur : user?._id, Nom_vaccin :"a", Date_vaccination:"a", Age_vaccination:"a", 
          Contre_vaccin:"a", Technique_vaccinale:"a", Numero_lot:"a"
        });
        // Handle response as needed
        if (!response.status === 200) {
            window.alert("Add Vaccin failed", response.data.message);
        }else if (response.status === 200) {
            window.alert("Add Vaccin success", response.data.message);
        } 
      } catch (error) {
        console.log(error);
      } 
    }else{
      history()
    }


    /*if (!VaccinData) {
      return <p>Loading...</p>;
    }*/
  };
  return (
    <div className="vaccin-container">
      <div className="vaccin-table-container">
        <h2>Vaccination :</h2>
        <form onSubmit={handleEditFormSubmit}>
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
            {VaccinDB.map((Vaccin) => (
              <Fragment>
                {editVaccinId === Vaccin.id ? (
                  <EditRow
                    editFromData={editFormData}
                    handleEditFromChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    Vaccin={Vaccin}
                    handleEditRowClick={handleEditRowClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
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
                  required="required"
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
                  required="required"
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

              <div className="form-table-item l-border">
                <select
                  className="vaccination-select"
                  name="vaccinationContre"
                  id="vaccination-contre"
                  required="required"
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
                  required="required"
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
                  required="required"
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
                  required="required"
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
