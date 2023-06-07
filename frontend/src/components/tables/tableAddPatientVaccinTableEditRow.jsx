import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

function EditRow({ editFromData, handleEditFromChange, handleCancelClick }) {
  const [VaccinData, setVaccinData] = useState();
  const [AgeRecommande, setAgeRecommande] = useState();
  const [ContreQuoi, setContreQuoi] = useState();
  const [Technique, setTechnique] = useState();
  const [NumeroLot, setNumeroLot] = useState();
  //Get patient id from parms
  const { id } = useParams();
  //Get user 
  const { user } = useAuthContext();
  //Get navigate
  const history = useNavigate("/patients");
  // Fetch Vaccins
  useEffect(() => {
    const fetchVaccinDB = async () => {
        await fetch(`http://localhost:8000/patients/Vaccin/all/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setVaccinData(data);
              })
              .catch((error) => {
                console.error("Error fetching Vaccin data:", error);
              });
          } else {
            console.error("Error resieving vaccin date", response.error);
          }
        });
    };
    fetchVaccinDB();
  }, [history, id, VaccinData, user.token]);
  // Fetch vaccin data
  useEffect(() => {
    const fetchVaccinDB = async () => {
      await fetch(`http://localhost:8000/patients/Vaccin/${editFromData?.Nom_vaccin}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }).then((response) => {
        if (response.ok) {
          response
            .json()
            .then((data) => {
              setAgeRecommande(data.age_recommande);
              setContreQuoi(data.contre_quoi);
              setTechnique(data.technique_vaccinale);
              setNumeroLot(data.numero_lot);
            })
            .catch((error) => {
              console.error("Error fetching Vaccin data:", error);
            });
        } else {
          console.error("Error resieving vaccin date", response.error);
        }
      });
    };
    fetchVaccinDB();
  }, [editFromData?.Nom_vaccin, user.token]);
  const handleselectchanged = (event) => {
    const fetchVaccinDB = async () => {
      await fetch(`http://localhost:8000/patients/Vaccin/${event}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }).then((response) => {
        if (response.ok) {
          response
            .json()
            .then((data) => {
              setAgeRecommande(data.age_recommande);
              setContreQuoi(data.contre_quoi);
              setTechnique(data.technique_vaccinale);
              setNumeroLot(data.numero_lot);
            })
            .catch((error) => {
              console.error("Error fetching Vaccin data:", error);
            });
        } else {
          console.error("Error resieving vaccin date", response.error);
        }
      });
    };
    fetchVaccinDB();
  };
  const handleVaccinonChange = (event) => {
    handleEditFromChange(event);
    handleselectchanged(event);
  };
  return (
    <tr>
      <td>
        <select
          className="vaccination-select"
          name="vaccinationAge"
          id="vaccination-age"
          required="required"
          defaultValue={editFromData?.Age_vaccination}
        >
          <option selected disabled>
            {AgeRecommande || "Age"}
          </option>

        </select>
      </td>
      <td>
        <select
          className="vaccination-select"
          name="vaccinationVaccin"
          id="vaccination-vaccin"
          required="required"
          defaultValue={editFromData?.Nom_vaccin}
          onChange={handleVaccinonChange}
        >
          <option selected disabled>
            {editFromData?.Nom_vaccin}
          </option>
          {VaccinData ? VaccinData.map((Vaccin) => (
            <option value={Vaccin.nom}>{Vaccin.nom}</option>
          )) : null}
        </select>
      </td>
      <td>
        <select
          className="vaccination-select"
          name="vaccinationContre"
          id="vaccination-contre"
          required="required"
          defaultValue={editFromData?.Contre_vaccin}
        >
          <option selected disabled>
            {ContreQuoi || "Contre"}
          </option>

        </select>
      </td>
      <td>
        <select
          className="vaccination-select"
          name="vaccinationTechnique"
          id="vaccination-technique"
          required="required"
          defaultValue={editFromData?.Technique_vaccinale}
        >
          <option selected disabled>
            {Technique || "Technique"}
          </option>
    
        </select>
      </td>
      <td>
        <select
          className="vaccination-select"
          name="vaccinationNumero"
          id="vaccination-numero"
          required="required"
          defaultValue={editFromData?.Numero_lot}
        >
          <option selected disabled>
            {NumeroLot || "Numero"}
          </option>
          
        </select>
      </td>
      <td>
        <input
          className="editDate"
          type="date"
          name="vaccinationDate"
          required="required"
          defaultValue={editFromData?.Date_vaccination}
          onChange={handleEditFromChange}
        />
      </td>
      <td>
        <div className="action-table">
          <button type="submit">Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      </td>
    </tr>
  );
}

export default EditRow;
