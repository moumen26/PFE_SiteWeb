import React from 'react'
import ButtonAddConcultationTable from '../components/buttons/buttonAddConcultationTable';
import TableConcultation from '../components/tables/tableConcultation';

export default function AffichageHospitalisation() {
  return (
    <div className="Affichage-Hospitalisation">
      <div className="Affichage-Hospitalisation-container">
        <div className="addpatient-hedear">
          <input type="submit" value="Annuler" />
          <h2>Hospitalisation</h2>
          <input type="submit" value="Enregistrer tout" />
        </div>
        <div className="affichage-concultation-header">
          <h3>
            Medecin : <span>Dr. Khaldi</span>
          </h3>
          <div className="time-date-concultation">
            <h3>
              Heure : <span>00:46</span>
            </h3>
            <h3>
              Date : <span>01/06/2023</span>
            </h3>
          </div>
        </div>
        <div className="home-formulaire-swiper profile-hospitalisation">
          <div className="profile-cahier-swiper-title">
            <h2>Concultation</h2>
            <ButtonAddConcultationTable />
          </div>
          <div className="line-hl">
            <div className="hl"></div>
          </div>
          <TableConcultation />
        </div>
      </div>
    </div>
  );
}
