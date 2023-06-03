import React from "react";

export default function MaladeProfile() {
  return (
    <div className="Malade-Profile">
      <div className="Malade-profile-container">
        <div className="malade-profile-header">
          <div className="malade-profile-left-header">
            <div className="malade-profle-image"></div>
            <div className="malade-profile-name-id">
              <h2>Khaldi Abdelmoumen</h2>
              <span>546513246535</span>
            </div>
          </div>
          <input
            type="submit"
            value="Modifier le profile"
            // onClick={() => {
            //   setConfirmDialog({
            //     isOpen: true,
            //     title: "Are you sure you want to save this Nouveau-ne?",
            //     subTitle: "you can't undo this operation",
            //     onConfirm: () => {
            //       handleDossObsSubmit();
            //     },
            //   });
            // }}
          />
        </div>
        <div className="malade-profile-information">
          <div className="malade-profile-form-class">
            <div className="malade-profile-form-item">
              <label htmlFor="">Prénom</label>
              <input type="text" value="Abdelmoumen" />
            </div>
            <div className="malade-profile-form-item">
              <label htmlFor="">Specialite</label>
              <input type="text" value="" />
            </div>
            <div className="malade-profile-form-item">
              <label htmlFor="">Lieu de naissance</label>
              <input type="text" value="Blida" />
            </div>
            <div className="malade-profile-form-item">
              <label htmlFor="">Email</label>
              <input type="email" value="moumenkhaldi26@gmail.com" />
            </div>
            <div className="malade-profile-form-item">
              <label htmlFor="">Address actuel</label>
              <input type="text" />
            </div>
          </div>
          <div className="malade-profile-form-class">
            <div className="doctor-profile-form-item">
              <label htmlFor="">Nom</label>
              <input type="text" value="Khaldi" />
            </div>
            <div className="malade-profile-form-item">
              <label htmlFor="">Date de naissance</label>
              <input type="text" value="26-05-2002" />
            </div>
            <div className="malade-profile-form-item">
              <label htmlFor="">Sexe</label>
              <input type="text" value="Male" />
            </div>
            <div className="malade-profile-form-item">
              <label htmlFor="">Tel</label>
              <div className="telephone-input">
                <span>+213</span>
                <input type="text" value="791467848" />
              </div>
            </div>
            <div className="malade-profile-form-item">
              <label htmlFor="">Hopital</label>
              <input type="text" />
            </div>
          </div>
          <div className="malade-profile-form-class">
            <div className="malade-profile-form-item">
              <label htmlFor="">Biographie</label>
              <textarea name=""></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
