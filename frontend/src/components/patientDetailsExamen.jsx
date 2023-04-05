export default function PatientDetailsExamen() {
  return (
    <div className="patient-details-examen">
      <h2>Examen du nouveau-ne</h2>
      <div className="patient-details-examen-container">
        <div className="patient-details-examen-item">
          <h3>Poids :</h3>
          <span>65kg</span>
        </div>
        <div className="patient-details-examen-item">
          <h3>Taille :</h3>
          <span>186cm</span>
        </div>
        <div className="patient-details-examen-item">
          <h3>
            Périmètre <br />
            crânien :
          </h3>
          <span>186cm</span>
        </div>
        <div className="patient-details-examen-item">
          <h3>
            Fréquence <br />
            cardiaque :
          </h3>
          <span>100s</span>
        </div>
        <div className="patient-details-examen-item">
          <h3>
            Fréquence <br />
            respiratoire :
          </h3>
          <span>100s</span>
        </div>

        <div className="patient-details-examen-score">
          <h3>Score d’Apgar :</h3>
          <div className="patient-details-examen-score-inputs">
            <div className="patient-details-examen-score-input">
              <span>1 min</span>
              <input type="checkbox" />
            </div>
            <div className="patient-details-examen-score-input">
              <span>5 min</span>
              <input type="checkbox" />
            </div>
          </div>
        </div>
      </div>
      <div className="patient-details-examen-alliaitment">
        <h3>Allaitement :</h3>
        <div className="patient-details-examen-alli-inputs">
          <div className="patient-details-examen-alli-input">
            <span>Maternal</span>
            <input type="checkbox" />
          </div>
          <div className="patient-details-examen-alli-input">
            <span>Artificiel</span>
            <input type="checkbox" />
          </div>
          <div className="patient-details-examen-alli-input">
            <span>Mixte</span>
            <input type="checkbox" />
          </div>
        </div>
      </div>
    </div>
  );
}
