import React, { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";

export default function Conculter() {
  const [diagnostic, setDiagnostic] = useState("");
  const [medicament, setMedicament] = useState("");


  const handleClickDiagnostic = () => {
    console.log("heelo");
    setDiagnostic(!diagnostic);
  };

  const handleClickMedicament = () => {
    console.log("heelo");
    setMedicament(!medicament);
  };

  let toggleClassDiagnostic = diagnostic ? " diagnostic" : "";
  let toggleClassMedicament = medicament ? " medicament" : "";

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
                      <div className="ordonance-item medicament-item">
                        <h3>Medicament :</h3>
                        <select name="" id="">
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
                        <input type="number" />
                      </div>
                      <div className="ordonance-item dose-item">
                        <h3>Dose :</h3>
                        <input type="text" />
                      </div>
                      <div className="ordonance-item duree-item">
                        <h3>Duree :</h3>
                        <input type="text" />
                      </div>
                      <input
                        type="submit"
                        value="Ajoute"
                        className="ajout-med-btn"
                      />
                    </div>
                    <div className="consultation-table-item-context-container"></div>
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
