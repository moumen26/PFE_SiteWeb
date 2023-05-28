import React, { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
import AddMedicamentReadOnlyRow from "../components/tables/tableAddMedicamentReadOnlyRow";

export default function Conculter() {
  
  const [examenOrdononce, setExamenOrdononce] = useState("");
  const [ConsultationData, setConsultationData] = useState("");
  const [DiagnosticData, setDiagnosticData] = useState("");
  const {user} = useAuthContext();
  const { id } = useParams();
  const history = useNavigate();
  const [MedicamentDB, setMedicamentDB] = useState("");
  const [diagnostic, setDiagnostic] = useState("");
  const [OrdonanceData, setOrdonanceData] = useState("");
  const [medicament, setMedicament] = useState("");
  const [Context, setContext] = useState("");
  const [Symptomes, setSymptomes] = useState("");
  const [NomMedicament, setNomMedicament] = useState("");
  const [DureeMedicament, setDureeMedicament] = useState("");
  const [DoseMedicament, setDoseMedicament] = useState("");
  const [QuantiteMedicament, setQuantiteMedicament] = useState("");
  const [medAddFormData, setMedAddFormData] = useState({
    medicament: "",
    quantite: "",
    dose: "",
    duree: "",
  });
  let toggleClassDiagnostic = diagnostic ? " diagnostic" : "";
  let toggleClassMedicament = medicament ? " medicament" : "";
  let toggleClassExamen = examenOrdononce ? " examen-ordononce" : "";

  // fetch Consultation Data
  useEffect(() => {
    const fetchConsultationData = async () => {
      if (id !== undefined) {
        await fetch(`http://localhost:8000/patients/Consultation/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setConsultationData(data);
              })
              .catch((error) => {
                console.error("Error fetching Consultation data:", error);
              });
          } else {
            console.error("Error resieving Consultation date", response.error);
          }
        });
      } else {
        history("/login");
      }
    };
    fetchConsultationData();
  }, [history, id, user?.token,ConsultationData]);
  //fetch Diagnostic data
  useEffect(() => {
    const fetchDiagnosticData = async () => {
      if (ConsultationData.DiagnosticID !== undefined) {
        await fetch(`http://localhost:8000/patients/Diagnostic/${ConsultationData.DiagnosticID}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setDiagnosticData(data);
              })
              .catch((error) => {
                console.error("Error fetching Diagnostic data:", error);
              });
          } else {
            console.error("Error resieving Diagnostic date", response.error);
          }
        });
      } else {

      }
    };
    fetchDiagnosticData();
  }, [ConsultationData,DiagnosticData,user?.token]);
  //fetch Ordonance data
  useEffect(() => {
    const fetchOrdonanceData = async () => {
      if (ConsultationData.OrdonanceID !== undefined) {
        await fetch(`http://localhost:8000/patients/Ordonance/${ConsultationData.OrdonanceID}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setOrdonanceData(data);
              })
              .catch((error) => {
                console.error("Error fetching Ordonances data:", error);
              });
          } else {
            console.error("Error resieving Ordonances date", response.error);
          }
        });
      }
    };
    fetchOrdonanceData();
  }, [OrdonanceData,ConsultationData,user?.token]);
  //fetch Medicament data
  useEffect(() => {
    const fetchMedicamentData = async () => {
      if (ConsultationData.OrdonanceID !== undefined) {
        await fetch(`http://localhost:8000/patients/Medicament/all/${ConsultationData.OrdonanceID}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setMedicamentDB(data);
              })
              .catch((error) => {
                console.error("Error fetching Medicaments data:", error);
              });
          } else {
            console.error("Error resieving Medicaments date", response.error);
          }
        });
      }
    };
    fetchMedicamentData();
  }, [MedicamentDB,ConsultationData,user?.token]);
