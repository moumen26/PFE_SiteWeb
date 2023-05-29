import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";

import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { useState, useEffect, ChangeEvent } from "react";
import SwiperButtonNext from "../buttons/buttonNext";
import SwiperButtonBack from "../buttons/buttonBack";
import ObstetricauxTable from "../tables/tableObstetricaux";
import { useAddPatientPart_1 } from "../../hooks/useAddPatientPart_1";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
//import { CircularProgress } from "@mui/material";

export default function MySwiper() {
  //initialisation of the states
  const [MamanNom, setMamanNom] = useState("");
  const [MamanEpouse, setMamanEpouse] = useState("");
  const [DateNaissance, setDateNaissance] = useState("");
  const [AdresseActuelle, setAdresseActuelle] = useState("");
  const [Profession, setProfession] = useState("");
  const [Salle, setSalle] = useState("");
  const [NumLit, setNumLit] = useState("");
  const [DateEntrer, setDateEntrer] = useState("");
  const [DateSortie, setDateSortie] = useState("");
  const [Admise, setAdmise] = useState("");
  const [SageFemme, setSageFemme] = useState("");
  const [DiagnosticSortie, setDiagnosticSortie] = useState("");
  const [ResumerObservation, setResumerObservation] = useState("");
  const [MotifHospitalisation, setMotifHospitalisation] = useState("");
  const [DRR, setDRR] = useState("");
  const [TermeCalc, setTermeCalc] = useState("");
  const [Menarchie, setMenarchie] = useState("");
  const [CarcterCycle, setCarcterCycle] = useState("");
  const [AgeMariage, setAgeMariage] = useState("");
  const [Contraception, setContraception] = useState("");
  const [GroupSanguin, setGroupSanguin] = useState("");
  const [FNS, setFNS] = useState("");
  const [Glycemle, setGlycemle] = useState("");
  const [UreeSanguine, setUreeSanguine] = useState("");
  const [Albuminurie, setAlbuminurie] = useState("");
  const [BW, setBW] = useState("");
  const [Serodiagnostic, setSerodiagnostic] = useState("");
  const [Toxoplasmose, setToxoplasmose] = useState("");
  const [Rubeole, setRubeole] = useState("");
  const [MamanPoids, setMamanPoids] = useState("");
  const [MamanTaille, setMamanTaille] = useState("");
  const [MamanPoule, setMamanPoule] = useState("");
  const [TA, setTA] = useState("");
  const [HU, setHU] = useState("");
  const [ConstractionUterines, setConstractionUterines] = useState("");
  const [Presentation, setPresentation] = useState("");
  const [BCF, setBCF] = useState("");
  const [Uterus, setUterus] = useState("");
  const [Speculum, setSpeculum] = useState("");
  const [ToucherVaginal, setToucherVaginal] = useState("");
  const [PatientData, setPatientData] = useState(null);
  const [errorPart_1, setErrorPart_1] = useState(null);
  const [DossObsData, setDossObsData] = useState(null);
  const [UserData, setUserData] = useState(null);

  //get current date
  const current = new Date();
  const CurrentDate = `${current.getDate()}-${
    current.getMonth() + 1
  }-${current.getFullYear()}`;

  //get current user
  const { user } = useAuthContext();
  //get the id of the patient
  const { id } = useParams();
  // initialisation of the navigate function
  const history = useNavigate();

  //Patient data
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
                console.error("Error fetching patient data:", error);
              });
          } else {
            console.error("Error fetching patient data:", response.error);
          }
        });
      } else {
        history();
      }
    };

    fetchPatientData();
  }, [history, id, user?.token]);

  //Dossier obstetricaux data
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
  }, [history, PatientData?.idDossObs, user?.token]);

  //User data
  useEffect(() => {
    const fetchUsertData = async () => {
      if (PatientData.idAccoucheur !== undefined) {
        await fetch(`http://localhost:8000/user/${PatientData?.idAccoucheur}`, {
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
                console.error("Error fetching user data:", error);
              });
          } else {
            console.error("Error fetching user data:", response.status);
          }
        });
      } else {
        history("/login");
      }
    };

    fetchUsertData();
  }, [UserData, PatientData?.idAccoucheur, user?.token, history]);

  //Update Dossier Obstetricaux
  const handleDossObsSubmit = async (event) => {
    event.preventDefault();

    if (PatientData?.idDossObs !== undefined) {
      try {
        const response = await axios.patch(
          `http://localhost:8000/patients/DossObs/${PatientData?.idDossObs}`,
          {
            MamanNom,
            MamanEpouse,
            DateNaissance,
            AdresseActuelle,
            Profession,
            Salle,
            NumLit,
            DateEntrer,
            DateSortie,
            Admise,
            SageFemme: user?.id,
            DiagnosticSortie,
            ResumerObservation,
            MotifHospitalisation,
            DRR,
            TermeCalc,
            Menarchie,
            CarcterCycle,
            AgeMariage,
            Contraception,
            GroupSanguin,
            FNS,
            Glycemle,
            UreeSanguine,
            Albuminurie,
            BW,
            Serodiagnostic,
            Toxoplasmose,
            Rubeole,
            MamanPoids,
            MamanTaille,
            MamanPoule,
            TA,
            HU,
            ConstractionUterines,
            Presentation,
            BCF,
            Uterus,
            Speculum,
            ToucherVaginal,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (!response.status === 200) {
          window.alert("Add Dossier obstetrique failed", response.data.message);
          setErrorPart_1(errorPart_1);
        } else if (response.status === 200) {
          window.alert(
            "Add Dossier obstetrique success",
            response.data.message
          );
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
      <SwiperSlide className="Swipe">
        <div className="formulaire-dossier-obster">
          <div className="formulaire-header-obster">
            <div className="formulaire-dossier-obstetrique">
              <h2>Dossier obstetrique</h2>
            </div>
          </div>
          <div className="line-hl">
            <div className="hl"></div>
          </div>
          <div className="pere-class">
            <div className="obster-left-class">
              <div className="left-item">
                <div className="span-item">
                  <span>Nom :</span>
                </div>
                <input
                  type="text"
                  value={MamanNom}
                  name="MamanNom"
                  onChange={(e) => {
                    if (e.target.value !== MamanNom) {
                      setMamanNom(e.target.value);
                    }
                  }}
                />
              </div>
              <div className="left-item">
                <div className="span-item">
                  <span>Epouse :</span>
                </div>
                <input
                  type="text"
                  value={MamanEpouse}
                  name="MamanEpouse"
                  onChange={(e) => {
                    if (e.target.value !== MamanEpouse)
                      setMamanEpouse(e.target.value);
                  }}
                />
              </div>
              <div className="left-item">
                <div className="span-item">
                  <span>Date de naissance :</span>
                </div>
                <input
                  type="text"
                  value={DateNaissance}
                  name="DateNaissance"
                  onChange={(e) => {
                    if (e.target.value !== DateNaissance)
                      setDateNaissance(e.target.value);
                  }}
                />
              </div>
              <div className="left-item">
                <div className="span-item">
                  <span>
                    Adress <br />
                    actuelle :
                  </span>
                </div>
                <input
                  type="text"
                  value={AdresseActuelle}
                  name="AdresseActuelle"
                  onChange={(e) => {
                    if (e.target.value !== AdresseActuelle)
                      setAdresseActuelle(e.target.value);
                  }}
                />
              </div>
              <div className="left-item">
                <div className="span-item">
                  <span>Profession :</span>
                </div>
                <input
                  type="text"
                  value={Profession}
                  name="Profession"
                  onChange={(e) => {
                    if (e.target.value !== Profession)
                      setProfession(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="obster-right-class">
              <div className="right-item">
                <div className="span-item">
                  <span>Salle :</span>
                </div>
                <input
                  type="text"
                  value={Salle}
                  name="Salle"
                  onChange={(e) => {
                    if (e.target.value !== Salle) setSalle(e.target.value);
                  }}
                />
              </div>
              <div className="right-item">
                <div className="span-item">
                  <span>N de lit :</span>
                </div>
                <input
                  type="text"
                  value={NumLit}
                  name="NumLit"
                  onChange={(e) => {
                    if (e.target.value !== NumLit) setNumLit(e.target.value);
                  }}
                />
              </div>
              <div className="right-item">
                <div className="span-item">
                  <span>Entre le :</span>
                </div>
                <input
                  type="date"
                  id="date"
                  value={DateEntrer}
                  name="DateEntrer"
                  onChange={(e) => {
                    if (e.target.value !== DateEntrer)
                      setDateEntrer(e.target.value);
                  }}
                />
              </div>
              <div className="right-item">
                <div className="span-item">
                  <span>Sortie le :</span>
                </div>
                <input
                  type="date"
                  id="date"
                  value={DateSortie}
                  name="DateSortie"
                  onChange={(e) => {
                    if (e.target.value !== DateSortie)
                      setDateSortie(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="add-adm-vit">
            <div className="add-adm-vit-item">
              <div className="span-item">
                <span>Addresse par :</span>
              </div>
              <input type="text" />
            </div>
            <div className="add-adm-vit-item">
              <div className="span-item">
                <span>Admise :</span>
              </div>
              <input
                type="text"
                value={Admise}
                name="Admise"
                onChange={(e) => {
                  if (e.target.value !== Admise) setAdmise(e.target.value);
                }}
              />
            </div>
            <div className="add-adm-vit-item">
              <div className="span-item">
                <span>SageFemme :</span>
              </div>
              <input type="text" value={SageFemme} name="SageFemme" />
            </div>
          </div>
          <div className="diag-sor">
            <h2>Diagnostic de sortie</h2>
            <div className="textarea">
              <textarea
                id="diag-sortie"
                value={DiagnosticSortie}
                name="DiagnosticSortie"
                onChange={(e) => {
                  if (e.target.value !== DiagnosticSortie)
                    setDiagnosticSortie(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="resume-obser">
            <h2>Resume de l’observation</h2>
            <div className="textarea">
              <textarea
                id="resume-obser"
                value={ResumerObservation}
                name="ResumerObservation"
                onChange={(e) => {
                  if (e.target.value !== ResumerObservation)
                    setResumerObservation(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="next-first">
            <SwiperButtonNext>
              <div className="flex items-center justify-items-center gap-2">
                Suivant <BsChevronRight />
              </div>
            </SwiperButtonNext>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="Swipe">
        <div className="formulaire-dossier-obster">
          <div className="formulaire-header-obster">
            <div className="formulaire-dossier-obstetrique">
              <h2>Dossier obstetrique</h2>
            </div>
          </div>
          <div className="line-hl">
            <div className="hl"></div>
          </div>
          <div className="obser-entree">
            <h2>Observation a l’entree</h2>
            <div className="motif-hosp">
              <div className="span-text">
                <span>Motif d’hospitalization :</span>
              </div>
              <div className="textarea">
                <textarea
                  id="motif-hosp"
                  value={MotifHospitalisation}
                  name="MotifHospitalisation"
                  onChange={(e) => {
                    if (e.target.value !== MotifHospitalisation)
                      setMotifHospitalisation(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="ddr-terme">
                <div className="ddr-terme-item">
                  <div className="span-item petit-span">
                    <span>DDR :</span>
                  </div>
                  <input
                    type="text"
                    value={DRR}
                    name="DRR"
                    onChange={(e) => {
                      if (e.target.value !== DRR) setDRR(e.target.value);
                    }}
                  />
                </div>
                <div className="ddr-terme-item">
                  <div className="span-item">
                    <span>Terme calcule :</span>
                  </div>
                  <input
                    type="text"
                    value={TermeCalc}
                    name="TermeCalc"
                    onChange={(e) => {
                      if (e.target.value !== TermeCalc)
                        setTermeCalc(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="antecedents">
            <h2>Antecedents</h2>
            <div className="personnels">
              <div className="span-text">
                <span>1- Personnels :</span>
              </div>
              <div className="psychologiques">
                <span>Psychologiques</span>
                <div className="pyscho-item">
                  <div className="span-item span-long">
                    <span>Menarchie :</span>
                  </div>
                  <input
                    type="text"
                    value={Menarchie}
                    name="Menarchie"
                    onChange={(e) => {
                      if (e.target.value !== Menarchie)
                        setMenarchie(e.target.value);
                    }}
                  />
                </div>
                <div className="pyscho-item">
                  <div className="span-item span-long">
                    <span>Caractere de cycle :</span>
                  </div>
                  <input
                    type="text"
                    value={CarcterCycle}
                    name="CarcterCycle"
                    onChange={(e) => {
                      if (e.target.value !== CarcterCycle)
                        setCarcterCycle(e.target.value);
                    }}
                  />
                </div>
                <div className="textarea">
                  <textarea name="psycho" id="psycho"></textarea>
                </div>
                <div className="pyscho-item">
                  <div className="span-item span-long">
                    <span>Age de mariage :</span>
                  </div>
                  <input
                    type="text"
                    value={AgeMariage}
                    name="AgeMariage"
                    onChange={(e) => {
                      if (e.target.value !== AgeMariage)
                        setAgeMariage(e.target.value);
                    }}
                  />
                </div>
                <div className="pyscho-item">
                  <div className="span-item span-long">
                    <span>Contraception :</span>
                  </div>
                  <input
                    type="text"
                    value={Contraception}
                    name="Contraception"
                    onChange={(e) => {
                      if (e.target.value !== Contraception)
                        setContraception(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="examen-comple">
              <div className="span-text">
                <span>2- Examen complementaire :</span>
              </div>
              <div className="examen-bio">
                <span>Examen biologique</span>
                <div className="examen-bio-item">
                  <div className="span-item span-long">
                    <span>Group SANGUIN :</span>
                  </div>
                  <input
                    type="text"
                    value={GroupSanguin}
                    name="GroupSanguin"
                    onChange={(e) => {
                      if (e.target.value !== GroupSanguin)
                        setGroupSanguin(e.target.value);
                    }}
                  />
                </div>
                <div className="textarea">
                  <textarea name="examen-bio" id="examen-bio"></textarea>
                </div>
                <div className="examen-bio-item">
                  <div className="span-item span-long">
                    <span>FNS :</span>
                  </div>
                  <input
                    type="text"
                    value={FNS}
                    name="FNS"
                    onChange={(e) => {
                      if (e.target.value !== FNS) setFNS(e.target.value);
                    }}
                  />
                </div>
                <div className="pyscho-item">
                  <div className="psycho-class">
                    <div className="pyscho-left">
                      <div className="span-item">
                        <span>Glycemie :</span>
                      </div>
                      <input
                        type="text"
                        value={Glycemle}
                        name="Glycemle"
                        onChange={(e) => {
                          if (e.target.value !== Glycemle)
                            setGlycemle(e.target.value);
                        }}
                      />
                    </div>
                    <div className="pyscho-right">
                      <div className="span-item">
                        <span>Uree sanguine :</span>
                      </div>
                      <input
                        type="text"
                        value={UreeSanguine}
                        name="UreeSanguine"
                        onChange={(e) => {
                          if (e.target.value !== UreeSanguine)
                            setUreeSanguine(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="pyscho-item">
                  <div className="psycho-class">
                    <div className="pyscho-left">
                      <div className="span-item">
                        <span>Albuminurie :</span>
                      </div>
                      <input
                        type="text"
                        value={Albuminurie}
                        name="Albuminurie"
                        onChange={(e) => {
                          if (e.target.value !== Albuminurie)
                            setAlbuminurie(e.target.value);
                        }}
                      />
                    </div>
                    <div className="pyscho-right">
                      <div className="span-item">
                        <span>B.W :</span>
                      </div>
                      <input
                        type="text"
                        value={BW}
                        name="BW"
                        onChange={(e) => {
                          if (e.target.value !== BW) setBW(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="pyscho-item">
                  <div className="span-item span-long">
                    <span>Serodiagnostic de :</span>
                  </div>
                  <input
                    type="text"
                    value={Serodiagnostic}
                    name="Serodiagnostic"
                    onChange={(e) => {
                      if (e.target.value !== Serodiagnostic)
                        setSerodiagnostic(e.target.value);
                    }}
                  />
                </div>
                <div className="pyscho-item">
                  <div className="span-item span-long">
                    <span>Toxoplasmose :</span>
                  </div>
                  <input
                    type="text"
                    value={Toxoplasmose}
                    name="Toxoplasmose"
                    onChange={(e) => {
                      if (e.target.value !== Toxoplasmose)
                        setToxoplasmose(e.target.value);
                    }}
                  />
                </div>
                <div className="pyscho-item">
                  <div className="span-item span-long">
                    <span>Rubeole :</span>
                  </div>
                  <input
                    type="text"
                    value={Rubeole}
                    name="Rubeole"
                    onChange={(e) => {
                      if (e.target.value !== Rubeole)
                        setRubeole(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="back-next-buttons back-next-dossier">
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
        <div className="formulaire-dossier-obster">
          <div className="formulaire-header-obster">
            <div className="formulaire-dossier-obstetrique">
              <h2>Dossier obstetrique</h2>
            </div>
          </div>
          <div className="line-hl">
            <div className="hl"></div>
          </div>
          {/* <form
            action=""
            onSubmit={handleDossObsSubmit}
          > */}
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
                    // defaultValue={DossObsData?.Date_daccouchement}
                    // readOnly
                  />
                </div>
                <div className="heure-acc">
                  <div className="span-item">
                    <span>Heure :</span>
                  </div>
                  <input
                    type="text"
                    name="Heure_daccouchement"
                    // defaultValue={DossObsData?.Heure_daccouchement}
                    // readOnly
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
                    // defaultValue={UserData?.Fname}
                    // readOnly
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
                      // value={Poids}
                      name="Poids"
                      // onChange={(e) => {
                      //   setPoids(e.target.value);
                      // }}
                    />
                  </div>
                  <div className="annexe-item">
                    <div className="span-item">
                      <span>Aspect :</span>
                    </div>
                    <input
                      type="text"
                      // value={Aspect}
                      // name="Aspect"
                      // onChange={(e) => {
                      //   setAspect(e.target.value);
                      // }}
                    />
                  </div>
                  <div className="annexe-item">
                    <div className="span-item">
                      <span>Anomalies :</span>
                    </div>
                    <input
                      type="text"
                      // value={Anomalies}
                      // name="Anomalies"
                      // onChange={(e) => {
                      //   setAnomalies(e.target.value);
                      // }}
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
                      // value={Placenta}
                      // name="Placenta"
                      // onChange={(e) => {
                      //   setPlacenta(e.target.value);
                      // }}
                    />
                  </div>
                  <div className="annexe-item">
                    <div className="span-item">
                      <span>Membranes :</span>
                    </div>
                    <input
                      type="text"
                      // value={Membranes}
                      // name="Membranes"
                      // onChange={(e) => {
                      //   setMembranes(e.target.value);
                      // }}
                    />
                  </div>
                  <div className="annexe-item">
                    <div className="span-item">
                      <span>Cordon :</span>
                    </div>
                    <input
                      type="text"
                      // value={Cordon}
                      // name="Cordon"
                      // onChange={(e) => {
                      //   setCordon(e.target.value);
                      // }}
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
                    // value={Sexe}
                    // onChange={(e) => {
                    //   setSexe(e.target.value);
                    // }}
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
                    // value={Taille}
                    // name="Taille"
                    // onChange={(e) => {
                    //   setTaille(e.target.value);
                    // }}
                  />
                </div>
                <div className="pc-annexe">
                  <div className="span-item petit-span">
                    <span>PC :</span>
                  </div>
                  <input
                    type="text"
                    // value={Pc}
                    // name="Pc"
                    // onChange={(e) => {
                    //   setPc(e.target.value);
                    // }}
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
                    // name="une_min"
                    // onChange={(e) => {
                    //   setUne_min(e.target.value);
                    // }}
                  />
                </div>
                <div className="minute-5">
                  <span>5 minute</span>
                  <input
                    type="checkbox"
                    // name="cinq_min"
                    // onChange={(e) => {
                    //   setCinq_min(e.target.value);
                    // }}
                  />
                </div>
              </div>
              <div className="malforamtion-annexe">
                <div className="span-item">
                  <span>Malformation :</span>
                </div>
                <input
                  type="text"
                  // value={Malformation}
                  // name="Malformation"
                  // onChange={(e) => {
                  //   setMalformation(e.target.value);
                  // }}
                />
              </div>
              <div className="remarque-annexe">
                <div className="span-item">
                  <span>Remarque :</span>
                </div>
                <input
                  type="text"
                  // name="Remarque"
                  // value={Remarque}
                  // onChange={(e) => {
                  //   setRemarque(e.target.value);
                  // }}
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
                    // id="empre-digi"
                    // value={Empreintes_digitales}
                    // onChange={(e) => {
                    //   setEmpreintes_digitales(e.target.value);
                    // }}
                  ></textarea>
                </div>
              </div>
            </div>
          {/* </form> */}
          <div className="back-next-buttons back-next-dossier">
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
        <div className="formulaire-dossier-obster">
          <div className="formulaire-header-obster">
            <div className="formulaire-dossier-obstetrique">
              <h2>Dossier obstetrique</h2>
            </div>
          </div>
          <div className="line-hl">
            <div className="hl"></div>
          </div>
          <div className="examen-entree">
            <h2>Examen d’entree</h2>
            <div className="examen-general">
              <div className="span-text">
                <span>1- Examen general :</span>
              </div>
              <div className="poids-taille-poule-ta">
                <div className="poids-examen-general">
                  <div className="span-item petit-span">
                    <span>Poids :</span>
                  </div>
                  <input
                    type="text"
                    value={MamanPoids}
                    name="MamanPoids"
                    onChange={(e) => {
                      if (e.target.value !== MamanPoids)
                        setMamanPoids(e.target.value);
                    }}
                  />
                </div>
                <div className="taille-examen-general">
                  <div className="span-item petit-span">
                    <span>Taille :</span>
                  </div>
                  <input
                    type="text"
                    value={MamanTaille}
                    name="MamanTaille"
                    onChange={(e) => {
                      if (e.target.value !== MamanTaille)
                        setMamanTaille(e.target.value);
                    }}
                  />
                </div>
                <div className="poule-examen-general">
                  <div className="span-item petit-span">
                    <span>Poule :</span>
                  </div>
                  <input
                    type="text"
                    value={MamanPoule}
                    name="MamanPoule"
                    onChange={(e) => {
                      if (e.target.value !== MamanPoule)
                        setMamanPoule(e.target.value);
                    }}
                  />
                </div>
                <div className="ta-examen-general">
                  <div className="span-item petit-span">
                    <span>TA :</span>
                  </div>
                  <input
                    type="text"
                    value={TA}
                    name="TA"
                    onChange={(e) => {
                      if (e.target.value !== TA) setTA(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="examen-entree-item">
                <div className="glycemie">
                  <div className="span-item">
                    <span>Glycemie :</span>
                  </div>
                  <input type="text" value={Glycemle} name="Glycemle" />
                </div>
                <div className="uree">
                  <div className="span-item">
                    <span>Uree sanguine :</span>
                  </div>
                  <input type="text" value={UreeSanguine} name="UreeSanguine" />
                </div>
              </div>
              <div className="examen-entree-item2">
                <div className="span-item span-long">
                  <span>Caractere de cycle :</span>
                </div>
                <input type="text" value={CarcterCycle} name="CarcterCycle" />
              </div>
              <div className="textarea">
                <textarea name="exa-gene" id="exa-gene"></textarea>
              </div>
            </div>

            <div className="examen-obstetrical">
              <div className="span-text">
                <span>2- Examen obstetrical :</span>
              </div>
              <div className="hu-const">
                <div className="hu">
                  <div className="span-item petit-span">
                    <span>Hu :</span>
                  </div>
                  <input
                    type="text"
                    value={HU}
                    name="HU"
                    onChange={(e) => {
                      if (e.target.value !== HU) setHU(e.target.value);
                    }}
                  />
                </div>
                <div className="constraction">
                  <div className="span-item span-long1">
                    <span>Constraction uterines :</span>
                  </div>
                  <input
                    type="text"
                    value={ConstractionUterines}
                    name="ConstractionUterines"
                    onChange={(e) => {
                      if (e.target.value !== ConstractionUterines)
                        setConstractionUterines(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="pres-bfc">
                <div className="presentation">
                  <div className="span-item">
                    <span>Presentation :</span>
                  </div>
                  <input
                    type="text"
                    value={Presentation}
                    name="Presentation"
                    onChange={(e) => {
                      if (e.target.value !== Presentation)
                        setPresentation(e.target.value);
                    }}
                  />
                </div>
                <div className="hu">
                  <div className="span-item petit-span">
                    <span>BCF :</span>
                  </div>
                  <input
                    type="text"
                    value={BCF}
                    name="BCF"
                    onChange={(e) => {
                      if (e.target.value !== BCF) setBCF(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="examen-entree-item2">
                <div className="span-item">
                  <span>Uterus :</span>
                </div>
                <input
                  type="text"
                  value={Uterus}
                  name="Uterus"
                  onChange={(e) => {
                    if (e.target.value !== Uterus) setUterus(e.target.value);
                  }}
                />
              </div>
              <div className="examen-entree-item2">
                <div className="span-item">
                  <span>Speculum :</span>
                </div>
                <input
                  type="text"
                  value={Speculum}
                  name="Speculum"
                  onChange={(e) => {
                    if (e.target.value !== Speculum)
                      setSpeculum(e.target.value);
                  }}
                />
              </div>
              <div className="textarea">
                <textarea name="exa-obs1" id="exa-obs1"></textarea>
              </div>
              <div className="examen-entree-item2">
                <div className="span-item">
                  <span>Toucher vaginal :</span>
                </div>
                <input
                  type="text"
                  value={ToucherVaginal}
                  name="ToucherVaginal"
                  onChange={(e) => {
                    if (e.target.value !== ToucherVaginal)
                      setToucherVaginal(e.target.value);
                  }}
                />
              </div>
              <div className="textarea">
                <textarea name="exa-obs2" id="exa-obs2"></textarea>
              </div>
            </div>
          </div>
          <div className="back-next-buttons back-next-dossier">
            <div className="back">
              <SwiperButtonBack>
                <div className="flex items-center justify-items-center gap-2">
                  <BsChevronLeft /> Back
                </div>
              </SwiperButtonBack>
            </div>
            <div className="next">
              <SwiperButtonNext>
                <div
                  className="flex items-center justify-items-center gap-2"
                  onClick={handleDossObsSubmit}
                >
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
