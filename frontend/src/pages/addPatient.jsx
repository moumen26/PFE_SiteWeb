import React, { useState } from "react";
import AddCahierSante from "../components/addCahierButton";
import MyAsideBar from "../components/asideBar";
import MyAsideBarActive from "../components/asideBarActive";
import MyNavBar from "../components/navBar";
import MyCahierSwiper from "../components/swipeCahier";
import MySwiper from "../components/swiperDossier";
import MyVaccinationTable from "../components/vaccinationTable";
import VaccinationAddButton from "../components/vaccinationAddButton";
import AddVaccinButton from "../components/addVaccinButton";
import AddVisiteButton from "../components/addVisiteButton";
import MyVisteTable from "../components/visiteTable";
import VisiteAddButton from "../components/visiteAddButton";
import AddVisiteButton2 from "../components/addVisiteButton2";
import AddVaccinButtonTable from "../components/addVaccinButton2";
import MyVaccinationTable2 from "../components/vaccinationTable2";
import AjouteVaccinButton from "../components/ajouteVaccinButton";
import CloseButton from "../components/closeButtonTableVaccin";
import VaccinationAddButton2 from "../components/vaccinationAddButton2";
import CloseButton2 from "../components/closeButtonTableVaccin2";

export default function AddPatient() {
  const [act, setAct] = useState(false);
  const [add, setAdd] = useState(false);
  const [addVaccin, setAddvacin] = useState(false);
  const [addVaccin2, setAddVaccin2] = useState(false);
  const [addVisite, setAddvisite] = useState(false);
  const [addVisite2, setAddvisite2] = useState(false);
  const [addVaccinTable, setaddVaccinTable] = useState(false);
  const [addVaccinTable2, setaddVaccinTable2] = useState(false);


  let toggleClassAdd = add ? " add-cahier-active" : "";
  let toggleClassAddVaccin = addVaccin ? " add-vaccin-active" : "";
  let toggleClassAddVaccin2 = addVaccin2 ? " add-vaccin-active2" : "";
  let toggleClassAddVisite = addVisite ? " add-visite-active" : "";
  let toggleClassAddVisite2 = addVisite2 ? " add-visite-active2" : "";
  let toggleClassAddVaccinTable = addVaccinTable
    ? " add-Vaccin-Table-active"
    : "";
  let toggleClassAddVaccinTable2 = addVaccinTable2
    ? " add-Vaccin-Table-active2"
    : "";

  return (
    <div className="AddPatient">
      <MyNavBar act={act} setAct={setAct}></MyNavBar>
      <div className="lh"></div>
      <MyAsideBar></MyAsideBar>
      <MyAsideBarActive act={act} setAct={setAct}></MyAsideBarActive>
      <div className="addpatient-container">
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
        <div className="home-formulaire-swiper">
          <MySwiper></MySwiper>
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
          <div className="vaccin-table-container">
            <h2>Vaccination :</h2>
            <MyVaccinationTable />
            <div className="vaccination-add-button-class">
              <VaccinationAddButton
                addVaccinTable={addVaccinTable}
                setaddVaccinTable={setaddVaccinTable}
              />
            </div>
          </div>
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
          <div className={`vaccin-table2${toggleClassAddVaccin2}`}>
            <div className="vaccin-table-container">
              <h2>Vaccination :</h2>
              <MyVaccinationTable />
              <div className="vaccination-add-button-class">
                <VaccinationAddButton2
                  addVaccinTable2={addVaccinTable2}
                  setaddVaccinTable2={setaddVaccinTable2}
                />
              </div>
            </div>
          </div>
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
          <MyVaccinationTable2 />
          <div className="add-tableau-vaccin-ajouter-btn">
            <AjouteVaccinButton />
          </div>
        </div>
      </div>
      <div className={`add-tableau-vaccin2${toggleClassAddVaccinTable2}`}>
        <div className="add-tableau-vaccin2-container">
          <div className="add-tableau-vaccin2-close-class">
            <CloseButton2
              addVaccinTable2={addVaccinTable2}
              setaddVaccinTable2={setaddVaccinTable2}
            />
          </div>
          <MyVaccinationTable2 />
          <div className="add-tableau-vaccin-ajouter-btn">
            <AjouteVaccinButton />
          </div>
        </div>
      </div>
    </div>
  );
}
