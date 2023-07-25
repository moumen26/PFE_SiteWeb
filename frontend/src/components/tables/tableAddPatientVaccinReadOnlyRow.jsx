import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
// import ConfirmDialog from "../dialoges/dialogeAlert";

const ReadOnlyRow = ({
  VaccinData,
  handleEditRowClick,
  handleDeleteClick,
  confirmDialog,
  setConfirmDialog,
}) => {
  const [VaccinDB, setVaccinDB] = useState();
  const { user } = useAuthContext();
  //get data of vaccin by nom
  useEffect(() => {
    const fetchVaccinDB = async () => {
      await fetch(
        `http://localhost:8000/patients/Vaccin/${VaccinData?.Nom_vaccin}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      ).then((response) => {
        if (response.ok) {
          response
            .json()
            .then((data) => {
              setVaccinDB(data);
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
  }, [VaccinData, user.token]);
  return (
    <tr>
      <td className="vaccination-table-title-line2">
        <span>{VaccinDB?.age_recommande}</span>
      </td>
      <td>
        <span>{VaccinData?.Nom_vaccin}</span>
      </td>
      <td>
        <span>{VaccinDB?.contre_quoi}</span>
      </td>
      <td>
        <span>{VaccinDB?.technique_vaccinale}</span>
      </td>
      <td>
        <span>{VaccinDB?.numero_lot}</span>
      </td>
      <td>
        <span>{VaccinData?.Date_vaccination}</span>
      </td>
      <td>
        <div className="action-table">
          {VaccinData.ID_vaccinateur == user.id && (
            <button onClick={(event) => handleEditRowClick(event, VaccinData)}>
              Edit
            </button>
          )}
          {VaccinData.ID_vaccinateur == user.id && (
            <button
              // onClick={() => {
              //   setConfirmDialog({
              //     isOpen: true,
              //     title: "Êtes-vous sûr de supprimer cette Vacciantion ?",
              //     subTitle: "Vous ne pouvez pas annuler cette opération",
              //     onConfirm: (event) => {
              //       handleDeleteClick(event, VaccinData?._id);
              //     },
              //   });
              // }}
              onClick={(event) => handleDeleteClick(event, VaccinData?._id)}
            >
              Delete
            </button>
          )}
        </div>
        {/* <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        /> */}
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
