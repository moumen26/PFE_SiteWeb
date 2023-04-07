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

export default function AddPatient() {
  const [act, setAct] = useState(false);
  const [add, setAdd] = useState(false);
  const [addVaccin, setAddvacin] = useState(false);
  const [addVisite, setAddvisite] = useState(false);


  let toggleClassAdd = add ? " add-cahier-active" : "";
  let toggleClassAddVaccin = addVaccin ? " add-vaccin-active" : "";
  let toggleClassAddVisite = addVisite ? " add-visite-active" : "";

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
        <div className={`vaccin-visite-class${toggleClassAddVaccin}`}>
          <AddVaccinButton addVaccin={addVaccin} setAddvacin={setAddvacin} />
          <AddVisiteButton />
        </div>
        <div className={`vaccin-table${toggleClassAddVaccin}`}>
          <div className="vaccin-table-container">
            <h2>Vaccination :</h2>
            <MyVaccinationTable />
            <div className="vaccination-add-button-class">
              <VaccinationAddButton />
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
      </div>
    </div>
  );
}
