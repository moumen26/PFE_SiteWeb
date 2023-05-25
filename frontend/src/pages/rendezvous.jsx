import React, { useState } from "react";
import MyNavBar from "../components/navBar";
import DoctorProfileEnregistrerButton from "../components/doctorProfileEnregistrerButton";
import RendezvousProfileEnregistrerButton from "../components/rendezvousEnregistrerButton";

export default function Rendezvous() {
  const [act, setAct] = useState(false);
  return (
    <div className="Rendezvous">
      <div className="rendezvous-container">
        <div className="rendezvous-profile-title">
          <h2>Rendez-vous</h2>
          <span>Gerez les rendez-vous d’un patient</span>
        </div>
        <div className="rendezvous-nom-hopital">
          <div className="rendezvous-logo-hopital"></div>
          <h2>Nom de l'hopital</h2>
        </div>
        <form action="">
          <div className="rendezvous-form-class">
            <div className="rendezvous-form-item">
              <label htmlFor="">ID</label>
              <input type="text" placeholder="Identifiant unique.." />
            </div>
          </div>
          <div className="rendezvous-form-class">
            <div className="rendezvous-form-item">
              <label htmlFor="">Prénom</label>
              <input type="text" placeholder="Entez votre Prenom.." />
            </div>
            <div className="rendezvous-form-item">
              <label htmlFor="">Nom</label>
              <input type="text" placeholder="Entez votre Nom.." />
            </div>
          </div>
          <div className="rendezvous-form-class">
            <div className="rendezvous-form-item">
              <label htmlFor="">Sexe</label>
              <select name="sexe">
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
            </div>
            <div className="rendezvous-form-item">
              <label htmlFor="">Date de naissance</label>
              <input type="date" name="DateDeNaissance" />
            </div>
          </div>

          <div className="rendezvous-form-class">
            <div className="rendezvous-form-item">
              <label htmlFor="">Lieu de naissance</label>
              <input
                type="text"
                placeholder="Entez votre Lieu de naissance.."
                name="LieuDeNaissance"
              />
            </div>
            <div className="rendezvous-form-item">
              <label htmlFor="">Tel</label>
              <div className="telephone-input">
                <span>+213</span>
                <input
                  type="phone"
                  placeholder="Entez votre Numero de telephone.."
                />
              </div>
            </div>
          </div>
          <div className="rendezvous-form-class">
            <div className="rendezvous-form-item">
              <label htmlFor="">Address actuel</label>
              <input
                type="text"
                placeholder="Entez votre Address actuel.."
                name="AddressActuel"
              />
            </div>
            <div className="rendezvous-form-item">
              <label htmlFor="">Nombre d'enfant</label>
              <input
                type="number"
                placeholder="Entrez le nombre des enfants.."
              />
            </div>
          </div>
          <div className="rendezvous-enregistrer-class">
            <RendezvousProfileEnregistrerButton />
          </div>
        </form>
      </div>
    </div>
  );
}
