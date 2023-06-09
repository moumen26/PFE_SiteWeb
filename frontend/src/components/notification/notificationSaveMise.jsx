import { Alert, Snackbar } from "@mui/material";
import React from "react";

export default function NotificationSaveMise(props) {
  const { notify, setNotify } = props;

  const handleClose = (event) => {
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={3000}
      className="mt-0"
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={notify.type}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}
