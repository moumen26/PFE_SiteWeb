import React, { useState } from "react";
import MySwiper from "../components/swipers/swiperDossier";

import AddBebe from "../components/addBebe";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Antecedent() {
  const {id} = useParams();
  const {user} = useAuthContext();
  const Navigate = useNavigate();
  //delete the patient
  const handleDeletePatient = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/patients/${id}`,
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
Navigate(`/patients`);
  } catch (error) {
    window.alert(error.message);
  }
  };
  return (
    <div className="Antecedent">
      <div className="antecedent-container">
        <div className="antecedent-hedear">
          <input type="submit" value="Annuler" onClick={handleDeletePatient}/>
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
