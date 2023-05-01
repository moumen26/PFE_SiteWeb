import { useState, Fragment } from "react";
import AjouteVaccinButton from "./ajouteVaccinButton";
import CloseButton from "./closeButtonTableVaccin";
import VaccinationAddButton from "./vaccinationAddButton";
import data from "../VaccinDataBase.json";
import { nanoid } from "nanoid";
import ReadOnlyRow from "./addPatientVaccinTableReadOnlyRow";
import EditRow from "./addPatientVaccinTableEditRow";

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

  const [editVaccinId, setEditVaccinId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newVaccin = {
      id: nanoid(),
      Age: addFormData.vaccinationAge,
      Vaccin: addFormData.vaccinationVaccin,
      Contre: addFormData.vaccinationContre,
      Technique: addFormData.vaccinationTechnique,
      Numero: addFormData.vaccinationNumero,
      Date: addFormData.vaccinationDate,
    };

    const newVaccinDB = [...VaccinDB, newVaccin];
    setVaccinDB(newVaccinDB);
  };

  const handleEditRowClick = (event, Vaccin) => {
    event.preventDefault();
    setEditVaccinId(Vaccin.id);
  };

  return (
    <div className="vaccin-container">
      <div className="vaccin-table-container">
        <h2>Vaccination :</h2>
        <form>
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
                  <EditRow />
                ) : (
                  <ReadOnlyRow
                    Vaccin={Vaccin}
                    handleEditRowClick={handleEditRowClick}
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
          <form onSubmit={handleAddFormSubmit}>
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
              {/* <AjouteVaccinButton
                addVaccinTable={addVaccinTable}
                setaddVaccinTable={setaddVaccinTable}
              /> */}
              <AjouteVaccinButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
