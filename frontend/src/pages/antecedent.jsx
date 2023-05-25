import React, { useState } from "react";
import MyNavBar from "../components/navBar";
import MySwiper from "../components/swiperDossier";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Antecedent() {
  const [act, setAct] = useState(false);
  const history = useNavigate();
  const {id} = useParams();
  const { user } = useAuthContext();
  const current = new Date();
  const Date_daccouchement = `${current.getDate()}-${current.getMonth() + 1}-${current.getFullYear()}`;
  const Heure_daccouchement = current.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, });
  const handleAddNouveauNe = async () => {
    try {
      const response = await fetch(`http://localhost:8000/patients/Nouveau-ne/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization : `Bearer ${user?.token}`
        },
        body: JSON.stringify({
          idAccoucheur: user?.id,
          Date_daccouchement,
          Heure_daccouchement,
        }),
      });
      // get the patientID via response from the server patientRouter.post
      const data = await response.json();
      if (!response.ok) {
        window.alert("Add patient failed", data.error);
      }
      if (response.ok) {
        try {
          const response = await fetch(`http://localhost:8000/patients/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization : `Bearer ${user?.token}`
            },
            body: JSON.stringify({
              idNouveauNe: data._id
            }),
          });
          // get the patientID via response from the server patientRouter.post
          const data = await response.json();
          if (!response.ok) {
            window.alert("Add idNouveauNe failed", data.error);
          }
          if (response.ok) {
            
            history(`/patients/${await data.id}`);
          }
        } catch (error) {
          console.error("Error adding article:", error);
        }
        history(`/patients/${await data.id}`);
      }
    } catch (error) {
      console.error("Error adding article:", error);
    }
  };
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
          <input type="submit" value="Ajouter nouveau-ne" onClick={handleAddNouveauNe}/>
        </div>
      </div>
    </div>
  );
}
