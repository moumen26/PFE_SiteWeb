import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";

import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { useState } from "react";
import SwiperButtonNext from "./nextButton";
import SwiperButtonBack from "./backButton";

export default function MyCahierSwiper({ add, setAdd }) {
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

          <div className="sexe-date-heure">
            <div className="sexe">
              <span>Sexe :</span>
              <select name="sexe" id="sexe">
                <option selected disabled>
                  Sexe
                </option>
                <option value="man">Man</option>
                <option value="woman">Woman</option>
              </select>
            </div>
            <div className="date">
              <span>Date :</span>
              <input type="date" name="date" id="date" />
            </div>
            <div className="heure">
              <span>Heure :</span>
              <input type="time" name="time" id="time" />
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
              <span>Reanimation :</span>
              <input type="checkbox" />
            </div>
            <div className="duree">
              <span>Duree :</span>
              <input type="text" />
            </div>
            <div className="malforamtion">
              <span>Malformation :</span>
              <input type="text" />
            </div>
          </div>

          <div className="transfert-motif">
            <div className="transfert">
              <span>Transfert :</span>
              <input type="checkbox" />
            </div>
            <div className="motif">
              <span>Motif du transfert :</span>
              <input type="text" />
            </div>
          </div>

          <div className="examen">
            <div className="cordon">
              <div className="span">
                <span>Examen du cordon 2A/1V</span>
              </div>

              <input type="text" />
            </div>
          </div>

          <div className="emission">
            <div className="urine">
              <span>Emission d’urine :</span>
              <input type="checkbox" />
            </div>
            <div className="meconium">
              <span>Emission du meconium :</span>
              <input type="checkbox" />
            </div>
          </div>

          <div className="cathet">
            <div className="choanes">
              <div className="span">
                <span>Catheterisme des choanes</span>
              </div>
              <input type="text" />
            </div>
          </div>

          <div className="recherche">
            <div className="atresie">
              <div className="span1">
                <span>Recherche d’une atresie de l'oesophage</span>
              </div>
              <input type="text" />
            </div>
          </div>

          <div className="organes">
            <div className="genitaux">
              <div className="span">
                <span>Organes genitaux externes</span>
              </div>
              <input type="text" />
            </div>
          </div>

          <div className="vitamine">
            <div class="k1">
              <div class="span">
                <span>Vitamine K1</span>
              </div>
              <input type="text" />
            </div>
          </div>

          <div className="catheterisme">
            <div className="c-choanes">
              <div className="span">
                <span>Catheterisme des choanes</span>
              </div>
              <input type="text" />
            </div>
          </div>

          <div className="next-first">
            <SwiperButtonNext>
              Suivant <BsChevronRight />
            </SwiperButtonNext>
          </div>
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
