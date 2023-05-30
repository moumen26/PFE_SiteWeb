export default function AboutPatient({PatientData}) {
  return (
    <div className="about-patient">
      <div className="about-patient-description">
        <h2>About patient</h2>
        <div className="about-patient-cart">
          <div className="patient-cart-class">
            <div className="patient-cart-item">
              <span>Name :</span>
              <h3>{PatientData?.Nom}</h3>
            </div>
            <div className="patient-cart-item">
              <span>Prénom :</span>
              <h3>{PatientData?.Prenom}</h3>
            </div>
            <div className="patient-cart-item">
              <span>SEXE :</span>
              <h3>{PatientData?.Sexe}</h3>
            </div>
          </div>
          <div className="patient-cart-class">
            <div className="patient-cart-item">
              <span>Ne (e) le :</span>
              <h3>{PatientData?.DateDeNaissance}</h3>
            </div>
            <div className="patient-cart-item">
              <span>Address :</span>
              <h3>{PatientData?.Adresse}</h3>
            </div>
            <div className="patient-cart-item">
              <span>Commune :</span>
              <h3>{PatientData?.Adresse}</h3>
            </div>
          </div>
          <div className="patient-cart-class">
            <div className="patient-cart-item">
              <span>Wilaya :</span>
              <h3>{PatientData?.Adresse}</h3>
            </div>
            <div className="patient-cart-item">
              <span>Age :</span>
              <h3>{PatientData?.Age}</h3>
            </div>
            <div className="patient-cart-item">
              <span>Ne (e) en :</span>
              <h3>{PatientData?.LieuDeNaissance}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
