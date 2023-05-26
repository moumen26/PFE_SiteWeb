import React, { useState } from "react";
import data from "../MeddicamentDataBase.json";
import { nanoid } from "nanoid";
import AddMedicamentReadOnlyRow from "../components/addMedicamentReadOnlyRow";

export default function AffichageConcultation() {
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

  return (
    <div className="Affichage-concultation">
      <div className="affichage-concultation-container">
        <div className="affichage-concultation-header">
          <h3>
            Medcin : <span>Dr. Hakem Yacine</span>
          </h3>
          <div className="time-date-concultation">
            <h3>02 : 11 : 57</h3>
            <h3>2023-05-26</h3>
          </div>
        </div>
        <div className="consultation-table">
          <div className="consultation-table-container">
            <div className="consultation-table-item">
              <div className="consultation-table-item-header">
                <h2>Diagnostic</h2>
              </div>
              <div className="consultation-table-item-contenu">
                <div className="consultation-table-item-context">
                  <div className="consultation-table-item-context-header">
                    <h2>Context :</h2>
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
              <div className="consultation-table-item-header consul-ligne2">
                <h2>Ordonance</h2>
              </div>
              <div className="consultation-table-item-contenu">
                <div className="consultation-table-item-context">
                  {MedicamentDB?.map((Medicament) => (
                    <div className="consultation-table-item-context-container ord-med">
                      <AddMedicamentReadOnlyRow Medicament={Medicament} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="consultation-table-item">
              <div className="consultation-table-item-header consul-ligne2">
                <h2>Examen</h2>
              </div>
              <div className="consultation-table-item-contenu">
                <div className="consultation-table-item-context">
                  <div className="consultation-table-item-context-container consultation-examen"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