//Add Diagnostic
  const handleClickAddDiagnostic = async () => {
    // Save the Diagnostic in the database
    try {
      const response = await fetch(`http://localhost:8000/patients/AddDiagnostic/${ConsultationData._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization : `Bearer ${user?.token}`
        },
        body: JSON.stringify({
          
        }),
      });
      // get the DiagnosticID via response from the server and redirect to the Diagnostic page
      const data = await response.json();
      if (!response.ok) {
        window.alert(data.message);
      }
      if (response.ok) {
        window.alert(data.message);
        setDiagnostic(!diagnostic);
      }
    } catch (error) {
      console.error("Error adding Diagnostic:", error);
    }
  };
//delete Diagnostic
  const handleClickDeleteDiagnostic = async () => {
    // Delete the Diagnostic in the database
    try {
        const response = await axios.delete(
          `http://localhost:8000/patients/Diagnostic/${DiagnosticData[0]._id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        const data = await response.data;
        if (!response.ok) {
          window.alert(data.message);
        }
        if (response.ok) {
          window.alert(data.message);
        }
      setDiagnostic(!diagnostic);
    } catch (error) {
      console.error("Error Deleting Diagnostic:", error);
    }
  };
//Add Ordonance
  const handleClickAddOrdonance = async () => {
    // Save the Ordonance in the database
    try {
      const response = await fetch(`http://localhost:8000/patients/AddOrdonance/${ConsultationData._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization : `Bearer ${user?.token}`
        },
        body: JSON.stringify({
          
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        window.alert(data.message);
      }
      if (response.ok) {
        window.alert(data.message);
        setMedicament(!medicament);
      }
      console.error(MedicamentDB);
    } catch (error) {
      console.error("Error adding Ordonance:", error);
    }
  };
//delete Ordonance
  const handleClickDeleteOrdonance = async () => {
    // Delete the Ordonance in the database
    try {
        const response = await axios.delete(
          `http://localhost:8000/patients/Ordonance/${OrdonanceData[0]._id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        const data = await response.data;
        if (!response.ok) {
          window.alert(data.message);
        }
        if (response.ok) {
          window.alert(data.message);
        }
        setMedicament(!medicament);
    } catch (error) {
      console.error("Error Ordonance Diagnostic:", error);
    }
  };
//delete the consultation
  const handleDeleteConsultation = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/patients/Consultation/${ConsultationData._id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      const data = await response.data;
      if (!response.ok) {
        window.alert(data.message);
      }
      if (response.ok) {
        window.alert(data.message);
      }
      history(`/Nouveaune`);
  } catch (error) {
    console.error("Error Deleting Diagnostic:", error);
  }
  };
//Update the Diagnostic
  const handleUpdateDiagnostic = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/patients/Diagnostic/${DiagnosticData[0]._id}`,
        {
          Context, Symptomes
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      const data = await response.data;
      if (!response.ok) {
        window.alert(data.message);
      }
      if (response.ok) {
        window.alert(data.message);
      }
    setDiagnostic(!diagnostic);
  } catch (error) {
    console.error("Error Deleting Diagnostic:", error);
  }
  };
//delete Medicament
  const handleMedDeleteClick = async (MedicamentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/patients/Medicament/${MedicamentId}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      const data = await response.data;
      if (!response.ok) {
        window.alert(data.message);
      }
      if (response.ok) {
        window.alert(data.message);
      }
  } catch (error) {
    console.error("Error Deleting Medicament:", error);
  }
  };
//Add Medicament
  const handleAddMedicament = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/patients/AddMedicament/${OrdonanceData[0]._id}`,
        {
          NomMedicament, DureeMedicament, DoseMedicament, QuantiteMedicament
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      const data = await response.data;
      if (!response.ok) {
        window.alert(data.message);
      }
      if (response.ok) {
        window.alert(data.message);
      }
  } catch (error) {
    console.error("Error Adding Medicament:", error);
  }
  };
