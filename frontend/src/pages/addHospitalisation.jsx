import React, { useEffect, useState } from "react";
import TableConcultation from "../components/tables/tableConcultation";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import Notification from "../components/notification/notification";
import ConfirmDialog from "../components/dialoges/dialogeAlert";
import DialogeAddConcultation from "../components/dialoges/dialogeAddConcultation";
import DialogeValideVisite from "../components/dialoges/dialogeVisite";

export default function AddHospitalisation(props) {
  const { id } = useParams();
  const { user } = useAuthContext();
  const history = useNavigate();
  const [HospitalisationData, setHospitalisationData] = useState();
  const [ConcultationData, setConcultationData] = useState();
  const goBack = () => {
    window.history.back();
  };
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

  const [confirmDialogConcultation, setConfirmDialogConcultation] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const [confirmDialogVisite, setConfirmDialogVisite] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  //get Hospitalisation data
  useEffect(() => {
    const fetchHospitalisationData = async () => {
      if (user?.token !== undefined) {
        await fetch(`http://localhost:8000/patients/Hospitalisation/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((data) => {
                setHospitalisationData(data);
              })
              .catch((error) => {
                console.error("Error fetching Hospitalisation data:", error);
              });
          } else {
            console.error(
              "Error resieving Hospitalisation date",
              response.error
            );
          }
        });
      }
    };
    fetchHospitalisationData();
  }, [HospitalisationData, id, user?.token]);
  //get ConcultationData data
  useEffect(() => {
    const fetchConcultationData = async () => {
      if (user?.token !== undefined) {
        await fetch(
          `http://localhost:8000/patients/ConsultationByHospitalisationID/${id}`,
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
                setConcultationData(data);
              })
              .catch((error) => {
                console.error("Error fetching Hospitalisation data:", error);
              });
          } else {
            console.error(
              "Error resieving Hospitalisation date",
              response.error
            );
          }
        });
      }
    };
    fetchConcultationData();
  }, [ConcultationData, id, user?.token]);
  //delete the Hospitalisation
  const handleDeleteHospitalisation = async () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    try {
      const response = await axios.delete(
        `http://localhost:8000/patients/Hospitalisation/${HospitalisationData._id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      const data = await response.data;
      setNotify({
        isOpen: true,
        message: "Delete Successfully",
        type: "error",
      });

      setTimeout(() => {
        history(-1);
      }, 1000);
    } catch (error) {
      console.error("Error Deleting Diagnostic:", error);
    }
  };
  //add concultation to hospitalisation
  const handleAddConsultation = async () => {
    setConfirmDialogConcultation({
      ...confirmDialog,
      isOpen: false,
    });
    try {
      // get current date
      const current = new Date();
      const date = `${current.getDate()}-${
        current.getMonth() + 1
      }-${current.getFullYear()}`;
      const time = `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
      // post new concultation
      const response = await fetch(
        `http://localhost:8000/patients/Hospitalisation/${HospitalisationData?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({
            Date_Concultation: date,
            Heure_Concultation: time,
            idMedecin: user?.id,
          }),
        }
      );
      // get the ConsultationID via response from the server and redirect to the Consultation page
      const data = await response.json();
      setNotify({
        isOpen: true,
        message: "Add Successfully",
        type: "success",
      });
      if (!response.ok) {
        window.alert("Add Consultation failed", data.error);
      }
      if (response.ok) {
        setTimeout(() => {
          history(`/conculter/${data.id}`);
        }, 1000);
      }
    } catch (error) {
      console.error("Error adding Consultation:", error);
    }
  };
  return (
    <div className="Add-Hospitalisation">
      <div className="Add-Hospitalisation-container">
        <div className="addpatient-hedear">
          <input
            type="submit"
            value="Annuler"
            onClick={() => {
              setConfirmDialog({
                isOpen: true,
                title: "Are you sure to delete this Hospitalisation?",
                subTitle: "you can't undo this operation",
                onConfirm: () => {
                  handleDeleteHospitalisation();
                },
              });
            }}
          />
          <h2>Hospitalisation</h2>
          <input type="submit" value="terminer" onClick={() => history(-1)}/>
        </div>
        <div className="affichage-concultation-header">
          <h3>
            Medecin : <span>{user?.Fname}</span>
          </h3>
          <div className="time-date-concultation">
            <h3>
              Heure : <span>{HospitalisationData?.HeureHospitalisation}</span>
            </h3>
            <h3>
              Date : <span>{HospitalisationData?.DateHospitalisation}</span>
            </h3>
          </div>
        </div>
        <div className="home-formulaire-swiper profile-hospitalisation">
          <div className="profile-cahier-swiper-title">
            <h2>Concultation</h2>
            <input
              className="add-concultation-btn"
              type="submit"
              value="Ajouter un concultation"
              onClick={() => {
                setConfirmDialogConcultation({
                  isOpen: true,
                  title: "Are you sure to add this concultation?",
                  subTitle: "you can't undo this operation",
                  onConfirm: () => {
                    handleAddConsultation();
                  },
                });
              }}
            />
          </div>
          <div className="line-hl">
            <div className="hl"></div>
          </div>
          <TableConcultation ConcultationDB={ConcultationData} />
        </div>
        <Notification notify={notify} setNotify={setNotify} />
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
        <DialogeAddConcultation
          confirmDialogConcultation={confirmDialogConcultation}
          setConfirmDialogConcultation={setConfirmDialogConcultation}
        />
        <DialogeValideVisite
          confirmDialogVisite={confirmDialogVisite}
          setConfirmDialogVisite={setConfirmDialogVisite}
        />
      </div>
    </div>
  );
}
