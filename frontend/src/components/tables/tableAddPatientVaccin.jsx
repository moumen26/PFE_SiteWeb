import { useState, Fragment, useEffect } from "react";
import AjouteVaccinButton from "../buttons/buttonAjouteVaccin";
import CloseButton from "../buttons/buttonCloseTableVaccin";
import VaccinationAddButton from "../buttons/buttonAddVaccination";
import ReadOnlyRow from "../tables/tableAddPatientVaccinReadOnlyRow";
import EditRow from "../tables/tableAddPatientVaccinTableEditRow";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import Notification from "../notification/notification";

export default function VaccinTable() {
  const [addVaccinTable, setaddVaccinTable] = useState(false);

   const [notify, setNotify] = useState({
     isOpen: false,
     message: "",
     type: "",
   });


  let toggleClassAddVaccinTable = addVaccinTable
    ? " add-Vaccin-Table-active"
    : "";
  const [PatientData, setPatientData] = useState();
  const [VaccinDB, setVaccinDB] = useState();
  const [VaccinData, setVaccinData] = useState();
  const [AgeRecommande, setAgeRecommande] = useState();
  const [ContreQuoi, setContreQuoi] = useState();
  const [Technique, setTechnique] = useState();
  const [NumeroLot, setNumeroLot] = useState();
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
    const fetchVaccinDB = async () => {
      await fetch(`http://localhost:8000/patients/Vaccin/${fieldValue}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }).then((response) => {
        if (response.ok) {
          response
            .json()
            .then((data) => {
              setAgeRecommande(data.age_recommande);
              setContreQuoi(data.contre_quoi);
              setTechnique(data.technique_vaccinale);
              setNumeroLot(data.numero_lot);
            })
            .catch((error) => {
              console.error("Error fetching Vaccin data:", error);
            });
        } else {
          console.error("Error resieving vaccin date", response.error);
        }
      });
    };
    fetchVaccinDB();
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

  //Get patient id from parms
  const { id } = useParams();
  //Get user 
  const { user } = useAuthContext();

  const history = useNavigate("/patients");
  // Fetch Patient Data
  useEffect(() => {
    const fetchPatientData = async () => {
      if (user?.token !== undefined) {
        await fetch(`http://localhost:8000/patients/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setPatientData(data);
              })
              .catch((error) => {
                console.error("Error fetching Patient data:", error);
              });
          } else {
            console.error("Error resieving Patient date", response.error);
          }
        });
      } else {
        history(`/patients`);
      }
    };
    fetchPatientData();
  }, [history, id, user?.token, PatientData]);
  // Fetch Vaccins
  useEffect(() => {
    const fetchVaccinDB = async () => {
        await fetch(`http://localhost:8000/patients/Vaccin/all/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setVaccinData(data);
              })
              .catch((error) => {
                console.error("Error fetching Vaccin data:", error);
              });
          } else {
            console.error("Error resieving vaccin date", response.error);
          }
        });
    };
    fetchVaccinDB();
  }, [history, id, VaccinData, user.token]);
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
              Authorization: `Bearer ${user.token}`,
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
          setNotify({
            isOpen: true,
            message: `${data.message}`,
            type: "error",
          });
          // window.alert("Add vaccin failed", data.error);
        }
        if (response.ok) {
          setNotify({
            isOpen: true,
            message: `${data.message}`,
            type: "success",
          });
          // window.alert("Add vaccin success", data.error);
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
      if (id !== undefined) {
        await fetch(`http://localhost:8000/patients/Vaccin/all/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setVaccinDB(data);
              })
              .catch((error) => {
                console.error("Error fetching Vaccin data:", error);
              });
          } else {
            console.error("Error resieving vaccin date", response.error);
          }
        });
      } else {
        history();
      }
    };
    fetchVaccinData();
  }, [history, id, user.token, VaccinDB]);
  // Edit Vaccin
  const handleEditRowSubmitt = async (event) => {
    event.preventDefault();

    if (editVaccinId !== undefined) {
      try {
        const response = await axios.patch(
          `http://localhost:8000/patients/Vaccin/${editVaccinId}`,
          {
            Nom_vaccin: editFormData.vaccinationVaccin,
            Date_vaccination: editFormData.vaccinationDate,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        // Handle response as needed
        if (!response.status === 200) {
          setNotify({
            isOpen: true,
            message: "vaccin updating failed",
            type: "error",
          });
        } else if (response.status === 200) {
          setNotify({
            isOpen: true,
            message: "vaccin updated successfully",
            type: "success",
          });
        }
      } catch (error) {
        window.alert(error);
      }
    } else {
      window.alert("editVaccinId undefined");
    }
  };
  // Delete Vaccin
  const handleDeleteClick = async (event, VaccinData) => {
    event.preventDefault();

    if (VaccinData !== undefined) {
      try {
        const response = await axios.delete(
          `http://localhost:8000/patients/Vaccin/${VaccinData}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        // Handle response as needed
        if (!response.status === 200) {
          setNotify({
            isOpen: true,
            message: "Deleting vaccin failed",
            type: "error",
          });
          // window.alert("Deleting vaccin failed", response.error);
        } else if (response.status === 200) {
          setNotify({
            isOpen: true,
            message: "Deleting vaccin success",
            type: "error",
          });
          // window.alert("Deleting vaccin success", response.error);
        }
      } catch (error) {
        window.alert(error);
      }
    } else {
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
            {VaccinDB?.map((VaccinData) => (
              <Fragment>
                {editVaccinId === VaccinData?._id ? (
                  <EditRow
                    editFromData={VaccinData}
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
            ))}
          </table>
        </form>
        {((user?.speciality.toLowerCase() === "sage femme" ||
          user?.speciality.toLowerCase() === "pediatre") ||
          (user?.speciality.toLowerCase() === "medecin" &&
            !(PatientData?.maturity === "Nouveau-ne"))) && (
          <div className="vaccination-add-button-class">
            <VaccinationAddButton
              addVaccinTable={addVaccinTable}
              setaddVaccinTable={setaddVaccinTable}
            />
          </div>
        )}
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
                  value={AgeRecommande}
                  onChange={(e) => {
                    setAgeRecommande(e.target.value);
                  }}
                >
                  <option selected disabled>
                    {AgeRecommande || "Age"}
                  </option>
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
                  {VaccinData
                    ? VaccinData.map((Vaccin) => (
                        <option value={Vaccin.nom}>{Vaccin.nom}</option>
                      ))
                    : null}
                </select>
              </div>

              <div className="form-table-item l-border">
                <select
                  className="vaccination-select"
                  name="vaccinationContre"
                  id="vaccination-contre"
                  onChange={(e) => {
                    setContreQuoi(e.target.value);
                  }}
                >
                  <option selected disabled>
                    {ContreQuoi || "Contre"}
                  </option>
                </select>
              </div>

              <div className="form-table-item l-border">
                <select
                  className="vaccination-select"
                  name="vaccinationTechnique"
                  id="vaccination-technique"
                  onChange={(e) => {
                    setTechnique(e.target.value);
                  }}
                >
                  <option selected disabled>
                    {Technique || "Technique"}
                  </option>
                </select>
              </div>

              <div className="form-table-item l-border r-border">
                <select
                  className="vaccination-select"
                  name="vaccinationNumero"
                  id="vaccination-numero"
                  onChange={(e) => {
                    setNumeroLot(e.target.value);
                  }}
                >
                  <option selected disabled>
                    {NumeroLot || "Numero"}
                  </option>
                </select>
              </div>

              <div className="form-table-item">
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
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
