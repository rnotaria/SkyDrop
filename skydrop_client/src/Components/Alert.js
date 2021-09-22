import React, { useState, useEffect } from "react";
import { useStore, useDispatch } from "react-redux";
import { reset } from "../reducers/alertReducer";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

function Alert() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  const store = useStore();
  const dispatch = useDispatch();
  const alerts = store.getState().alerts;

  useEffect(() => {
    if (alerts != null) {
      setOpen(true);
      setData(alerts);
    } else {
      setData(null);
    }
  }, [alerts, setOpen, setData]);

  const onClose = () => {
    setOpen(false);
    setTimeout(() => {
      dispatch(reset());
    }, 500);
  };

  if (data == null) return null;

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      onClose={onClose}
      autoHideDuration={5000}
      TransitionComponent={Slide}
    >
      <MuiAlert elevation={6} variant="filled" severity={data.severity}>
        <span style={{ userSelect: "none" }}>{data.message}</span>
      </MuiAlert>
    </Snackbar>
  );
}

export default Alert;
