import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { BsChevronRight } from "react-icons/bs";
import SwiperButtonNext from "./buttons/buttonNext";

export default function FichierPatient() {
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
  const [Empreintes_digitales, setEmpreintes_digitales] = useState("");
  const { user } = useAuthContext();
  const { id } = useParams();
  const [PatientData, setPatientData] = useState(null);

  const history = useNavigate("/patients");
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

  const handleDossObsSubmit = async (event) => {
    event.preventDefault();
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
            Empreintes_digitales,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        // Handle response as needed
        if (!response.status === 200) {
          window.alert("Add patient failed", response.data.message);
        } else if (response.status === 200) {
          window.alert("Add patient success", response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      history();
    }
  };

  return (
    <div>
      <div className="formulaire-dossier-obster">
        <div className="formulaire-header-obster">
          <div className="formulaire-dossier-obstetrique">
            <h2>Dossier obstetrique</h2>
          </div>
        </div>
        <div className="line-hl">
          <div className="hl"></div>
        </div>
        <form action="" onSubmit={handleDossObsSubmit}>
          <div className="pro-acc">
            <h2>Protocole d’accouchement</h2>
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
                <textarea
                  name="accoucheur"
                  id="accoucheur"
                  defaultValue={UserData?.Fname}
                  readOnly
                ></textarea>
              </div>
            </div>
          </div>
          <div className="examen-annexes">
            <h2>Examen des annexes :</h2>
            <div className="annexes">
              <div className="annexe">
                <div className="annexe-item">
                  <div className="span-item">
                    <span>Poids :</span>
                  </div>
                  <input
                    type="text"
                    value={Poids}
                    name="Poids"
                    onChange={(e) => {
                      setPoids(e.target.value);
                    }}
                  />
                </div>
                <div className="annexe-item">
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
                <div className="annexe-item">
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
              </div>
              <div className="annexe annexe-two">
                <div className="annexe-item">
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
                <div className="annexe-item">
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
                <div className="annexe-item">
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
              </div>
            </div>
          </div>
          <div className="examen-annexes">
            <h2>Examen des annexes :</h2>
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
            <div className="re-annexe-textarea">
              <div className="textarea">
                <textarea name="rem-annexe" id="rem-annexe"></textarea>
              </div>
            </div>
            <div className="empre-digi">
              <div className="span-text">
                <span>Empreintes digitales :</span>
              </div>
              <div className="textarea">
                <textarea
                  name="empre-digi"
                  id="empre-digi"
                  value={Empreintes_digitales}
                  onChange={(e) => {
                    setEmpreintes_digitales(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="Enregistre-class">
            <input
              type="Submit"
              value="Enregistre"
              className="enregistre-btn"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
