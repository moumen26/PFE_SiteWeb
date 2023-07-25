import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function MaladeProfile() {
  const [userData, setUserData] = useState();
  const { user } = useAuthContext();
//get user data
useEffect(() => {
  const fetchUserData = async () => {
    if (user?.id !== undefined) {
      await fetch(`http://localhost:8000/user/${user?.id}`, {
        headers: {
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
    }
  };

  fetchUserData();
}, [userData, user?.token, user?.id]);
console.log(userData);
  return (
    <div className="Malade-Profile">
      <div className="Malade-profile-container">
        <div className="malade-profile-header">
          <div className="malade-profile-left-header">
            <div className="malade-profle-image"></div>
            <div className="malade-profile-name-id">
              <h2>
                {userData?.Lname} {userData?.Fname}
              </h2>
              <span>{userData?._id}</span>
            </div>
          </div>
        </div>
        <div className="malade-profile-information">
          <div className="malade-profile-form-class">
            <div className="malade-profile-form-item">
              <label htmlFor="">Prénom</label>
              <input type="text" readOnly value={userData?.Fname} />
            </div>
            <div className="malade-profile-form-item">
              <label htmlFor="">Specialite</label>
              <input type="text" readOnly value={user?.speciality} />
            </div>
            <div className="malade-profile-form-item">
              <label htmlFor="">Lieu de naissance</label>
              <input type="text" readOnly value={userData?.LieuDeNaissance} />
            </div>
            <div className="malade-profile-form-item">
              <label htmlFor="">Email</label>
              <input type="email" readOnly value={userData?.email} />
            </div>
            <div className="malade-profile-form-item">
              <label htmlFor="">Address actuel</label>
              <input type="text" readOnly value={userData?.AddressActuel} />
            </div>
          </div>
          <div className="malade-profile-form-class">
            <div className="doctor-profile-form-item">
              <label htmlFor="">Nom</label>
              <input type="text" readOnly value={userData?.Lname} />
            </div>
            <div className="malade-profile-form-item">
              <label htmlFor="">Date de naissance</label>
              <input type="text" readOnly value={userData?.DateDeNaissance} />
            </div>
            <div className="malade-profile-form-item">
              <label htmlFor="">Sexe</label>
              <input type="text" readOnly value={userData?.sexe} />
            </div>
            <div className="malade-profile-form-item">
              <label htmlFor="">Tel</label>
              <div className="telephone-input">
                <span>+213</span>
                <input type="text" readOnly value={userData?.phone} />
              </div>
            </div>
            <div className="malade-profile-form-item">
              <label htmlFor="">Hopital</label>
              <input type="text" readOnly value={user?.Hopital} />
            </div>
          </div>
          <div className="malade-profile-form-class">
            <div className="malade-profile-form-item">
              <label htmlFor="">Biographie</label>
              <textarea
                name=""
                readOnly
                value={userData?.Biographie}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
