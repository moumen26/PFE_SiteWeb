import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import Notification from "../notification/notification";
import ConfirmDialog from "../dialoges/dialogeAlert";

export default function AddMedicamentReadOnlyRow({Medicament,handleMedDeleteClick}) {
   const [notify, setNotify] = useState({
     isOpen: false,
     message: "",
     type: "",
   });
   const [confirmDialog, setConfirmDialog] = useState({
     isOpen: false,
     title: "",
     subTitle: "",
   });
  const {id} = useParams();
  const {user} = useAuthContext();
  const history = useNavigate();
  const [ConsultationData, setConsultationData] = useState(); 
  const [OrdonanceData, setOrdonanceData] = useState();
  // fetch Consultation Data
  useEffect(() => {
    const fetchConsultationData = async () => {
      if (id !== undefined) {
        await fetch(`http://localhost:8000/patients/Consultation/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setConsultationData(data);
              })
              .catch((error) => {
                console.error("Error fetching Consultation data:", error);
              });
          } else {
            console.error("Error resieving Consultation date", response.error);
          }
        });
      } else {
        history("/login");
      }
    };
    fetchConsultationData();
  }, [history, id, user?.token, ConsultationData]);
    //fetch Ordonance data
  useEffect(() => {
    const fetchOrdonanceData = async () => {
      if (ConsultationData.OrdonanceID !== undefined) {
        await fetch(
          `http://localhost:8000/patients/Ordonance/${ConsultationData.OrdonanceID}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
          }
        ).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setOrdonanceData(data);
              })
              .catch((error) => {
                console.error("Error fetching Ordonances data:", error);
              });
          } else {
            console.error("Error resieving Ordonances date", response.error);
          }
        });
      }
    };
    fetchOrdonanceData();
  }, [OrdonanceData, ConsultationData, user?.token]);
  //delete Medicament
  const handleMedicamentDeleteClick = async () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    try {
      const response = await axios.delete(
        `http://localhost:8000/patients/Medicament/${OrdonanceData[0]._id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            data : `${Medicament._id}`,
          },
        }
      );
      const data = await response.data;
      if (!response.ok) {
        setNotify({
          isOpen: true,
          message: `${data.message}`,
          type: "error",
        });
        // window.alert(data.message);
      }
      if (response.ok) {
        setNotify({
          isOpen: true,
          message: `${data.message}`,
          type: "error",
        });
        // window.alert(data.message);
      }
    } catch (error) {
      console.error("Error Deleting Medicament:", error);
    }
  };
  return (
    <div className="ordononce-medicament">
      <div className="medicament-description">
        <h2>{Medicament?.NomMedicament}</h2>
        <h2>{Medicament?.QuantiteMedicament} boite</h2>
        <h2>{Medicament?.DoseMedicament}</h2>
        <h2>{Medicament?.DureeMedicament}</h2>
      </div>
      <div className="action-table-med">
        <MdDelete
          className="delete-btn-icon"
          onClick={() => {
            setConfirmDialog({
              isOpen: true,
              title: "Êtes-vous sûr de supprimer ce Medicament ?",
              subTitle: "Vous ne pouvez pas annuler cette opération",
              onConfirm: () => {
                handleMedicamentDeleteClick();
              },
            });
          }}
          // onClick={handleMedicamentDeleteClick}
        />
      </div>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
