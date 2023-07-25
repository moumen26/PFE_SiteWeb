import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DialogeAddConsultation(props) {
  const { confirmDialogConcultation, setConfirmDialogConcultation } = props;
  const [confirmDialogVisite, setConfirmDialogVisite] = React.useState({
    isOpen: false,
    title: "",
    subTitle: "",
    validebtn: "",
    annulerbtn: "",
  });

  return (
    <Dialog
      open={confirmDialogConcultation.isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {confirmDialogConcultation.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {confirmDialogConcultation.subTitle}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          className="visite-btn"
          onClick={() =>
            setConfirmDialogConcultation({
              ...confirmDialogVisite,
              isOpen: true,
              title: "Annuler",
              subTitle: "La date de cette visite : 2023-05-22",
              annulerbtn: "Annuler",
            })
          }
        >
          {confirmDialogConcultation.annulerbtn}
        </Button>
        <Button onClick={confirmDialogConcultation.onConfirm} autoFocus>
          Concultation
        </Button>
      </DialogActions>
    </Dialog>
  );
}
