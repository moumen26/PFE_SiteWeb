import React, { useState } from "react";
import AddCahierSante from "../components/addCahier";
import MyAsideBar from "../components/asideBar";
import MyAsideBarActive from "../components/asideBarActive";
import MyNavBar from "../components/navBar";
import MyCahierSwiper from "../components/swipeCahier";
import MySwiper from "../components/swiperDossier";

export default function AddPatient() {
  const [act, setAct] = useState(false);
  /*const [add, setAdd] = useState(false);*/

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
        <AddCahierSante /* add={add} setAdd={setAdd}*/ />
        <div className="cahier-formulaire-swiper">
          <MyCahierSwiper></MyCahierSwiper>
        </div>
      </div>
    </div>
  );
}
