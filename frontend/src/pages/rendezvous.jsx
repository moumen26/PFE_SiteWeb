import React, { useState } from "react";
import MyNavBar from "../components/navBar";
import DoctorProfileEnregistrerButton from "../components/buttons/buttonDoctorProfileEnregistrer";
import RendezvousProfileEnregistrerButton from "../components/buttons/buttonRendezvousEnregistrer";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Rendezvous() {
  const [act, setAct] = useState(false);
  const { user } = useAuthContext();
  const history = useNavigate();
  const { id } = useParams();
  const [identificationMaman, setIdentificationMaman] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Nom, setNom] = useState("");
  const [DateDeNaissance, setDateDeNaissance] = useState("");
  const [Sexe, setSexe] = useState("");
  const [Phone, setPhone] = useState("");
  const [LieuDeNaissance, setLieuDeNaissance] = useState("");
  const [AddressActuel, setAddressActuel] = useState("");
  const [NombreEnfant, setNombreEnfant] = useState("");
  const handleUpdatePatient = async () => {
    if (id !== undefined) {
      try {
        const response = await axios.patch(
          `http://localhost:8000/patients/${id}`,
          {
            identificationMaman,
            Prenom,
            Nom,
            DateDeNaissance,
            Sexe,
            Phone,
            LieuDeNaissance,
            AddressActuel,
            NombreEnfant,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await response.status;
        if (data === 200) {
          history(`/antecedent/${id}`);
        }
        if (data !== 200) {
          window.alert("Erreur lors de l'enregistrement");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      history(`/patients`);
    }
  };
  const handleAddPatient = async () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    try {
      const response = await fetch("http://localhost:8000/patients/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          idAccoucheur: user?.id,
          identificationMaman,
          Prenom,
          Nom,
          DateDeNaissance,
          Sexe,
          Phone,
          LieuDeNaissance,
          AddressActuel,
          NombreEnfant,
        }),
      });
      // get the patientID via response from the server patientRouter.post
      const data = await response.json();
      if (!response.ok) {
        window.alert("Add patient failed", data.error);
      }
      if (response.ok) {
        history(`/antecedent/${await data.id}`);
      }
    } catch (error) {
      console.error("Error adding article:", error);
    }
  };
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  return (
    <div className="Rendezvous">
      <div className="rendezvous-container">
        <div className="rendezvous-profile-title">
          <h2>Ajouter un patient</h2>
        </div>
        <div className="rendezvous-nom-hopital">
          <h2>{user.Hopital}</h2>
        </div>
        <div className="Rendezvous-form">
          <div className="rendezvous-form-class">
            <div className="rendezvous-form-item">
              <label htmlFor="">ID</label>
              <input
                type="text"
                placeholder="Identifiant unique.."
                name="identificationMaman"
                defaultValue={identificationMaman}
                onChange={(event) => setIdentificationMaman(event.target.value)}
              />
            </div>
          </div>
          <div className="rendezvous-form-class">
            <div className="rendezvous-form-item">
              <label htmlFor="">Prénom</label>
              <input
                type="text"
                placeholder="Entez votre Prenom.."
                name="prenom"
                defaultValue={Prenom}
                onChange={(event) => setPrenom(event.target.value)}
              />
            </div>
            <div className="rendezvous-form-item">
              <label htmlFor="">Nom</label>
              <input
                type="text"
                placeholder="Entez votre Nom.."
                name="nom"
                defaultValue={Nom}
                onChange={(event) => setNom(event.target.value)}
              />
            </div>
          </div>
          <div className="rendezvous-form-class">
            <div className="rendezvous-form-item">
              <label>Sexe</label>
              <select
                name="sexe"
                defaultValue={Sexe}
                onChange={(event) => setSexe(event.target.value)}
              >
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
            </div>
            <div className="rendezvous-form-item">
              <label htmlFor="">Date de naissance</label>
              <input
                type="date"
                name="DateDeNaissance"
                defaultValue={DateDeNaissance}
                onChange={(event) => setDateDeNaissance(event.target.value)}
              />
            </div>
          </div>

          <div className="rendezvous-form-class">
            <div className="rendezvous-form-item">
              <label htmlFor="">Lieu de naissance</label>
              <input
                type="text"
                placeholder="Entez votre Lieu de naissance.."
                name="LieuDeNaissance"
                defaultValue={LieuDeNaissance}
                onChange={(event) => setLieuDeNaissance(event.target.value)}
              />
            </div>
            <div className="rendezvous-form-item">
              <label htmlFor="">Tel</label>
              <div className="telephone-input">
                <span>+213</span>
                <input
                  type="phone"
                  placeholder="Entez votre Numero de telephone.."
                  name="Phone"
                  defaultValue={Phone}
                  onChange={(event) => setPhone(event.target.value)}
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
                defaultValue={AddressActuel}
                onChange={(event) => setAddressActuel(event.target.value)}
              />
            </div>
            <div className="rendezvous-form-item">
              <label htmlFor="">Nombre d'enfant</label>
              <input
                type="number"
                placeholder="Entrez le nombre des enfants.."
                name="NombreEnfant"
                defaultValue={NombreEnfant}
                onChange={(event) => setNombreEnfant(event.target.value)}
              />
            </div>
          </div>
          <div className="rendezvous-enregistrer-class">
            <RendezvousProfileEnregistrerButton
              handlePatient={handleAddPatient}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
