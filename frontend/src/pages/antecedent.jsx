import React, { useState } from "react";
import MyNavBar from "../components/navBar";
import MySwiper from "../components/swiperDossier";

export default function Antecedent() {
  const [act, setAct] = useState(false);

  return (
    <div className="Antecedent">
      <MyNavBar act={act} setAct={setAct}></MyNavBar>
      <div className="lh"></div>
      <div className="antecedent-container">
        <div className="antecedent-hedear">
          <input type="submit" value="Annuler" />
          <h2>Dossier maman</h2>
          <input type="submit" value="Enregistrer tout" />
        </div>
        <div className="antecedent-swipe">
          <div className="home-formulaire-swiper">
            <MySwiper></MySwiper>
          </div>
        </div>
        <div className="ajout-bebe">
          <input type="submit" value="Ajouter nouveau-ne" />
        </div>
      </div>
    </div>
  );
}
