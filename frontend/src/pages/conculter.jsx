import React, { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import { nanoid } from "nanoid";
import data from "../MeddicamentDataBase.json";

import AddMedicamentReadOnlyRow from "../components/addMedicamentReadOnlyRow";

export default function Conculter() {
  const [diagnostic, setDiagnostic] = useState("");
  const [medicament, setMedicament] = useState("");
  const [examenOrdononce, setExamenOrdononce] = useState("");

  const [MedicamentDB, setMedicamentDB] = useState(data);

  const [medAddFormData, setMedAddFormData] = useState({
    medicament: "",
    quantite: "",
    dose: "",
    duree: "",
  });

  
  const handleMedAddFormSubmit = (event) => {
    event.preventDefault();

    const newMedicament = {
      id: nanoid(),
      Nom_med: medAddFormData.medicament,
      Quantite_med: medAddFormData.quantite,
      Dose_med: medAddFormData.dose,
      Duree_med: medAddFormData.duree,
    };

    const newMedicamentDB = [...MedicamentDB, newMedicament];
    setMedicamentDB(newMedicamentDB);
  };

  
  const handleMedDeleteClick = (MedicamentId) => {
    const newMedicament = [...MedicamentDB];

    const index = MedicamentDB.findIndex(
      (Medicament) => Medicament.id === MedicamentId
    );

    newMedicament.splice(index, 1);

    setMedicamentDB(newMedicament);
  };

  const handleClickDiagnostic = () => {
    setDiagnostic(!diagnostic);
  };

  const handleClickMedicament = () => {
    setMedicament(!medicament);
  };

   const handleClickExamen = () => {
     setExamenOrdononce(!examenOrdononce);
   };

  let toggleClassDiagnostic = diagnostic ? " diagnostic" : "";
  let toggleClassMedicament = medicament ? " medicament" : "";
  let toggleClassExamen = examenOrdononce ? " examen-ordononce" : "";


  return (
    <div className="Conculter">
      <div className="conculter-container">
        <div className="conculter-hedear">
          <input type="submit" value="Annuler" />
          <h2>Consultation</h2>
          <input type="submit" value="Enregistrer tout" />
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
                  onClick={handleClickDiagnostic}
                  diagnostic={diagnostic}
                  setDiagnostic={setDiagnostic}
                >
                  <h2>Diagnostic</h2>
                  <BiChevronUp className="up-icon" />
                  <BiChevronDown
                    className="down-icon"
                    onClick={handleClickDiagnostic}
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
                      <textarea
                        name=""
                        id=""
                        placeholder="Ecrire ici..."
                      ></textarea>
                      <h2>Symbtome :</h2>
                      <input type="text" placeholder="fiévre, faiblesse..." />
                    </div>
                  </div>
                </div>
              </div>
              <div className="consultation-table-item">
                <div
                  className={`consultation-table-item-header consul-ligne2${toggleClassMedicament}`}
                  onClick={handleClickMedicament}
                  medicament={medicament}
                  setMedicament={setMedicament}
                >
                  <h2>Ordonance</h2>
                  <BiChevronUp className="up-icon" />
                  <BiChevronDown
                    className="down-icon"
                    onClick={handleClickMedicament}
                    medicament={medicament}
                    setMedicament={setMedicament}
                  />
                </div>
                <div className="consultation-table-item-contenu">
                  <div
                    className={`consultation-table-item-context${toggleClassMedicament}`}
                  >
                    <div className="consultation-table-item-context-header">
                      <form>
                        <div className="ordonance-item medicament-item">
                          <h3>Medicament :</h3>
                          <select
                            name="medicament"
                            onChange={handleMedAddFormSubmit}
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
                            name="quantite"
                            onChange={handleMedAddFormSubmit}
                          />
                        </div>
                        <div className="ordonance-item dose-item">
                          <h3>Dose :</h3>
                          <input
                            type="text"
                            name="dose"
                            onChange={handleMedAddFormSubmit}
                          />
                        </div>
                        <div className="ordonance-item duree-item">
                          <h3>Duree :</h3>
                          <input
                            type="text"
                            name="duree"
                            onChange={handleMedAddFormSubmit}
                          />
                        </div>
                        <input
                          type="submit"
                          value="Ajoute"
                          className="ajout-med-btn"
                        />
                      </form>
                    </div>
                    {MedicamentDB?.map((Medicament) => (
                      <div className="consultation-table-item-context-container ord-med">
                        <AddMedicamentReadOnlyRow
                          Medicament={Medicament}
                          handleMedDeleteClick={handleMedDeleteClick}
                        />
                      </div>
                    ))}
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
                    <div className="consultation-table-item-context-container consultation-examen">
         
                    </div>
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
