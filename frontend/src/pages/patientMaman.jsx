import { useEffect, useState } from "react";
import MyAsideBarActive from "../components/asideBarActive";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import SearchButton from "../components/buttons/buttonSearch";
import TableNouveauNe from "../components/tables/tableNouveauNeReadOnlyRow";
export default function PatientDetails() {
  const current = new Date();
  const date = `${current.getDate()}-${
    current.getMonth() + 1
  }-${current.getFullYear()}`;
  const time = current.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const [search, setSearch] = useState("");
  const [wilaya, setWilaya] = useState("All");
  const [region, setRegion] = useState("All");
  const [naissance, setNaissance] = useState("All");
  const { user } = useAuthContext();
  const history = useNavigate();

  const [NouveauneDB, setNouveauneDB] = useState();
  // Fetch Patient Data
  useEffect(() => {
    const fetchPatientData = async () => {
      if (user?.token !== undefined) {
        await fetch(`http://localhost:8000/patients/`, {
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
        history(`/patients`);
      }
    };
    fetchPatientData();
  }, [history, user?.token]);

  const [add, setAdd] = useState(false);
  const [act, setAct] = useState(false);

  const handleAddPatient = async () => {
    history(`/rendezvous`);
  };

  return (
    <div className="Patients-Details">
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
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="search-item">
              <SearchButton />
            </div>

            <div className="ajoute-nouveau-ne-item">
              <input
                type="submit"
                onClick={handleAddPatient}
                value="Ajouter un patient"
              />
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
    </div>
  );
}
