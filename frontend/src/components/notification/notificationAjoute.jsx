import { Alert, Snackbar } from "@mui/material";
import React from "react";

export default function AjouteNotification(props) {
  const { notifyAjoute, setNotifyAjoute } = props;

  const handleClose = (event) => {
    setNotifyAjoute({
      ...notifyAjoute,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      open={notifyAjoute.isOpen}
      autoHideDuration={3000}
      className="mt-52"
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={notifyAjoute.type}>
        {notifyAjoute.message}
      </Alert>
    </Snackbar>
  );
}
