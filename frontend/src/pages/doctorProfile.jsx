import React, { useState ,useEffect} from "react";
import MyAsideBarActive from "../components/asideBarActive";
import MyNavBar from "../components/navBar";
import DoctorProfileEnregistrerButton from "../components/doctorProfileEnregistrerButton";
import { useUserProfile } from "../hooks/useUserProfile";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function DoctorProfile() {
  const [act, setAct] = useState(false);
  const [userData, setUserData] = useState({});
  const history = useNavigate();
  const [DateDeNaissance, setDateDeNaissance] = useState("");
  const [LieuDeNaissance, setLieuDeNaissance] = useState("");
  const [sexe, setsexe] = useState("");
  const [AddressActuel, setAddressActuel] = useState("");
  const [Biographie, setBiographie] = useState("");
  const { UserProfile, error } = useUserProfile();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchUserData = async () => {
      if(user?.id !== undefined){
        await fetch(`http://localhost:8000/user/${user?.id}`,{headers:{
          'Authorization': `Bearer ${user?.token}`
        }}).then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              setUserData(data);
            }).catch((error) => {
              console.error('Error fetching user data:', error);
            });
          } else {
            console.error('Error fetching user data:', response.status);
          }
        });
      }else{
        history.push('/login');
      }
    };

    fetchUserData();
  }, [userData,user?.id]);

  async function submitProfile(e) {
    e.preventDefault();
    try {
      //send token with axios to headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      //send request to backend
      const response = await axios.patch(`http://localhost:8000/user/${user.id}`,
      { 
        DateDeNaissance, sexe, LieuDeNaissance, AddressActuel, Biographie
      });
      // Handle response as needed
      if (!response.status === 200) {
          window.alert("profile not updated", response.data.message);
          console.log("profile not updated", response.data.message);
      }else if (response.status === 200) {
          window.alert("profile updated successfully", response.data.message);
      } 
    } catch (err) {
        window.alert("profile not updated", err.message);
        console.log(err);
    }

  }

  return (
    <div className="Doctor-profile">
      <MyNavBar act={act} setAct={setAct}></MyNavBar>
      <div className="lh"></div>
      <MyAsideBarActive act={act} setAct={setAct}></MyAsideBarActive>
      <div className="doctor-profile-container">
        <div className="doctor-profile-title">
          <h2>profile</h2>
          <span>Gerez les parametre de votre profil</span>
        </div>
        <div className="doctor-profile-votre-photo">
          <h3>Votre photo de profile</h3>
          <div className="doctor-profile-photo-changer-btn">
            <div className="doctor-profile-photo"></div>
            <div className="doctor-profile-changer-btn">
              <label for="file" class="changer-image-btn">
                Choisir la photo
              </label>
              <input
                id="file"
                class="input-file"
                type="file"
              ></input>
              <button>Supprimer</button>
            </div>
          </div>
          <span>Ajouter votre photo, la taille recommandee est 256x256px</span>
        </div>
        <div className="doctor-profile-nom-hopital">
          <div className="doctor-profile-logo-hopital"></div>
          <h2>Nom de l'hopital</h2>
        </div>
        <form action="" onSubmit={submitProfile}>
          <div className="doctor-profile-form-class">
            {error && (
              <div className="error">
                <p>hey its error</p>
                {error.error}
              </div>
            )}
            <div className="doctor-profile-form-item">
              <label htmlFor="">Prénom</label>
              <input type="text" placeholder="Entez votre Prenom.." defaultValue={userData?.Fname} />
            </div>
            <div className="doctor-profile-form-item">
              <label htmlFor="">Nom</label>
              <input type="text" placeholder="Entez votre Nom.." defaultValue={userData?.Lname}/>
            </div>
          </div>
          <div className="doctor-profile-form-class">
            <div className="doctor-profile-form-item">
              <label htmlFor="">Specialite</label>
              <input type="text" placeholder="Entez votre Specialite.." defaultValue={userData?.speciality}/>
            </div>
            <div className="doctor-profile-form-item">
              <label htmlFor="">Date de naissance</label>
              <input type="date" placeholder="Entez votre Nom.." 
                defaultValue={userData?.DateDeNaissance}
                name="DateDeNaissance"
                onChange={(e) => {
                setDateDeNaissance(e.target.value);}} />
            </div>
          </div>
          <div className="doctor-profile-form-class">
            <div className="doctor-profile-form-item">
              <label htmlFor="">Lieu de naissance</label>
              <input
                type="text"
                placeholder="Entez votre Lieu de naissance.."
                defaultValue={userData?.LieuDeNaissance}
                name="LieuDeNaissance"
                onChange={(e) => {
                setLieuDeNaissance(e.target.value);}}
              />
            </div>
            <div className="doctor-profile-form-item">
              <label htmlFor="">Sexe</label>
              <select 
                name="sexe"
                onChange={(e) => {
                setsexe(e.target.value);}} 
              >
                <option value={userData?.sexe}>{userData?.sexe}</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
            </div>
          </div>
          <div className="doctor-profile-form-class">
            <div className="doctor-profile-form-item">
              <label htmlFor="">Email</label>
              <input type="email" placeholder="Entez votre Email.." defaultValue={userData?.email}/>
            </div>
            <div className="doctor-profile-form-item">
              <label htmlFor="">Tel</label>
              <div className="telephone-input">
                <span>+213</span>
                <input
                  type="phone"
                  placeholder="Entez votre Numero de telephone.."
                  defaultValue={userData?.phone}
                />
              </div>
            </div>
          </div>
          <div className="doctor-profile-form-class2">
            <div className="doctor-profile-forme-left-item">
              <div className="doctor-profile-form-item">
                <label htmlFor="">Address actuel</label>
                <input type="text" placeholder="Entez votre Address actuel.." 
                defaultValue={userData?.AddressActuel}
                name="AddressActuel"
                onChange={(e) => {
                setAddressActuel(e.target.value);}}
                />
              </div>
              <div className="doctor-profile-form-item">
                <label htmlFor="">Changer votre mot de pass</label>
                <input
                  type="password"
                  placeholder="Entez votre Mot de passe.."
                />
              </div>
            </div>
            <div className="doctor-profile-forme-right-item">
              <div className="doctor-profile-form-item">
                <label htmlFor="">Biographie</label>
                <textarea placeholder="Votre Biographie"
                  defaultValue={userData?.Biographie}
                  name="Biographie"
                  onChange={(e) => {
                  setBiographie(e.target.value);}}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="form-span">
          <div className="form-span-item">
            <div className="form-div-carre"></div>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,
              molestiae?
            </span>
          </div>
          <div className="form-span-item">
            <div className="form-div-carre"></div>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,
              molestiae?
            </span>
          </div>
        </div>
        <div className="doctor-profile-enregistrer-class">
          <DoctorProfileEnregistrerButton />
        </div>
        </form>
        
      </div>
    </div>
  );
}
