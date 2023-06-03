import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DialogeValideVisite(props) {
  const { confirmDialogVisite, setConfirmDialogVisite } = props;

  return (
    <Dialog
      open={confirmDialogVisite.isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {confirmDialogVisite.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {confirmDialogVisite.subTitle}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() =>
            setConfirmDialogVisite({
              ...confirmDialogVisite,
              isOpen: false,
            })
          }
        >
          Annuler
        </Button>
        <Button onClick={confirmDialogVisite.onConfirm} autoFocus>
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
}
