import React, { useEffect, useState } from "react";
import AddCahierSante from "../components/buttons/buttonAddCahier";
import MyCahierSwiper from "../components/swipers/swiperCahier";
import FichierPatient from "../components/fichierPatient";
import AddVaccinButton from "../components/buttons/buttonAddVaccin";
import AddVisiteButton from "../components/buttons/buttonAddVisite";
import MyVisteTable from "../components/tables/tableVisite";
import VisiteAddButton from "../components/buttons/buttonVisiteAdd";
import AddVisiteButton2 from "../components/buttons/buttonAddVisite2";
import AddVaccinButtonTable from "../components/buttons/buttonAddVaccin2";
import VaccinTable from "../components/tables/tableAddPatientVaccin";
import AddConsultation from "../components/buttons/buttonAddConsultation";
import TableConsultation from "../components/tables/tableConcultation";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Notification from "../components/notification/notification";
import ConfirmDialog from "../components/dialoges/dialogeAlert";

export default function AddPatient() {
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
  const [add, setAdd] = useState(false);
  const [addVaccin, setAddvacin] = useState(false);
  const [addVaccin2, setAddVaccin2] = useState(false);
  const [addVisite, setAddvisite] = useState(false);
  const [addVisite2, setAddvisite2] = useState(false);
  const [addConsultation, setAddConsultation] = useState(false);

  let toggleClassAdd = add ? " add-cahier-active" : "";
  let toggleClassAddVaccin = addVaccin ? " add-vaccin-active" : "";
  let toggleClassAddVaccin2 = addVaccin2 ? " add-vaccin-active2" : "";
  let toggleClassAddVisite = addVisite ? " add-visite-active" : "";
  let toggleClassAddVisite2 = addVisite2 ? " add-visite-active2" : "";
  let toggleClassAddConcultation = addConsultation
    ? " add-concultation-active"
    : "";
  const [Poids, setPoids] = useState("");
  const [Aspect, setAspect] = useState("");
  const [Anomalies, setAnomalies] = useState("");
  const [Placenta, setPlacenta] = useState("");
  const [Membranes, setMembranes] = useState("");
  const [Cordon, setCordon] = useState("");
  const [Sexe, setSexe] = useState("");
  const [Taille, setTaille] = useState("");
  const [Pc, setPc] = useState("");
  const [une_min, setUne_min] = useState("");
  const [cinq_min, setCinq_min] = useState("");
  const [Malformation, setMalformation] = useState("");
  const [Remarque, setRemarque] = useState("");
  const { user } = useAuthContext();
  const { id } = useParams();
  const [PatientData, setPatientData] = useState(null);

  const history = useNavigate();
  const [UserData, setUserData] = useState(null);

  //Get Patient Data
  useEffect(() => {
    const fetchPatientData = async () => {
      if (id !== undefined) {
        await fetch(`http://localhost:8000/patients/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setPatientData(data);
              })
              .catch((error) => {
                console.error("Error fetching nouveau-ne data:", error);
              });
          } else {
            console.error("Error fetching nouveau-ne data:", response.status);
          }
        });
      } else {
        history();
      }
    };

    fetchPatientData();
  }, [history, id]);
  //delete the patient
  const handleDeletePatient = async () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
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
      history(`/patients`);
    } catch (error) {
      window.alert(error.message);
    }
  };

  //Get Dossier Obstetricale Data
  const [DossObsData, setDossObsData] = useState(null);
  useEffect(() => {
    const fetchDossObsData = async () => {
      if (PatientData.idDossObs !== undefined) {
        await fetch(
          `http://localhost:8000/patients/DossObs/${PatientData?.idDossObs}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
          }
        ).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setDossObsData(data);
              })
              .catch((error) => {
                console.error("Error fetching article data:", error);
              });
          } else {
            console.error("Error fetching article data:", response.status);
          }
        });
      } else {
        history();
      }
    };

    fetchDossObsData();
  }, [history, PatientData?.idDossObs]);

  //Get User Data
  useEffect(() => {
    const fetchUsertData = async () => {
      if (DossObsData.AccoucheurID !== undefined) {
        await fetch(`http://localhost:8000/user/${DossObsData?.AccoucheurID}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setUserData(data);
              })
              .catch((error) => {
                console.error("Error fetching article data:", error);
              });
          } else {
            console.error("Error fetching article data:", response.status);
          }
        });
      } else {
        history("/login");
      }
    };

    fetchUsertData();
  }, [UserData, DossObsData?.AccoucheurID]);

  const handleDossObsSubmit = async () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    if (PatientData?.idDossObs !== undefined) {
      try {
        const response = await axios.patch(
          `http://localhost:8000/patients/DossObs/${PatientData?.idDossObs}`,
          {
            Poids,
            Aspect,
            Anomalies,
            Placenta,
            Membranes,
            Cordon,
            Sexe,
            Taille,
            Pc,
            Malformation,
            Remarque,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        // Handle response as needed
        if (!response.status === 200) {
          setNotify({
            isOpen: true,
            message: "Ajoute patient échoué",
            type: "error",
          });
        } else if (response.status === 200) {
          setNotify({
            isOpen: true,
            message: "Ajoute patient réussie",
            type: "success",
          });
        }
        setTimeout(() => {
          history(`Dossier-Nouveau-ne/${PatientData._id}`);
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="AddPatient">
      <div className="addpatient-container">
        <div className="addpatient-hedear">
          <h2>Dossier nouveau-ne</h2>
          <input
            type="submit"
            value="Enregistrer tout"
            onClick={() => {
              setConfirmDialog({
                isOpen: true,
                title: "Voulez-vous vraiment enregistrer ce Nouveau-ne ?",
                subTitle: "Vous ne pouvez pas annuler cette opération",
                onConfirm: () => {
                  handleDossObsSubmit();
                },
              });
            }}
          />
        </div>
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
        <div className="home-formulaire">
          <div className="fichier-nouveau-ne">
            <div className="formulaire-dossier-obster">
              <div className="formulaire-header-obster">
                <div className="formulaire-dossier-obstetrique">
                  <h2>Dossier obstetrique</h2>
                </div>
              </div>
              <div className="line-hl">
                <div className="hl"></div>
              </div>
              <form action="">
                <div className="pro-acc">
                  <h2>Protocole d’accouchement</h2>
                  <div className="malforamtion-annexe">
                    <div className="span-item">
                      <span>Nom :</span>
                    </div>
                    <input type="text" />
                  </div>
                  <div className="malforamtion-annexe">
                    <div className="span-item">
                      <span>Prenom :</span>
                    </div>
                    <input type="text" />
                  </div>
                  <div className="malforamtion-annexe">
                    <div className="span-item">
                      <span>Identifiant :</span>
                    </div>
                    <input type="text" />
                  </div>

                  <div className="date-heure-acc">
                    <div className="date-acc">
                      <div className="span-item span-long1">
                        <span>Date d’accouchement :</span>
                      </div>
                      <input
                        type="text"
                        name="Date_daccouchement"
                        defaultValue={DossObsData?.Date_daccouchement}
                        readOnly
                      />
                    </div>
                    <div className="heure-acc">
                      <div className="span-item">
                        <span>Heure :</span>
                      </div>
                      <input
                        type="text"
                        name="Heure_daccouchement"
                        defaultValue={DossObsData?.Heure_daccouchement}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="accoucheur">
                    <div className="span-text">
                      <span>Accoucheur :</span>
                    </div>
                    <div className="textarea">
                      <input
                        type="text"
                        name="accoucheur"
                        id="accoucheur"
                        defaultValue={UserData?.Fname}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="examen-annexes">
                  <h2>Examen des annexes :</h2>
                  <div className="annexes">
                    <div className="malforamtion-annexe">
                      <div className="span-item">
                        <span>Aspect :</span>
                      </div>
                      <input
                        type="text"
                        value={Aspect}
                        name="Aspect"
                        onChange={(e) => {
                          setAspect(e.target.value);
                        }}
                      />
                    </div>
                    <div className="malforamtion-annexe">
                      <div className="span-item">
                        <span>Anomalies :</span>
                      </div>
                      <input
                        type="text"
                        value={Anomalies}
                        name="Anomalies"
                        onChange={(e) => {
                          setAnomalies(e.target.value);
                        }}
                      />
                    </div>
                    <div className="malforamtion-annexe">
                      <div className="span-item">
                        <span>Placenta :</span>
                      </div>
                      <input
                        type="text"
                        value={Placenta}
                        name="Placenta"
                        onChange={(e) => {
                          setPlacenta(e.target.value);
                        }}
                      />
                    </div>
                    <div className="malforamtion-annexe">
                      <div className="span-item">
                        <span>Membranes :</span>
                      </div>
                      <input
                        type="text"
                        value={Membranes}
                        name="Membranes"
                        onChange={(e) => {
                          setMembranes(e.target.value);
                        }}
                      />
                    </div>
                    <div className="malforamtion-annexe">
                      <div className="span-item">
                        <span>Cordon :</span>
                      </div>
                      <input
                        type="text"
                        value={Cordon}
                        name="Cordon"
                        onChange={(e) => {
                          setCordon(e.target.value);
                        }}
                      />
                    </div>
                    <div className="sexe-poids-taille-pc">
                      <div className="date-annexe">
                        <div className="span-item petit-span">
                          <span>Sexe :</span>
                        </div>
                        <input
                          type="text"
                          name="Sexe"
                          id="date-annexe"
                          value={Sexe}
                          onChange={(e) => {
                            setSexe(e.target.value);
                          }}
                        />
                      </div>
                      <div className="poids-annexe">
                        <div className="span-item petit-span">
                          <span>Poids :</span>
                        </div>
                        <input type="text" />
                      </div>
                      <div className="taille-annexe">
                        <div className="span-item petit-span">
                          <span>Taille :</span>
                        </div>

                        <input
                          type="text"
                          value={Taille}
                          name="Taille"
                          onChange={(e) => {
                            setTaille(e.target.value);
                          }}
                        />
                      </div>
                      <div className="pc-annexe">
                        <div className="span-item petit-span">
                          <span>PC :</span>
                        </div>
                        <input
                          type="text"
                          value={Pc}
                          name="Pc"
                          onChange={(e) => {
                            setPc(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="score-dapgar">
                      <div className="score">
                        <span>Score d'Apgar :</span>
                      </div>
                      <div className="minute-1">
                        <span>1 minute</span>
                        <input
                          type="checkbox"
                          name="une_min"
                          onChange={(e) => {
                            setUne_min(e.target.value);
                          }}
                        />
                      </div>
                      <div className="minute-5">
                        <span>5 minute</span>
                        <input
                          type="checkbox"
                          name="cinq_min"
                          onChange={(e) => {
                            setCinq_min(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="malforamtion-annexe">
                      <div className="span-item">
                        <span>Malformation :</span>
                      </div>
                      <input
                        type="text"
                        value={Malformation}
                        name="Malformation"
                        onChange={(e) => {
                          setMalformation(e.target.value);
                        }}
                      />
                    </div>
                    <div className="remarque-annexe">
                      <div className="span-item">
                        <span>Remarque :</span>
                      </div>
                      <input
                        type="text"
                        name="Remarque"
                        value={Remarque}
                        onChange={(e) => {
                          setRemarque(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/*<div className="Enregistre-class">
                  <input
                    type="Submit"
                    value="Enregistre"
                    className="enregistre-btn"
                  />
                </div> */}
              </form>
            </div>
          </div>
        </div>
        <Notification notify={notify} setNotify={setNotify} />
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </div>
    </div>
  );
}
