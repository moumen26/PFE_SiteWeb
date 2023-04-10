import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";

import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { useState } from "react";
import SwiperButtonNext from "./nextButton";
import SwiperButtonBack from "./backButton";
import ObstetricauxTable from "./ObstetricauxTable";
import { useAddPatientPart_1 } from "../hooks/useAddPatientPart_1";

export default function MySwiper() {
  const [Accoucheur, setAccoucheur] = useState();
  const [Poids, setPoids] = useState('');
  const [Aspect, setAspect] = useState('');
  const [Anomalies, setAnomalies] = useState('');
  const [Placenta, setPlacenta] = useState('');
  const [Membranes, setMembranes] = useState('');
  const [Cordon, setCordon] = useState('');
  const [Sexe, setSexe] = useState('');
  const [Taille, setTaille] = useState('');
  const [Pc, setPc] = useState('');
  const [une_min, setUne_min] = useState('');
  const [cinq_min, setCinq_min] = useState('');
  const [Malformation, setMalformation] = useState('');
  const [Remarque, setRemarque] = useState('');
  const [Empreintes_digitales, setEmpreintes_digitales] = useState('');

  const { AddPatientPart_1, errorPart_1 } = useAddPatientPart_1();

  async function submitPart_1(e) {
    e.preventDefault();
    await AddPatientPart_1(Accoucheur, Poids, Aspect, Anomalies, Placenta, Membranes, Cordon
      ,Sexe, Taille, Pc, Malformation, Remarque, Empreintes_digitales);
  }
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
          <form action="" onSubmit={submitPart_1}>
            <div className="pro-acc">
              <h2>Protocole d’accouchement</h2>
              <div className="date-heure-acc">
                <div className="date-acc">
                  <div className="span-item span-long1">
                    <span>Date d’accouchement :</span>
                  </div>
                  <input type="text" />
                </div>
                <div className="heure-acc">
                  <div className="span-item">
                    <span>Heure :</span>
                  </div>
                  <input type="text" />
                </div>
              </div>
              <div className="accoucheur">
                <div className="span-text">
                  <span>Accoucheur :</span>
                </div>
                <div className="textarea">
                  <textarea name="accoucheur" id="accoucheur" value={Accoucheur} onChange={(e) => {setAccoucheur(e.target.value)}}></textarea>
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
                    <input type="text"  value={Poids} name="Poids" onChange={(e) => {setPoids(e.target.value)}}/>
                  </div>
                  <div className="annexe-item">
                    <div className="span-item">
                      <span>Aspect :</span>
                    </div>
                    <input type="text" value={Aspect} name="Aspect" onChange={(e) => {setAspect(e.target.value)}}/>
                  </div>
                  <div className="annexe-item">
                    <div className="span-item">
                      <span>Anomalies :</span>
                    </div>
                    <input type="text" value={Anomalies} name="Anomalies" onChange={(e) => {setAnomalies(e.target.value)}}/>
                  </div>
                </div>
                <div className="annexe annexe-two">
                  <div className="annexe-item">
                    <div className="span-item">
                      <span>Placenta :</span>
                    </div>
                    <input type="text" value={Placenta} name="Placenta" onChange={(e) => {setPlacenta(e.target.value)}}/>
                  </div>
                  <div className="annexe-item">
                    <div className="span-item">
                      <span>Membranes :</span>
                    </div>
                    <input type="text" value={Membranes} name="Membranes" onChange={(e) => {setMembranes(e.target.value)}}/>
                  </div>
                  <div className="annexe-item">
                    <div className="span-item">
                      <span>Cordon :</span>
                    </div>
                    <input type="text" value={Cordon} name="Cordon" onChange={(e) => {setCordon(e.target.value)}}/>
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
                  <input type="date-annexe" name="Sexe" id="date-annexe" value={Sexe} onChange={(e) => {setSexe(e.target.value)}} />
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

                  <input type="text" value={Taille} name="Taille" onChange={(e) => {setTaille(e.target.value)}} />
                </div>
                <div className="pc-annexe">
                  <div className="span-item petit-span">
                    <span>PC :</span>
                  </div>
                  <input type="text" value={Pc} name="Pc" onChange={(e) => {setPc(e.target.value)}}/>
                </div>
              </div>
              <div className="score-dapgar">
                <div className="score">
                  <span>Score d'Apgar :</span>
                </div>
                <div className="minute-1">
                  <span>1 minute</span>
                  <input type="checkbox" name="une_min" onChange={(e) => {setUne_min(e.target.value)}}/>
                </div>
                <div className="minute-5">
                  <span>5 minute</span>
                  <input type="checkbox" name="cinq_min" onChange={(e) => {setCinq_min(e.target.value)}}/>
                </div>
              </div>
              <div className="malforamtion-annexe">
                <div className="span-item">
                  <span>Malformation :</span>
                </div>
                <input type="text" value={Malformation} name="Malformation" onChange={(e) => {setMalformation(e.target.value)}}/>
              </div>
              <div className="remarque-annexe">
                <div className="span-item">
                  <span>Remarque :</span>
                </div>
                <input type="text" value={Remarque} name="Remarque" onChange={(e) => {setRemarque(e.target.value)}}/>
              </div>
              <div className="re-annexe-textarea">
                <div className="textarea">
                  <textarea name="rem-annexe" id="rem-annexe" ></textarea>
                </div>
              </div>
              <div className="empre-digi">
                <div className="span-text">
                  <span>Empreintes digitales :</span>
                </div>
                <div className="textarea">
                  <textarea name="empre-digi" id="empre-digi" value={Empreintes_digitales} onChange={(e) => {setEmpreintes_digitales(e.target.value)}}></textarea>
                </div>
              </div>
            </div>
            <div className="next-first">
              <SwiperButtonNext >
                Suivant <BsChevronRight />
              </SwiperButtonNext>
            </div>
          </form>
          
          
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
          <div className="pere-class">
            <div className="obster-left-class">
              <div className="left-item">
                <div className="span-item">
                  <span>Nom :</span>
                </div>
                <input type="text" />
              </div>
              <div className="left-item">
                <div className="span-item">
                  <span>Epouse :</span>
                </div>
                <input type="text" />
              </div>
              <div className="left-item">
                <div className="span-item">
                  <span>Date de naissance :</span>
                </div>
                <input type="text" />
              </div>
              <div className="left-item">
                <div className="span-item">
                  <span>
                    Adress <br />
                    actuelle :
                  </span>
                </div>
                <input type="text" />
              </div>
              <div className="left-item">
                <div className="span-item">
                  <span>Profession :</span>
                </div>
                <input type="text" />
              </div>
            </div>
            <div className="obster-right-class">
              <div className="right-item">
                <div className="span-item">
                  <span>Salle :</span>
                </div>
                <input type="text" />
              </div>
              <div className="right-item">
                <div className="span-item">
                  <span>N de lit :</span>
                </div>
                <input type="text" />
              </div>
              <div className="right-item">
                <div className="span-item">
                  <span>Entre le :</span>
                </div>
                <input type="date" name="date" id="date" />
              </div>
              <div className="right-item">
                <div className="span-item">
                  <span>Sortie le :</span>
                </div>
                <input type="date" name="date" id="date" />
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
              <input type="text" />
            </div>
            <div className="add-adm-vit-item">
              <div className="span-item">
                <span>Vitamine K1 :</span>
              </div>
              <input type="text" />
            </div>
          </div>
          <div className="diag-sor">
            <h2>Diagnostic de sortie</h2>
            <div className="textarea">
              <textarea name="diag-sortie" id="diag-sortie"></textarea>
            </div>
          </div>
          <div className="resume-obser">
            <h2>Resume de l’observation</h2>
            <div className="textarea">
              <textarea name="resume-obser" id="resume-obser"></textarea>
            </div>
          </div>
          <div className="back-next-buttons back-next-dossier">
            <div className="back">
              <SwiperButtonBack>
                <BsChevronLeft /> Back
              </SwiperButtonBack>
            </div>
            <div className="next">
              <SwiperButtonNext>
                Suivant <BsChevronRight />
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
          <div className="obser-entree">
            <h2>Observation a l’entree</h2>
            <div className="motif-hosp">
              <div className="span-text">
                <span>Motif d’hospitalization :</span>
              </div>
              <div className="textarea">
                <textarea name="motif-hosp" id="motif-hosp"></textarea>
              </div>
              <div className="ddr-terme">
                <div className="ddr-terme-item">
                  <div className="span-item petit-span">
                    <span>DDR :</span>
                  </div>
                  <input type="text" />
                </div>
                <div className="ddr-terme-item">
                  <div className="span-item">
                    <span>Terme calcule :</span>
                  </div>
                  <input type="text" />
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
                  <input type="text" />
                </div>
                <div className="pyscho-item">
                  <div className="span-item span-long">
                    <span>Caractere de cycle :</span>
                  </div>
                  <input type="text" />
                </div>
                <div className="textarea">
                  <textarea name="psycho" id="psycho"></textarea>
                </div>
                <div className="pyscho-item">
                  <div className="span-item span-long">
                    <span>Age de mariage :</span>
                  </div>
                  <input type="text" />
                </div>
                <div className="pyscho-item">
                  <div className="span-item span-long">
                    <span>Contraception :</span>
                  </div>
                  <input type="text" />
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
                  <input type="text" />
                </div>
                <div className="textarea">
                  <textarea name="examen-bio" id="examen-bio"></textarea>
                </div>
                <div className="examen-bio-item">
                  <div className="span-item span-long">
                    <span>FNS :</span>
                  </div>
                  <input type="text" />
                </div>
                <div className="pyscho-item">
                  <div className="psycho-class">
                    <div className="pyscho-left">
                      <div className="span-item">
                        <span>Glycemie :</span>
                      </div>
                      <input type="text" />
                    </div>
                    <div className="pyscho-right">
                      <div className="span-item">
                        <span>Uree sanguine :</span>
                      </div>
                      <input type="text" />
                    </div>
                  </div>
                </div>
                <div className="pyscho-item">
                  <div className="psycho-class">
                    <div className="pyscho-left">
                      <div className="span-item">
                        <span>Albuminurie :</span>
                      </div>
                      <input type="text" />
                    </div>
                    <div className="pyscho-right">
                      <div className="span-item">
                        <span>B.W :</span>
                      </div>
                      <input type="text" />
                    </div>
                  </div>
                </div>
                <div className="pyscho-item">
                  <div className="span-item span-long">
                    <span>Serodiagnostic de :</span>
                  </div>
                  <input type="text" />
                </div>
                <div className="pyscho-item">
                  <div className="span-item span-long">
                    <span>Toxoplasmose :</span>
                  </div>
                  <input type="text" />
                </div>
                <div className="pyscho-item">
                  <div className="span-item span-long">
                    <span>Rubeole :</span>
                  </div>
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="back-next-buttons back-next-dossier">
            <div className="back">
              <SwiperButtonBack>
                <BsChevronLeft /> Back
              </SwiperButtonBack>
            </div>
            <div className="next">
              <SwiperButtonNext>
                Suivant <BsChevronRight />
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
          <div className="obstetricaux-dossier">
            <div className="span-text">
              <span>Obstetricaux :</span>
            </div>
            <div className="obs-table">
              <ObstetricauxTable></ObstetricauxTable>
            </div>
          </div>
          <div className="pathologique">
            <div className="span-text">
              <span>Pathologiques :</span>
            </div>
            <div className="textarea">
              <textarea name="pathologiques" id="Pathologiques"></textarea>
            </div>
          </div>
          <div className="familiaux">
            <div className="span-text">
              <span>3- Familiaux :</span>
            </div>
            <div className="textarea">
              <textarea name="familiaux" id="familiaux"></textarea>
            </div>
          </div>
          <div className="back-next-buttons back-next-dossier">
            <div className="back">
              <SwiperButtonBack>
                <BsChevronLeft /> Back
              </SwiperButtonBack>
            </div>
            <div className="next">
              <SwiperButtonNext>
                Suivant <BsChevronRight />
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
                  <input type="text" value="kg" />
                </div>
                <div className="taille-examen-general">
                  <div className="span-item petit-span">
                    <span>Taille :</span>
                  </div>
                  <input type="text" value="cm" />
                </div>
                <div className="poule-examen-general">
                  <div className="span-item petit-span">
                    <span>Poule :</span>
                  </div>
                  <input type="text" />
                </div>
                <div className="ta-examen-general">
                  <div className="span-item petit-span">
                    <span>TA :</span>
                  </div>
                  <input type="text" />
                </div>
              </div>
              <div className="examen-entree-item">
                <div className="glycemie">
                  <div className="span-item">
                    <span>Glycemie :</span>
                  </div>
                  <input type="text" />
                </div>
                <div className="uree">
                  <div className="span-item">
                    <span>Uree sanguine :</span>
                  </div>
                  <input type="text" />
                </div>
              </div>
              <div className="examen-entree-item2">
                <div className="span-item span-long">
                  <span>Caractere de cycle :</span>
                </div>
                <input type="text" />
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
                  <input type="text" />
                </div>
                <div className="constraction">
                  <div className="span-item span-long1">
                    <span>Constraction uterines :</span>
                  </div>
                  <input type="text" />
                </div>
              </div>
              <div className="pres-bfc">
                <div className="presentation">
                  <div className="span-item">
                    <span>Presentation :</span>
                  </div>
                  <input type="text" />
                </div>
                <div className="hu">
                  <div className="span-item petit-span">
                    <span>BFC :</span>
                  </div>
                  <input type="text" />
                </div>
              </div>
              <div className="examen-entree-item2">
                <div className="span-item">
                  <span>Uterus :</span>
                </div>
                <input type="text" />
              </div>
              <div className="examen-entree-item2">
                <div className="span-item">
                  <span>Speculum :</span>
                </div>
                <input type="text" />
              </div>
              <div className="textarea">
                <textarea name="exa-obs1" id="exa-obs1"></textarea>
              </div>
              <div className="examen-entree-item2">
                <div className="span-item">
                  <span>Toucher vaginal :</span>
                </div>
                <input type="text" />
              </div>
              <div className="textarea">
                <textarea name="exa-obs2" id="exa-obs2"></textarea>
              </div>
            </div>
          </div>
          <div className="back-next-buttons back-next-dossier">
            <div className="back">
              <SwiperButtonBack>
                <BsChevronLeft /> Back
              </SwiperButtonBack>
            </div>
            <div className="next">
              <SwiperButtonNext>
                Suivant <BsChevronRight />
              </SwiperButtonNext>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
