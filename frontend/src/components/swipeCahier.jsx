import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";

import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { useState, useEffect } from "react";
import SwiperButtonNext from "./nextButton";
import SwiperButtonBack from "./backButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export default function MyCahierSwiper({ add, setAdd }) {
  const [Duree, setDuree] = useState("");
  const [Reanimation, setReanimation] = useState("");
  const [Transfert, setTransfert] = useState("");
  const [MotifTransfert, setMotifTransfert] = useState("");
  const [EmissionUrine, setEmissionUrine] = useState("");
  const [EmissionMeconium, setEmissionMeconium] = useState("");
  const [Sexe, setSexe] = useState("");
  const [RechercheAtresieLoesophage, setRechercheAtresieLoesophage] =
    useState("");
  const [OrganesGenitauxExternes, setOrganesGenitauxExternes] = useState("");
  const [une_min, setUne_min] = useState("");
  const [cinq_min, setCinq_min] = useState("");
  const [Malformation, setMalformation] = useState("");
  const [VitamineK1, setVitamineK1] = useState("");
  const [Collyre, setCollyre] = useState("");
  const [CatheterismeChoanes, setCatheterismeChoanes] = useState("");
  const [ExamenCordon, setExamenCordon] = useState("");

  const { user } = useAuthContext();

  const { id } = useParams();
  const [PatientData, setPatientData] = useState(null);

  const history = useNavigate("/patients");

  useEffect(() => {
    const fetchPatientData = async () => {
      if (id !== undefined) {
        await fetch(`http://localhost:8000/patients/${id}`).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setPatientData(data);
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

    fetchPatientData();
  }, [history, id]);
  //Get Dossier Obstetricale Data
  const [DossObsData, setDossObsData] = useState(null);
  useEffect(() => {
    const fetchDossObsData = async () => {
      if (PatientData.idDossObs !== undefined) {
        await fetch(
          `http://localhost:8000/patients/DossObs/${PatientData?.idDossObs}`
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
  //Get Carnet de Sante Data
  const [CarnetSanteData, setCarnetSante] = useState(null);
  useEffect(() => {
    const fetchCarnetSanteData = async () => {
      if (PatientData.idCarnetSante !== undefined) {
        await fetch(
          `http://localhost:8000/patients/CarnetSante/${PatientData?.idCarnetSante}`
        ).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setCarnetSante(data);
              })
              .catch((error) => {
                console.error("Error fetching Carnet sante data:", error);
              });
          } else {
            console.error("Error fetching Carnet sante data:", response.status);
          }
        });
      } else {
        history();
      }
    };
    fetchCarnetSanteData();
  }, [history, PatientData?.idCarnetSante]);

  //Update Carnet de Sante
  const handleCarnetSanteSubmit = async (event) => {
    event.preventDefault();
    const Date_daccouchement = DossObsData?.Date_daccouchement;
    const Heure_daccouchement = DossObsData?.Heure_daccouchement;
    const Sexe = DossObsData?.Sexe;
    if (PatientData?.idCarnetSante !== undefined) {
      try {
        const response = await axios.patch(
          `http://localhost:8000/patients/CarnetSante/${PatientData?.idCarnetSante}`,
          {
            Date_daccouchement,
            Heure_daccouchement,
            Sexe,
            Reanimation,
            Duree,
            Malformation,
            Transfert,
            MotifTransfert,
            ExamenCordon,
            EmissionUrine,
            EmissionMeconium,
            CatheterismeChoanes,
            RechercheAtresieLoesophage,
            OrganesGenitauxExternes,
            VitamineK1,
            Collyre,
          }
        );
        // Handle response as needed
        if (!response.status === 200) {
          window.alert("Add Carnet de Sante failed", response.data.message);
        } else if (response.status === 200) {
          window.alert("Add Carnet de Sante success", response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      history();
    }
  };

  // if (!PatientData) {
  //   return <CircularProgress />;
  // }
  return (
    <Swiper
      className="swiper-formulaire"
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide className="Swipe first">
        <div className="formulaire-examen">
          <div className="formulaire-header">
            <div className="formulaire-left swipe1">
              <h2>Examen du nouveau-ne</h2>
            </div>
            <div className="vl"></div>
            <div className="formulaire-centre">
              <h2>Le premier jour de vie</h2>
            </div>
            <div className="vl"></div>
            <div className="formulaire-right">
              <h2>
                Dans les huits jours qui suivent <br /> naissance
              </h2>
            </div>
          </div>
          <div className="line-hl">
            <div className="hl"></div>
          </div>
          <form action="" onSubmit={handleCarnetSanteSubmit}>
            <div className="sexe-date-heure">
              <div className="sexe">
                <span>Sexe :</span>
                <input
                  type="text"
                  value={DossObsData?.Sexe}
                  name="Sexe"
                  readOnly
                />
              </div>
              <div className="date">
                <span>Date :</span>
                <input
                  type="text"
                  name="date"
                  id="date"
                  defaultValue={CarnetSanteData?.Date_daccouchement}
                  readOnly
                />
              </div>
              <div className="heure">
                <span>Heure :</span>
                <input
                  type="text"
                  name="time"
                  id="time"
                  defaultValue={CarnetSanteData?.Heure_daccouchement}
                  readOnly
                />
              </div>
            </div>

            <div className="score-dapgar">
              <div className="score">
                <span>Score d'Apgar :</span>
              </div>
              <div className="minute-1">
                <span>1 minute</span>
                <input type="checkbox" />
              </div>
              <div className="minute-5">
                <span>5 minute</span>
                <input type="checkbox" />
              </div>
            </div>

            <div className="rea-duree-malf">
              <div className="reanimation">
                <span>Reanimation:</span>
                <input type="checkbox" />
              </div>
              <div className="duree">
                <span>Duree :</span>
                <input
                  type="text"
                  value={Duree}
                  name="Duree"
                  onChange={(e) => {
                    setDuree(e.target.value);
                  }}
                />
              </div>
              <div className="malforamtion">
                <span>Malformation :</span>
                <input
                  type="text"
                  value={Malformation}
                  name="Malformation"
                  onChange={(e) => {
                    setMalformation(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="transfert-motif">
              <div className="transfert">
                <span>Transfert:</span>
                <input
                  type="checkbox"
                  value={Transfert}
                  name="Transfert"
                  onChange={(e) => {
                    setTransfert(e.target.value);
                  }}
                />
              </div>
              <div className="motif">
                <span className="long-span">Motif du transfert :</span>
                <input
                  type="text"
                  value={MotifTransfert}
                  name="MotifTransfert"
                  onChange={(e) => {
                    setMotifTransfert(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="examen">
              <div className="cordon">
                <div className="span">
                  <span>Examen du cordon 2A/1V</span>
                </div>

                <input
                  type="text"
                  value={ExamenCordon}
                  name="ExamenCordon"
                  onChange={(e) => {
                    setExamenCordon(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="emission">
              <div className="urine">
                <span>Emission d’urine :</span>
                <input
                  type="checkbox"
                  value={EmissionUrine}
                  name="EmissionUrine"
                  onChange={(e) => {
                    setEmissionUrine(e.target.value);
                  }}
                />
              </div>
              <div className="meconium">
                <span>Emission du meconium :</span>
                <input
                  type="checkbox"
                  value={EmissionMeconium}
                  name="EmissionMeconium"
                  onChange={(e) => {
                    setEmissionMeconium(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="cathet">
              <div className="choanes">
                <div className="span">
                  <span>Catheterisme des choanes</span>
                </div>
                <input
                  type="text"
                  value={CatheterismeChoanes}
                  name="CatheterismeChoanes"
                  onChange={(e) => {
                    setCatheterismeChoanes(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="recherche">
              <div className="atresie">
                <div className="span1">
                  <span>Recherche d’une atresie de l'oesophage</span>
                </div>
                <input
                  type="text"
                  value={RechercheAtresieLoesophage}
                  name="RechercheAtresieLoesophage"
                  onChange={(e) => {
                    setRechercheAtresieLoesophage(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="organes">
              <div className="genitaux">
                <div className="span">
                  <span>Organes genitaux externes</span>
                </div>
                <input
                  type="text"
                  value={OrganesGenitauxExternes}
                  name="OrganesGenitauxExternes"
                  onChange={(e) => {
                    setOrganesGenitauxExternes(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="vitamine">
              <div class="k1">
                <div class="span">
                  <span>Vitamine K1</span>
                </div>
                <input
                  type="text"
                  value={VitamineK1}
                  name="VitamineK1"
                  onChange={(e) => {
                    setVitamineK1(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="catheterisme">
              <div className="c-choanes">
                <div className="span">
                  <span>Collyre</span>
                </div>
                <input
                  type="text"
                  value={Collyre}
                  name="Collyre"
                  onChange={(e) => {
                    setCollyre(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="next-first">
              <SwiperButtonNext>
                <div className="flex items-center justify-items-center gap-2">
                  Suivant <BsChevronRight />
                </div>
              </SwiperButtonNext>
            </div>
          </form>
        </div>
      </SwiperSlide>
      <SwiperSlide className="Swipe">
        <div className="formulaire-premier-jour">
          <div className="formulaire-header">
            <div className="formulaire-left">
              <h2>Examen du nouveau-ne</h2>
            </div>
            <div className="vl"></div>
            <div className="formulaire-centre swipe2">
              <h2>Le premier jour de vie</h2>
            </div>
            <div className="vl"></div>
            <div className="formulaire-right">
              <h2>
                Dans les huits jours qui suivent <br /> naissance
              </h2>
            </div>
          </div>
          <div className="line-hl">
            <div className="hl"></div>
          </div>

          <div className="date-poids-taille">
            <div className="date2">
              <span>Date :</span>
              <input type="date" name="date" id="date" />
            </div>
            <div className="poids">
              <span>Poids :</span>
              <input type="text" value="kg" />
            </div>
            <div className="taille">
              <span>Taille :</span>
              <input type="text" value="cm" />
            </div>
          </div>

          <div className="pre-fre">
            <div className="perimetre">
              <span>
                Périmètre
                <br />
                crânien
              </span>
              <input type="text" placeholder="..." />
            </div>
            <div className="frequence-car">
              <span>
                Fréquence
                <br />
                cardiaque
              </span>
              <input type="text" placeholder="..." />
            </div>
            <div className="frequence-res">
              <span>
                Fréquence
                <br />
                respiratoire
              </span>
              <input type="text" placeholder="..." />
            </div>
          </div>

          <div className="examen-de-la-peau">
            <h2>Examen de la peau</h2>
            <div className="ictere">
              <div className="span">
                <span>Ictère</span>
              </div>
              <input type="text" />
            </div>
            <div className="paleur">
              <div className="span">
                <span>Pâleur</span>
              </div>
              <input type="text" />
            </div>
            <div className="hematome">
              <div className="span">
                <span>Hématome cutanée</span>
              </div>
              <input type="text" />
            </div>
          </div>

          <div className="app-cardio">
            <h2>Appareil cardio-vasculaire</h2>
            <div className="cardio">
              <input type="text" />
            </div>
          </div>

          <div className="pleuro-pul">
            <h2>Examen pleuro-pulmonaire</h2>
            <div className="pleuro">
              <input type="text" />
            </div>
          </div>

          <div className="malformations">
            <h2>Malformation</h2>
            <div className="fente">
              <div className="span">
                <span>Fente palatine</span>
              </div>
              <input type="text" />
            </div>
            <div className="bec">
              <div className="span">
                <span>Bec de lièvre</span>
              </div>
              <input type="text" />
            </div>
            <div className="hanches">
              <div className="span">
                <span>Hanches (Ortolani)</span>
              </div>
              <input type="text" />
            </div>
            <div className="imperformation">
              <div className="span">
                <span>Imperformation anale</span>
              </div>
              <input type="text" />
            </div>
            <div className="yeux">
              <div className="span">
                <span>Yeux et Paupière</span>
              </div>
              <input type="text" />
            </div>
          </div>

          <div className="traumatismes">
            <h2>Traumatismes obstetricaux</h2>
            <div className="obstetricaux">
              <div className="span">
                <span>Plexus brachial</span>
              </div>
              <input type="text" />
            </div>
          </div>

          <div className="examen-neuro">
            <h2>Examen neurologique</h2>
            <div className="reflexes">
              <span>Réflexes archaïques :</span>
              <div className="succion">
                <div className="span">
                  <span>Succion</span>
                </div>
                <input type="text" />
              </div>
              <div className="signe-moro">
                <div className="span">
                  <span>Signe de Moro</span>
                </div>
                <input type="text" />
              </div>
            </div>
            <div className="tonus">
              <div className="span">
                <span>Tonus axial normal</span>
              </div>
              <input type="text" />
            </div>
            <div className="reaction">
              <div className="span">
                <span>Reaction aux stimulis</span>
              </div>
              <input type="text" />
            </div>
          </div>

          <div className="conclusion">
            <h2>Conclusion</h2>
            <div className="textarea">
              <textarea name="conclusion" id="conclusion"></textarea>
            </div>
          </div>
          <div className="back-next-buttons">
            <div className="back">
              <SwiperButtonBack>
                <div className="flex items-center justify-items-center gap-2">
                  <BsChevronLeft /> Back
                </div>
              </SwiperButtonBack>
            </div>
            <div className="next">
              <SwiperButtonNext>
                <div className="flex items-center justify-items-center gap-2">
                  Suivant <BsChevronRight />
                </div>
              </SwiperButtonNext>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="Swipe">
        <div className="formulaire-huits-jours">
          <div className="formulaire-header">
            <div className="formulaire-left">
              <h2>Examen du nouveau-ne</h2>
            </div>
            <div className="vl"></div>
            <div className="formulaire-centre">
              <h2>Le premier jour de vie</h2>
            </div>
            <div className="vl"></div>
            <div className="formulaire-right swipe3">
              <h2>
                Dans les huits jours qui suivent <br /> naissance
              </h2>
            </div>
          </div>

          <div className="line-hl">
            <div className="hl"></div>
          </div>

          <div className="date-poids-taille">
            <div className="date2">
              <span>Date :</span>
              <input type="date" name="date" id="date" />
            </div>
            <div className="poids">
              <span>Poids :</span>
              <input type="text" value="kg" />
            </div>
            <div className="taille">
              <span>Taille :</span>
              <input type="text" value="cm" />
            </div>
          </div>

          <div className="pre-fre">
            <div className="perimetre">
              <span>
                Périmètre
                <br />
                crânien
              </span>
              <input type="text" placeholder="..." />
            </div>
            <div className="frequence-car">
              <span>
                Fréquence
                <br />
                cardiaque
              </span>
              <input type="text" placeholder="..." />
            </div>
            <div className="frequence-res">
              <span>
                Fréquence
                <br />
                respiratoire
              </span>
              <input type="text" placeholder="..." />
            </div>
          </div>

          <div className="app-cardio app1">
            <h2>Appareil cardio-vasculaire</h2>
            <div className="cardio">
              <input type="text" />
            </div>
          </div>

          <div className="pleuro-pul">
            <h2>Examen pleuro-pulmonaire</h2>
            <div className="pleuro">
              <input type="text" />
            </div>
          </div>

          <div className="conj-eryth-globe">
            <div className="conjonctivite">
              <div className="span">
                <span>Conjonctivite</span>
              </div>
              <input type="text" />
            </div>
            <div className="erytheme">
              <div className="span">
                <span>Erythème fessier</span>
              </div>
              <input type="text" />
            </div>
            <div className="globe">
              <div className="span">
                <span>Globe vésical</span>
              </div>
              <input type="text" />
            </div>
          </div>

          <div className="depistage">
            <div className="pheny">
              <div className="span phe">
                <span>Dépistage de la phénylcétonurie le</span>
              </div>
              <input type="checkbox" />
            </div>
            <div className="hypoth">
              <div className="span hyp">
                <span>Dépistage de l’hypothyroidie le</span>
              </div>
              <input type="checkbox" />
            </div>
            <div className="autre">
              <div className="span">
                <span>Autre dépistages</span>
              </div>
              <input type="text" />
            </div>
          </div>

          <div className="mat-art-mix1">
            <div className="maternal">
              <span>Maternal</span>
              <input type="checkbox" />
            </div>
            <div className="artificiel">
              <span>Artificiel</span>
              <input type="checkbox" />
            </div>
            <div className="mixte">
              <span>Mixte</span>
              <input type="checkbox" />
            </div>
          </div>

          <div className="conclusion">
            <h2>Conclusion</h2>
            <div class="textarea">
              <textarea name="conclusion" id="conclusion"></textarea>
            </div>
          </div>

          <div className="back-next-buttons">
            <div className="back">
              <SwiperButtonBack>
                <div className="flex items-center justify-items-center gap-2">
                  <BsChevronLeft /> Back
                </div>
              </SwiperButtonBack>
            </div>
            <div className="next">
              <SwiperButtonNext>
                <div className="flex items-center justify-items-center gap-2">
                  Suivant <BsChevronRight />
                </div>
              </SwiperButtonNext>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
