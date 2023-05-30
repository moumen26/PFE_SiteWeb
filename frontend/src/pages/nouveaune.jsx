import React, { useState, useEffect } from "react";
import MyNavBar from "../components/navBar";
import MyAsideBar from "../components/asideBar";
import MyAsideBarActive from "../components/asideBarActive";
import { BsChevronLeft, BsFillCloudDownloadFill } from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import AboutPatient from "../components/aboutPatient";
import PatientDetailsCenter from "../components/patientDetails";
import PatientDetailsExamen from "../components/patientDetailsExamen";
import PatientDetailsReducation from "../components/patientDetailsReducation";
import MySwiper from "../components/swipers/swiperDossier";
import AddCahierSante from "../components/buttons/buttonAddCahier";
import MyCahierSwiper from "../components/swipers/swiperCahier";
import ConculterButton from "../components/buttons/buttonConculter";
import VoirButton from "../components/buttons/buttonVoir";
import SearchButton from "../components/buttons/buttonSearch";
import TableNouveauNe from "../components/tables/tableNouveauNeReadOnlyRow";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
//import { CircularProgress } from "@mui/material";

export default function NouveauNe() {
  const [add, setAdd] = useState(false);
  const [act, setAct] = useState(false);
  const history = useNavigate("/patients");
  const [search, setSearch] = useState("");
  const [wilaya, setWilaya] = useState("All");
  const [region, setRegion] = useState("All");
  const [naissance, setNaissance] = useState("All");
  const [medAddFormData, setMedAddFormData] = useState({
    Nom_Nouveaune: "",
    Annee_Nouveaune: "",
    Willaya_Nouveaun: "",
    Region_Nouveaune: "",
  });

  const [loading, setLoading] = useState();

  let toggleClassAdd = add ? " add-cahier-active" : "";

  const [NouveauneDB, setNouveauneDB] = useState();
  const [UserData , setUserData] = useState();
  const { user } = useAuthContext();
  // Fetch Patient Data
 // Fetch Patient Data
 useEffect(() => {
  const fetchPatientData = async () => {
    if (user?.token !== undefined) {
      await fetch(`http://localhost:8000/patients/Nouveau-ne/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      }).then((response) => {
        if (response.ok) {
          response
            .json()
            .then((data) => {
              setNouveauneDB(data);
            })
            .catch((error) => {
              console.error("Error fetching Patient data:", error);
            });
        } else {
          console.error("Error resieving Patient date", response.error);
        }
      });
    } else {
      history("/login");
    }
  };
  fetchPatientData();
}, [history, user?.token]);
  return (
    <div>
      <div className="patient-table">
        <MyAsideBarActive act={act} setAct={setAct}></MyAsideBarActive>
        <div className="patient-table-container">
          <div className="patient-table-header">
            <div className="table-header-item">
              <label>Annee</label>
              <select
                className="Annee-select"
                name="Annee-age"
                id="Annee-age"
                onChange={(e) => setNaissance(e.target.value)}
              >
                <option value="All">All</option>
                <option value="2002">2002</option>
                <option value="2003">2003</option>
                <option value="2004">2004</option>
              </select>
            </div>
            <div className="table-header-item">
              <label>Wilaya</label>
              <select
                className="Wilaya-select"
                name="Wilaya-age"
                id="Wilaya-age"
                onChange={(e) => setWilaya(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Medea">Medea</option>
                <option value="Blida">Blida</option>
                <option value="Alger">Alger</option>
              </select>
            </div>
            <div className="table-header-item">
              <label>Region</label>
              <select
                className="Region-select"
                name="Region-age"
                id="Region-age"
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Medea">Medea</option>
                <option value="Blida">Blida</option>
                <option value="Alger">Alger</option>
              </select>
            </div>
            <input
              type="search"
              className="class-search"
              placeholder="Search.."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <div className="search-item">
              <SearchButton />
            </div>
          </div>
          <div className="table-patients">
            <table>
              <tr className="table-patients-header">
                <td className="table-patients-header-nom">Nom complet</td>
                <td className="table-patients-header-annee">Annee</td>
                <td className="table-patients-header-willaya">Willaya</td>
                <td className="table-patients-header-region">Region</td>
                <td className="table-patients-header-button"></td>
              </tr>
              {NouveauneDB?.filter((item) => {
                if (item.DateDeNaissance && item.LieuDeNaissance && item.Adresse) {
                  if (search.toLowerCase() === "") {
                    if (naissance === "All") {
                      if (wilaya === "All") {
                        if (region === "All") {
                          return item;
                        } else if (item.Adresse.toLowerCase().includes(region.toLowerCase())) {
                          return item;
                        }
                      } else if (item.LieuDeNaissance.toLowerCase().includes(wilaya.toLowerCase())) {
                        if (region === "All") {
                          return item;
                        } else if (item.Adresse.toLowerCase().includes(region.toLowerCase())) {
                          return item;
                        }
                      }
                    } else if (item.DateDeNaissance.includes(naissance)) {
                      if (wilaya === "All") {
                        if (region === "All") {
                          return item;
                        } else if (item.Adresse.toLowerCase().includes(region.toLowerCase())) {
                          return item;
                        }
                      } else if (item.LieuDeNaissance.toLowerCase().includes(wilaya.toLowerCase())) {
                        if (region === "All") {
                          return item;
                        } else if (item.Adresse.toLowerCase().includes(region.toLowerCase())) {
                          return item;
                        }
                      }
                    }
                  } else if (
                    item._id.includes(search.toLowerCase()) ||
                    item.Nom.toLowerCase().includes(search.toLowerCase()) ||
                    item.Prenom.toLowerCase().includes(search.toLowerCase())
                  ) {
                    if (naissance === "All") {
                      if (wilaya === "All") {
                        if (region === "All") {
                          return item;
                        } else if (item.Adresse.toLowerCase().includes(region.toLowerCase())) {
                          return item;
                        }
                      } else if (item.LieuDeNaissance.toLowerCase().includes(wilaya.toLowerCase())) {
                        if (region === "All") {
                          return item;
                        } else if (item.Adresse.toLowerCase().includes(region.toLowerCase())) {
                          return item;
                        }
                      }
                    } else if (item.DateDeNaissance.includes(naissance)) {
                      if (wilaya === "All") {
                        if (region === "All") {
                          return item;
                        } else if (item.Adresse.toLowerCase().includes(region.toLowerCase())) {
                          return item;
                        }
                      } else if (item.LieuDeNaissance.toLowerCase().includes(wilaya.toLowerCase())) {
                        if (region === "All") {
                          return item;
                        } else if (item.Adresse.toLowerCase().includes(region.toLowerCase())) {
                          return item;
                        }
                      }
                    }
                  }
                } else {
                  if (search.toLowerCase() === "") {
                    return item;
                  } else if (
                    item._id.includes(search.toLowerCase()) ||
                    item.Nom.toLowerCase().includes(search.toLowerCase()) ||
                    item.Prenom.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return item;
                  }
                }
              }).map((NouveauNe) => (
                <TableNouveauNe NouveauNe={NouveauNe} />
              ))}
            </table>
          </div>
        </div>
      </div>
      {/* <div className="patient-details">
        loading ? (
          <p>loading</p>
        ) : (
          <div>
            <div className="patient-details-header">
              <BsChevronLeft className="icon-button" />
              <div className="patient-details-header-right">
                <FaShare className="icon-button" />
                <BsFillCloudDownloadFill className="icon-button" />
              </div>
            </div>
            <h2>Patient details</h2>
            <div className="patient-details-container">
              <AboutPatient></AboutPatient>
              <PatientDetailsCenter></PatientDetailsCenter>
              <div className="patient-details-container-right">
                <PatientDetailsExamen></PatientDetailsExamen>
                <PatientDetailsReducation></PatientDetailsReducation>
              </div>
            </div>
            <div className="patient-details-dossier-obse">
              <div className="patient-details-dossier-obse-swiper">
                <MySwiper></MySwiper>
              </div>
              <div className="profile-details-add-cahier">
                <AddCahierSante add={add} setAdd={setAdd} />
              </div>
              <div className={`profile-details-cahier-vaccin${toggleClassAdd}`}>
                <div className="cahier-formulaire-swiper">
                  <MyCahierSwiper></MyCahierSwiper>
                </div>
              </div>
            </div>
          </div>
        )
      </div> */}
    </div>
  );
}
