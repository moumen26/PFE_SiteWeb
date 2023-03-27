import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";

import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { useState } from "react";
import SwiperButtonNext from "./nextButton";
import SwiperButtonBack from "./backButton";

export default function MySwiper() {
  return (
    <Swiper
      className="swiper-formulaire"
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide className="Swipe">
        <div className="formulaire-dossier-obster obster-first">
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
          <div className="next4">
            <SwiperButtonNext>
              Suivant <BsChevronRight />
            </SwiperButtonNext>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="Swipe">
        <div className="formulaire-dossier-obster obster-first">
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
                  <div className="ddr-terme-span">
                    <span>DDR :</span>
                  </div>
                  <input type="text" />
                </div>
                <div className="ddr-terme-item">
                  <div className="ddr-terme-span">
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
            <div className="back3">
              <SwiperButtonBack>
                <BsChevronLeft /> Back
              </SwiperButtonBack>
            </div>
            <div className="next5">
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
