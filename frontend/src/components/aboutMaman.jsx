import React from 'react'

export default function AboutMaman({PatientData}) {
  return (
    <div className="about-maman">
      <div className="about-maman-description">
        <h2>About patient</h2>
        <div className="about-maman-cart">
          <div className="maman-cart-class">
            <div className="maman-cart-item">
              <span>Name :</span>
              <h3>{PatientData?.Nom}</h3>
            </div>
            <div className="maman-cart-item">
              <span>Prénom :</span>
              <h3>{PatientData?.Prenom}</h3>
            </div>
            <div className="maman-cart-item">
              <span>SEXE :</span>
              <h3>{PatientData?.Sexe}</h3>
            </div>
            <div className="maman-cart-item">
              <span>Profession :</span>
              <h3>{PatientData?.Profession}</h3>
            </div>
            <div className="maman-cart-item">
              <span>Nom de famille du mari :</span>
              <h3>{PatientData?.Nom}</h3>
            </div>
          </div>
          <div className="maman-cart-class">
            <div className="maman-cart-item">
              <span>Ne (e) le :</span>
              <h3>{PatientData?.DateDeNaissance}</h3>
            </div>
            <div className="maman-cart-item">
              <span>Age :</span>
              <h3>{PatientData?.Age}</h3>
            </div>
            <div className="maman-cart-item">
              <span>Ne (e) en :</span>
              <h3>{PatientData?.LieuDeNaissance}</h3>
            </div>
            <div className="maman-cart-item">
              <span>Telephone :</span>
              <h3>{PatientData?.Telephone}</h3>
            </div>
            <div className="maman-cart-item">
              <span>Poids :</span>
              <h3>{PatientData?.Poids}</h3>
            </div>
          </div>
          <div className="maman-cart-class">
            <div className="maman-cart-item">
              <span>Commune :</span>
              <h3>Medea</h3>
            </div>
            <div className="maman-cart-item">
              <span>Wilaya :</span>
              <h3>{PatientData?.Adresse}</h3>
            </div>
            <div className="maman-cart-item">
              <span>Address :</span>
              <h3>{PatientData?.Adresse}</h3>
            </div>
            <div className="maman-cart-item">
              <span>Nombre de enfants :</span>
              <h3>{PatientData?.NbrEnfant}</h3>
            </div>
            <div className="maman-cart-item">
              <span>Taille :</span>
              <h3>{PatientData?.Taille}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
