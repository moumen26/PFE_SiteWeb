import React, { useState } from "react";
import MyAsideBarActive from "../components/asideBarActive";
import MyNavBar from "../components/navBar";
import DoctorProfileEnregistrerButton from "../components/doctorProfileEnregistrerButton";

export default function DoctorProfile() {
  const [act, setAct] = useState(false);

  return (
    <div className="Doctor-profile">
      <MyNavBar act={act} setAct={setAct}></MyNavBar>
      <div className="lh"></div>
      <MyAsideBarActive act={act} setAct={setAct}></MyAsideBarActive>
      <div className="doctor-profile-container">
        <div className="doctor-profile-title">
          <h2>profile</h2>
          <span>Gerez les parametre de votre profil</span>
        </div>
        <div className="doctor-profile-votre-photo">
          <h3>Votre photo de profile</h3>
          <div className="doctor-profile-photo-changer-btn">
            <div className="doctor-profile-photo"></div>
            <div className="doctor-profile-changer-btn">
              <label for="file" class="changer-image-btn">
                Choisir la photo
              </label>
              <input
                id="file"
                class="input-file"
                type="file"
              ></input>
              <button>Supprimer</button>
            </div>
          </div>
          <span>Ajouter votre photo, la taille recommandee est 256x256px</span>
        </div>
        <div className="doctor-profile-nom-hopital">
          <div className="doctor-profile-logo-hopital"></div>
          <h2>Nom de l'hopital</h2>
        </div>
        <form action="">
          <div className="doctor-profile-form-class">
            <div className="doctor-profile-form-item">
              <label htmlFor="">Prénom</label>
              <input type="text" placeholder="Entez votre Prenom.." />
            </div>
            <div className="doctor-profile-form-item">
              <label htmlFor="">Nom</label>
              <input type="text" placeholder="Entez votre Nom.." />
            </div>
          </div>
          <div className="doctor-profile-form-class">
            <div className="doctor-profile-form-item">
              <label htmlFor="">Specialite</label>
              <input type="text" placeholder="Entez votre Specialite.." />
            </div>
            <div className="doctor-profile-form-item">
              <label htmlFor="">Date de naissance</label>
              <input type="date" placeholder="Entez votre Nom.." />
            </div>
          </div>
          <div className="doctor-profile-form-class">
            <div className="doctor-profile-form-item">
              <label htmlFor="">Lieu de naissance</label>
              <input
                type="text"
                placeholder="Entez votre Lieu de naissance.."
              />
            </div>
            <div className="doctor-profile-form-item">
              <label htmlFor="">Sexe</label>
              <select name="">
                <option selected disabled>
                  Sexe
                </option>
                <option value="">Homme</option>
                <option value="">Femme</option>
              </select>
            </div>
          </div>
          <div className="doctor-profile-form-class">
            <div className="doctor-profile-form-item">
              <label htmlFor="">Email</label>
              <input type="email" placeholder="Entez votre Email.." />
            </div>
            <div className="doctor-profile-form-item">
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
          <div className="doctor-profile-form-class2">
            <div className="doctor-profile-forme-left-item">
              <div className="doctor-profile-form-item">
                <label htmlFor="">Address actuel</label>
                <input type="text" placeholder="Entez votre Address actuel.." />
              </div>
              <div className="doctor-profile-form-item">
                <label htmlFor="">Changer votre mot de pass</label>
                <input
                  type="password"
                  placeholder="Entez votre Mot de passe.."
                />
              </div>
            </div>
            <div className="doctor-profile-forme-right-item">
              <div className="doctor-profile-form-item">
                <label htmlFor="">Biographie</label>
                <textarea name="" placeholder="Votre Biographie"></textarea>
              </div>
            </div>
          </div>
        </form>
        <div className="form-span">
          <div className="form-span-item">
            <div className="form-div-carre"></div>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,
              molestiae?
            </span>
          </div>
          <div className="form-span-item">
            <div className="form-div-carre"></div>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,
              molestiae?
            </span>
          </div>
        </div>
        <div className="doctor-profile-enregistrer-class">
          <DoctorProfileEnregistrerButton />
        </div>
      </div>
    </div>
  );
}
