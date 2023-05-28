import React, { useState } from "react";
import MySwiper from "../components/swipers/swiperDossier";

import AddBebe from "../components/addBebe";

export default function Antecedent() {
  return (
    <div className="Antecedent">
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
        <AddBebe />
      </div>
    </div>
  );
}