// Examen
  const handleClickExamen = () => {
    setExamenOrdononce(!examenOrdononce);
  };

  const handleAddMedFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newMedicamentDB = { ...medAddFormData };
    newMedicamentDB[fieldName] = fieldValue;

    setMedAddFormData(newMedicamentDB);
  };

  const handleMedAddFormSubmit = (event) => {
    event.preventDefault();

    const newMedicament = {
      medicament: medAddFormData.medicament,
      quantite: medAddFormData.quantite,
      dose: medAddFormData.dose,
      duree: medAddFormData.duree,
    };

    const newMedicamentDB = [...MedicamentDB, newMedicament];
    setMedicamentDB(newMedicamentDB);
  };

  return (
    <div className="Conculter">
      <div className="conculter-container">
        <div className="conculter-hedear">
          <input type="submit" value="Annuler" onClick={handleDeleteConsultation}/>
          <h2>Consultation</h2>
          <input type="submit" value="Enregistrer tout" onClick={handleUpdateDiagnostic}/>
        </div>
        <div className="contenu-consultation">
          <h2>contenu de la consultation :</h2>
          <div className="info-personal-concultation">
            <h3>
              Numéro : <span>19203204585</span>
            </h3>
            <h3>
              Nom et Prénom : <span>Boumrar Zine eddine</span>
            </h3>
            <div className="time-date-concultation">
              <h3>02 : 11 : 57</h3>
              <h3>2023-05-26</h3>
            </div>
          </div>
          <div className="consultation-table">
            <div className="consultation-table-container">
              <div className="consultation-table-item">
                <div
                  className={`consultation-table-item-header${toggleClassDiagnostic}`}
                  //onClick={handleClickDiagnostic}
                  diagnostic={diagnostic}
                  setDiagnostic={setDiagnostic}
                >
                  <h2>Diagnostic</h2>
                  <BiChevronUp className="up-icon" 
                  onClick={handleClickDeleteDiagnostic}
                  diagnostic={diagnostic}
                  setDiagnostic={setDiagnostic}/>
                  <BiChevronDown
                    className="down-icon"
                    onClick={handleClickAddDiagnostic}
                    diagnostic={diagnostic}
                    setDiagnostic={setDiagnostic}
                  />
                </div>
                <div className="consultation-table-item-contenu">
                  <div
                    className={`consultation-table-item-context${toggleClassDiagnostic}`}
                  >
                    <div className="consultation-table-item-context-header">
                      <h2>Context :</h2>
                      <IoIosClose className="close-icon" />
                    </div>
                    <div className="consultation-table-item-context-container">
                      <textarea id="" placeholder="Ecrire ici..."
                        name="Context"
                        value={Context}
                        onChange={(e) => setContext(e.target.value)}
                      ></textarea>
                      <h2>Symbtome :</h2>
                      <input type="text" placeholder="fiévre, faiblesse..." 
                        name="Symptomes"
                        value={Symptomes}
                        onChange={(e) => setSymptomes(e.target.value)}
                        />
                    </div>
                  </div>
                </div>
              </div>
              <div className="consultation-table-item">
                <div
                  className={`consultation-table-item-header consul-ligne2${toggleClassMedicament}`}
                >
                  <h2>Ordonance</h2>
                  <BiChevronUp className="up-icon" 
                    onClick={handleClickDeleteOrdonance}
                    medicament={medicament}
                    setMedicament={setMedicament}
                  />
                  <BiChevronDown
                    className="down-icon"
                    onClick={handleClickAddOrdonance}
                    medicament={medicament}
                    setMedicament={setMedicament}
                  />
                </div>
                <div className="consultation-table-item-contenu">
                  <div
                    className={`consultation-table-item-context${toggleClassMedicament}`}
                  >
                    <div className="consultation-table-item-context-header">
                      <form onSubmit={handleMedAddFormSubmit}>
                        <div className="ordonance-item medicament-item">
                          <h3>Medicament :</h3>
                          <select
                            required="required"
                            name="NomMedicament"
                            value={NomMedicament}
                            onChange={(e) => setNomMedicament(e.target.value)}
                          >
                            <option selected disabled>
                              sélectionnez un medicament
                            </option>
                            <option value="med1">medicament1</option>
                            <option value="med2">medicament2</option>
                            <option value="med3">medicament3</option>
                            <option value="med4">medicament4</option>
                          </select>
                        </div>
                        <div className="ordonance-item quantite-item">
                          <h3>Quantité :</h3>
                          <input
                            type="number"
                            name="QuantiteMedicament"
                            value={QuantiteMedicament}
                            onChange={(e) => setQuantiteMedicament(e.target.value)}
                          />
                        </div>
                        <div className="ordonance-item dose-item">
                          <h3>Dose :</h3>
                          <input
                            type="text"
                            name="DoseMedicament"
                            value={DoseMedicament}
                            onChange={(e) => setDoseMedicament(e.target.value)}
                          />
                        </div>
                        <div className="ordonance-item duree-item">
                          <h3>Duree :</h3>
                          <input
                            type="text"
                            name="DureeMedicament"
                            value={DureeMedicament}
                            onChange={(e) => setDureeMedicament(e.target.value)}
                          />
                        </div>
                        <input
                          type="submit"
                          value="Ajoute"
                          onClick={handleAddMedicament}
                          className="ajout-med-btn"
                        />
                      </form>
                    </div>
                    {MedicamentDB[0] ? MedicamentDB.map((Medicament) => (
                      <div className="consultation-table-item-context-container ord-med">
                        <AddMedicamentReadOnlyRow
                          Medicament={Medicament}
                          handleMedDeleteClick={handleMedDeleteClick}
                        />
                      </div>
                    )) : null}
                  </div>
                </div>
              </div>
              <div className="consultation-table-item">
                <div
                  className={`consultation-table-item-header consul-ligne2${toggleClassExamen}`}
                  onClick={handleClickExamen}
                  examenOrdononce={examenOrdononce}
                  setExamenOrdononce={setExamenOrdononce}
                >
                  <h2>Examen</h2>
                  <BiChevronUp className="up-icon" />
                  <BiChevronDown
                    className="down-icon"
                    onClick={handleClickExamen}
                    examenOrdononce={examenOrdononce}
                    setExamenOrdononce={setExamenOrdononce}
                  />
                </div>
                <div className="consultation-table-item-contenu">
                  <div
                    className={`consultation-table-item-context${toggleClassExamen}`}
                  >
                    <div className="consultation-table-item-context-container consultation-examen"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
