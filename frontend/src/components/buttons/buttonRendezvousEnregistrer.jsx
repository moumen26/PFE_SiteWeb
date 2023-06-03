import { useState } from "react";
import Notification from "../notification/notification";
import ConfirmDialog from "../dialoges/dialogeAlert";
export default function RendezvousProfileEnregistrerButton({handlePatient}) {
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
  return (
    <div>
      <input type="submit" value="Enregistrer" className='rendezvous-enregistrer-button' onClick={() => {
      setConfirmDialog({
        isOpen: true,
        title: "tu veux ajouter un(e) patient(e) ou Accouchement",
        onConfirm: () => {
          handlePatient();
        },
      });
    }}/>
    <Notification notify={notify} setNotify={setNotify} />
    <ConfirmDialog
      confirmDialog={confirmDialog}
      setConfirmDialog={setConfirmDialog}
    />
    </div>
    
    
  );
}
