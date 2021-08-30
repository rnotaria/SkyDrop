import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Slide from "@material-ui/core/Slide";

function Alert({ error, handleSetError }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  const onClose = () => {
    setOpen(false);
    setTimeout(() => {
      handleSetError(null);
    }, 500);
  };

  if (!error) return null;

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={5000}
      TransitionComponent={Slide}
    >
      <MuiAlert elevation={6} variant="filled" severity={error.severity}>
        <span style={{ userSelect: "none" }}>{error.message}</span>
      </MuiAlert>
    </Snackbar>
  );
}

export default Alert;
