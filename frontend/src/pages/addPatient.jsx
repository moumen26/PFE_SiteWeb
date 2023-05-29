import React, { useState } from "react";
import AddCahierSante from "../components/buttons/buttonAddCahier";
import MyCahierSwiper from "../components/swipers/swiperCahier";
import FichierPatient from "../components/fichierPatient";
import AddVaccinButton from "../components/buttons/buttonAddVaccin";
import AddVisiteButton from "../components/buttons/buttonAddVisite";
import MyVisteTable from "../components/tables/tableVisite";
import VisiteAddButton from "../components/buttons/buttonVisiteAdd";
import AddVisiteButton2 from "../components/buttons/buttonAddVisite2";
import AddVaccinButtonTable from "../components/buttons/buttonAddVaccin2";
import VaccinTable from "../components/tables/tableAddPatientVaccin";
import AddConcultation from "../components/buttons/buttonAddConcultation";
import TableConcultation from "../components/tables/tableConcultation";

export default function AddPatient() {
  const [add, setAdd] = useState(false);
  const [addVaccin, setAddvacin] = useState(false);
  const [addVaccin2, setAddVaccin2] = useState(false);
  const [addVisite, setAddvisite] = useState(false);
  const [addVisite2, setAddvisite2] = useState(false);
  const [addConsultation, setAddConsultation] = useState(false);

  let toggleClassAdd = add ? " add-cahier-active" : "";
  let toggleClassAddVaccin = addVaccin ? " add-vaccin-active" : "";
  let toggleClassAddVaccin2 = addVaccin2 ? " add-vaccin-active2" : "";
  let toggleClassAddVisite = addVisite ? " add-visite-active" : "";
  let toggleClassAddVisite2 = addVisite2 ? " add-visite-active2" : "";
  let toggleClassAddConcultation = addConsultation
    ? " add-concultation-active"
    : "";

  return (
    <div className="AddPatient">
      <div className="addpatient-container">
        <div className="addpatient-hedear">
          <input type="submit" value="Annuler" />
          <h2>Dossier nouveau-ne</h2>
          <input type="submit" value="Enregistrer tout" />
        </div>
        <div className="top">
          <div className="top-titre">
            <h2>Dossier patient</h2>
          </div>
          <div className="top-right">
            <div className="service">
              <h3>Nom de service :</h3>
            </div>
            <div className="paraticien">
              <h3>Nom de praticien :</h3>
              <a href="#">Dr. Khaldi</a>
            </div>
          </div>
        </div>
        <div className="home-formulaire">
          <FichierPatient />
        </div>
      </div>
      <div className="addpatient-add-cahier">
        <AddCahierSante add={add} setAdd={setAdd} />
      </div>
      <div className={`cahier-vaccin${toggleClassAdd}`}>
        <div className="cahier-sante-title">
          <h2>Carnet de sante :</h2>
        </div>
        <div className="cahier-formulaire-swiper">
          <MyCahierSwiper></MyCahierSwiper>
        </div>
        <div
          className={`vaccin-visite-class${toggleClassAddVaccin} vaccin-visite-class${toggleClassAddVisite2}`}
        >
          <AddVaccinButton addVaccin={addVaccin} setAddvacin={setAddvacin} />
          <AddVisiteButton2
            addVisite2={addVisite2}
            setAddvisite2={setAddvisite2}
          />
        </div>
        <div className={`vaccin-table${toggleClassAddVaccin}`}>
          <VaccinTable />
          <div className="addpatient-add-visite">
            <AddVisiteButton
              addVisite={addVisite}
              setAddvisite={setAddvisite}
            />
          </div>
          <div className={`visite-table${toggleClassAddVisite}`}>
            <div className="visite-table-container">
              <h2>Visites systematique de 1 a 3 mois</h2>
              <MyVisteTable />
              <div className="visite-add-button-class">
                <VisiteAddButton />
              </div>
              <div className="addpatient-add-consultation">
                <AddConcultation
                  addConsultation={addConsultation}
                  setAddConsultation={setAddConsultation}
                />
              </div>
            </div>
            <div className={`concultation-table${toggleClassAddConcultation}`}>
              <TableConcultation />
            </div>
          </div>
        </div>

        <div className={`visite-table2${toggleClassAddVisite2}`}>
          <div className="visite-table-container">
            <h2>Visites systematique de 1 a 3 mois</h2>
            <MyVisteTable />
            <div className="visite-add-button-class">
              <VisiteAddButton />
            </div>
          </div>
          <div className="addpatient-add-vaccin">
            <AddVaccinButtonTable
              addVaccin2={addVaccin2}
              setAddVaccin2={setAddVaccin2}
            />
          </div>
          <div className={`visite-table2${toggleClassAddVaccin2}`}>
            <VaccinTable />
            <div className="addpatient-add-consultation">
              <AddConcultation
                addConsultation={addConsultation}
                setAddConsultation={setAddConsultation}
              />
            </div>
            <div className={`concultation-table${toggleClassAddConcultation}`}>
              <TableConcultation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
