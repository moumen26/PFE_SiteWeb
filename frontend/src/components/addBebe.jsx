import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import TableSesEnfant from "./tables/tableSesEnfantReadOnlyRow";

export default function AddBebe() {
  const current = new Date();
  const Date_daccouchement = `${current.getDate()}-${
    current.getMonth() + 1
  }-${current.getFullYear()}`;
  const Heure_daccouchement = current.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  //get current user
  const { user } = useAuthContext();
  //get the id of the patient
  const { id } = useParams();
  // initialisation of the navigate function
  const history = useNavigate();
  const [patientData, setPatientData] = useState();
  //Patient data
  useEffect(() => {
    const fetchPatientData = async () => {
      if (id !== undefined) {
        await fetch(`http://localhost:8000/patients/Nouveau-ne/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setPatientData(data);
              })
              .catch((error) => {
                console.error("Error fetching patient data:", error);
              });
          } else {
            console.error("Error fetching patient data:", response.error);
          }
        });
      } else {
        history();
      }
    };

    fetchPatientData();
  }, [history, id, user?.token]);
  // Add NouveauNe
  const handleAddNouveauNe = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/patients/Nouveau-ne/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({
            idAccoucheur: user?.id,
            Date_daccouchement,
            Heure_daccouchement,
          }),
        }
      );
      // get the patientID via response from the server patientRouter.post
      const data = await response.json();
      if (!response.ok) {
        window.alert("Add patient failed", data.error);
      }
      if (response.ok) {
        try {
          const response = await fetch(`http://localhost:8000/patients/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
            body: JSON.stringify({
              idNouveauNe: data._id,
            }),
          });
          // get the MamanID via response from the server
          const data = await response.json();
          if (!response.ok) {
            window.alert("Add idNouveauNe failed", data.error);
          }
          if (response.ok) {
            history(`/antecedent/${await data.id}`);
          }
        } catch (error) {
          console.error("Error adding idNouveauNe:", error);
        }
        history(`/antecedent/${await data.id}`);
      }
    } catch (error) {
      console.error("Error adding Nouveau-ne:", error);
    }
  };
  const [NouveauNeData, setNouveauNeData] = useState();
  //Nouveau-ne data
  useEffect(() => {
    const fetchNouveauNeData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/patients/Nouveau-ne/list/all`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
            body: JSON.stringify({
              ListNouveaune: patientData,
            }),
          }
        );
        // get the patientID via response from the server patientRouter.post
        const data = await response.json();
        if (!response.ok) {
          window.alert(data.message);
        }
        if (response.ok) {
          setNouveauNeData(data);
        }
    }catch (error) {
      console.error("Error adding Nouveau-ne:", error);
    }
    };
    fetchNouveauNeData();
  }, [NouveauNeData,history, id, user?.token]);

  const [enfantAddFormData, setenfantAddFormData] = useState({
    Nom_Nouveaune: "",
    Annee_Nouveaune: "",
    Willaya_Nouveaun: "",
    Region_Nouveaune: "",
  });

  return (
    <div className="add-bebe">
      <div className="ajout-bebe">
        <h2>Ses enfants :</h2>
        {user.speciality.toLowerCase() === "sage femme" && 
          <input
            type="submit"
            value="Ajouter nouveau-ne"
            onClick={handleAddNouveauNe}
          />
        }
      </div>
      <div className="table-patients">
        <div className="table-enfant">
          <table>
            <tr className="table-patients-header">
              <td className="table-patients-header-nom">Nom complet</td>
              <td className="table-patients-header-annee">Annee</td>
              <td className="table-patients-header-willaya">Willaya</td>
              <td className="table-patients-header-region">Region</td>
              <td className="table-patients-header-button"></td>
            </tr>
            {NouveauNeData?.map((Enfant) => (
              <TableSesEnfant Enfant={Enfant} />
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}
